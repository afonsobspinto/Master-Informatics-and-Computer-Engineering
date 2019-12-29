from allthingstalk import Device, NumberAsset, StringAsset, BooleanAsset, Asset


class LaptopDevice(Device):
    temperature = NumberAsset(unit='°C')
    battery = NumberAsset(unit='%')

