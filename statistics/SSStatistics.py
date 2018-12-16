import pandas as pd
import math
import json

df = pd.read_csv('./SSStatistics.csv')


class Attribute:
    def __init__(self, name):
        self.name = name
        self.total = 0
        self.total_squared = 0
        self.mean = 0
        self.standard_deviation = 0

    def add_to_total(self, value):
        self.total += value
        self.total_squared += value*value


class Tick:
    def __init__(self, tick):
        self.tick = tick
        self.collaborative = 0
        self.explorer = 0
        self.static = 0
        self.dynamic = 0
        self.price = Attribute('price')
        self.max_price = 0
        self.min_price = 0
        self.intolerance = Attribute('intolerance')
        self.time_lost = Attribute('time_lost')
        self.fuel_to_add = Attribute('fuel_to_add')
        self.ticks_to_fuel = Attribute('ticks_to_fuel')
        self.requests = Attribute('requests')
        self.drivers_state = {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0
        }


class Simulation:
    def __init__(self, name, ticks):
        self.name = name
        self.ticks = ticks

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


simulations = {}


def create_simulations():
    simulation_number = 0
    previous_tick_number = 0
    ticks = {}
    for tick_number in df.Tick:
        if math.isnan(tick_number):
            simulations[simulation_number] = (Simulation(simulation_number, ticks))
            simulation_number += 1
            ticks = {}
            continue
        if previous_tick_number != tick_number:
            previous_tick_number = tick_number
            ticks[tick_number] = Tick(tick_number)

    simulations[simulation_number] = (Simulation(simulation_number, ticks))


def _update_mean_and_std_dev(simulation):
    for t in simulation.ticks:
        tick = simulation.ticks[t]
        number_drivers = tick.explorer + tick.collaborative
        number_supply_stations = tick.static + tick.dynamic
        tick.price.mean = tick.price.total / number_supply_stations
        tick.price.standard_deviation = (tick.price.total_squared - tick.price.total * tick.price.total / number_supply_stations) / number_supply_stations
        tick.intolerance.mean = tick.intolerance.total / number_drivers
        tick.intolerance.standard_deviation = (tick.intolerance.total_squared - tick.intolerance.total * tick.intolerance.total / number_drivers) / number_drivers
        tick.time_lost.mean = tick.time_lost.total / number_drivers
        tick.time_lost.standard_deviation = (tick.time_lost.total_squared - tick.time_lost.total * tick.time_lost.total / number_drivers) / number_drivers
        tick.fuel_to_add.mean = tick.fuel_to_add.total / number_drivers
        tick.fuel_to_add.standard_deviation = (tick.fuel_to_add.total_squared - tick.fuel_to_add.total * tick.fuel_to_add.total / number_drivers) / number_drivers
        tick.ticks_to_fuel.mean = tick.ticks_to_fuel.total / number_supply_stations
        tick.ticks_to_fuel.standard_deviation = (tick.ticks_to_fuel.total_squared - tick.ticks_to_fuel.total * tick.ticks_to_fuel.total / number_supply_stations) / number_supply_stations
        tick.requests.mean = tick.requests.total / number_supply_stations
        tick.requests.standard_deviation = (tick.requests.total_squared - tick.requests.total * tick.requests.total / number_supply_stations) / number_supply_stations


dict_data = {}


def read_simulations_data():
    sim_id = 0
    for row in range(0, df.shape[0]):
        simulation = simulations[sim_id]
        tick = df.Tick[row]
        if math.isnan(tick):
            _update_mean_and_std_dev(simulation)
            dict_data[sim_id] = simulation
            sim_id += 1
            continue
        if _is_driver(row):
            if df.BehaviourType[row] == 0:
                simulation.ticks[tick].collaborative += 1
            else:
                simulation.ticks[tick].explorer += 1
            simulation.ticks[tick].fuel_to_add.add_to_total(df.Attribute1[row])
            simulation.ticks[tick].time_lost.add_to_total(df.TravelDiff[row])
            simulation.ticks[tick].intolerance.add_to_total(df.PriceIntolerance[row])
            simulation.ticks[tick].drivers_state[str(int(df.DriverState[row]))] += 1
        else:
            if df.BehaviourType[row] == 2:
                simulation.ticks[tick].dynamic += 1
            else:
                simulation.ticks[tick].static += 1
            simulation.ticks[tick].ticks_to_fuel.add_to_total(df.Attribute1[row])
            price = df.Attribute2[row]
            simulation.ticks[tick].price.add_to_total(price)
            if price > simulation.ticks[tick].max_price:
                simulation.ticks[tick].max_price = price
            if price < simulation.ticks[tick].min_price:
                simulation.ticks[tick].min_price = price
            simulation.ticks[tick].requests.add_to_total(df.Attribute3[row])


def _is_driver(row):
    return df.BehaviourType[row] == 0 or df.BehaviourType[row] == 1


create_simulations()
read_simulations_data()
with open('SSStatistics.json', 'w') as fp:
    for sim in dict_data:
        fp.write(dict_data[sim].toJSON())
