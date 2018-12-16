import pandas as pd
import math

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

print(df.FuelSold.mean())
print(df.FuelSold.std())
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

experiments = 0
data = 0
fuelSoldTotal = 0
for row in range(0, df.shape[0]):
    tick = df.Tick[row]
    if math.isnan(tick):
        experiments += 1
    else:
        data += 1
    fuelSold = df.FuelSold[row]
    if row > 1 and not math.isnan(tick) and not math.isnan(df.Tick[row-1]):
        fuelSoldTotal += fuelSold - df.FuelSold[row-1]
print(experiments)
print(data)
print(fuelSoldTotal/data)
