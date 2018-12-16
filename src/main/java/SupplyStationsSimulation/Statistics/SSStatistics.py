import pandas as pd

df = pd.read_csv('./SSStatistics.csv')

print(df.Collaborative.mean())
print(df.Collaborative.std())
print()

print(df.Adventurous.mean())
print(df.Adventurous.std())
print()

print(df.Price.mean())
print(df.Price.std())
print()

print(df.Price.max())
print()

print(df.Price.min())
print()

print(df.TicksToFuel.mean())
print(df.TicksToFuel.std())
print()

print(df.Requests.mean())
print(df.Requests.std())
print()

print(df.WaitingLine.mean())
print(df.WaitingLine.std())
print()

print(df.Attending.mean())
print(df.Attending.std())
print()

print(df.GasPumps.mean())
print(df.GasPumps.std())
print()

print(df.IntoleranceMean.mean())
print(df.IntoleranceMean.std())
print()

print(df.FuelToBuyMean.mean())
print(df.FuelToBuyMean.std())
print()