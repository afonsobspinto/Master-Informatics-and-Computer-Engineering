from allthingstalk import Device, NumberAsset


class LaptopDevice(Device):
    temperature = NumberAsset(unit='°C')
    battery = NumberAsset(unit='%')

