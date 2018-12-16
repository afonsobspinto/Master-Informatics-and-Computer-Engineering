import pandas as pd

df = pd.read_csv('./SSStatistics_fixed.csv', float_precision='high')

print(df.BehaviourType.value_counts())
print()

print(df.Price.mean())
print(df.Price.std())
print()

print(df.Price.max())
print()

print(df.Price.min())
print()

print(df.PriceIntolerance.mean())
print(df.PriceIntolerance.std())
print()

print(df.TravelDiff.mean())
print(df.TravelDiff.std())
print()

print(df.FuelToBuy.mean())
print(df.FuelToBuy.std())
print()

print(df.TicksToFuel.mean())
print(df.TicksToFuel.std())
print()

print(df.TotalRequests.mean())
print(df.TotalRequests.std())
print()

