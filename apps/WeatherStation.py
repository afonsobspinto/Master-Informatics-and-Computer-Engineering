import random
import time

import allthingstalk as talk

from devices.WeatherStationDevice import WeatherStationDevice
from settings import DEVICE_TOKEN, DEVICE_ID


class WeatherStation:
    def __init__(self):
        client = talk.Client(DEVICE_TOKEN)
        self.weather = WeatherStationDevice(client=client, id=DEVICE_ID, connect=False)
        self.shutdown = False

    def start(self):
        print("Hello World")
        self.weather.connect()
        while not self.shutdown:
            self.weather.temperature = random.random() * 32
            self.weather.humidity = random.random() * 100
            self.weather.pressure = 900 + random.random() * 200
            time.sleep(2)

    @WeatherStationDevice.feed.temperature
    def log_temperature(self, to, at):
        print('Temperature changed to %s at %s!'
              % (to, at))

    @WeatherStationDevice.command.shutdown
    def on_shutdown(self, device, value, at):
        print('Shutting down')
        self.shutdown = True

