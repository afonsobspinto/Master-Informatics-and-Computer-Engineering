from allthingstalk import Device, NumberAsset, Asset


class LaptopDevice(Device):
    temperature = NumberAsset(unit='°C')
    battery = NumberAsset(unit='%')
    shutdown = NumberAsset(kind=Asset.ACTUATOR)

