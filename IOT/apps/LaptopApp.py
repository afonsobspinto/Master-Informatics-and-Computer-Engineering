import subprocess
import time

import allthingstalk as talk
import psutil

from devices.LaptopDevice import LaptopDevice
from settings import DEVICE_TOKEN, DEVICE_ID


class LaptopApp:
    SHUTDOWN = False

    def __init__(self):
        client = talk.Client(DEVICE_TOKEN)
        self.laptop = LaptopDevice(client=client, id=DEVICE_ID, connect=False)
        self.sleep_time = 6

    def start(self):
        self.laptop.connect()
        while True:
            try:
                if not LaptopApp.SHUTDOWN:
                    self.laptop.shutdown = 0  # Good practice: Confirming actuation
                    LaptopApp.SHUTDOWN = False
                try:
                    # Only works in linux
                    self.laptop.temperature = self.get_laptop_temparture()
                except:
                    self.laptop.temperature = 0
                self.laptop.battery = self.get_laptot_battery()
                time.sleep(self.sleep_time)
            except:
                pass

    @staticmethod
    def get_laptop_temparture():
        return psutil.sensors_temperatures()['coretemp'][0].current

    @staticmethod
    def get_laptot_battery():
        return psutil.sensors_battery().percent

    @staticmethod
    @LaptopDevice.feed.temperature
    def log_temperature(device, value, at):
        print('Temperature changed on %s at %s to %s!'
              % (device.id, at, value))

    @staticmethod
    @LaptopDevice.feed.battery
    def log_battery(device, value, at):
        print('Battery changed on %s at %s to %s!'
              % (device.id, at, value))

    @staticmethod
    @LaptopDevice.command.shutdown
    def on_shutdown(device, value, at):
        print('Shutting down ' + str(device) + "due to value being" + str(value) + " " + str(at))
        LaptopApp.suspend()

    @staticmethod
    def suspend():
        LaptopApp.SHUTDOWN = True
        time.sleep(10)
        subprocess.call(["systemctl", "suspend"])
