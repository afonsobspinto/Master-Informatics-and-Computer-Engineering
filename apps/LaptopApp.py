import subprocess
import time

import allthingstalk as talk
import psutil

from devices.LaptopDevice import LaptopDevice
from settings import DEVICE_TOKEN, DEVICE_ID


class LaptopApp:
    def __init__(self):
        client = talk.Client(DEVICE_TOKEN)
        self.laptop = LaptopDevice(client=client, id=DEVICE_ID, connect=False)
        self.shutdown = False
        self.sleep_time = 6

    def start(self):
        self.laptop.connect()
        while not self.shutdown:
            try:
                # Only works in linux
                self.laptop.temperature = self.get_laptop_temparture()
            except:
                pass
            self.laptop.battery = self.get_laptot_battery()
            time.sleep(self.sleep_time)

    @staticmethod
    def get_laptop_temparture():
            return psutil.sensors_temperatures()['coretemp'][0].current

    @staticmethod
    def get_laptot_battery():
        return psutil.sensors_battery().percent

    @LaptopDevice.feed.temperature
    def log_temperature(self, to, at):
        print('Temperature was %s at %s!'
              % (to, at))

    @LaptopDevice.feed.battery
    def log_battery(self, to, at):
        print('Battery was %s at %s!'
              % (to, at))

    @LaptopDevice.command.shutdown
    def on_shutdown(self, value, at):
        print('Shutting down' + str(value) + " " + str(at))
        self.shutdown = True
        LaptopApp.suspend()

    @staticmethod
    def suspend():
        subprocess.call(["systemctl", "suspend"])
