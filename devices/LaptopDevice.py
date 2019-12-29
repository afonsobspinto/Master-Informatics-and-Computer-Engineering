from allthingstalk import Device, NumberAsset, BooleanAsset, Asset


class LaptopDevice(Device):
    temperature = NumberAsset(unit='°C')
    battery = NumberAsset(unit='%')
    shutdown = BooleanAsset(kind=Asset.ACTUATOR)

