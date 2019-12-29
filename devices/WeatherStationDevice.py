from allthingstalk import Device, NumberAsset, StringAsset, BooleanAsset, Asset


class WeatherStationDevice(Device):
    temperature = NumberAsset(unit='°C')
    humidity = NumberAsset(unit='%')
    alert = BooleanAsset()
    forecast = StringAsset(kind=Asset.VIRTUAL)
    reset = BooleanAsset(kind=Asset.ACTUATOR)
