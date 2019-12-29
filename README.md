[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
![for linux](https://img.shields.io/badge/platform-linux-lightgrey.svg)

# AllThingsTalk Prototype
Prototype of AllThingsTalkMaker that enables interactions to/from the Cloud and between the client and the Cloud platform
Some real data (laptopt temperature and battery) is being used to test the platform functionalities such as automation (automatic shutdown)

## Setup

1. `git clone https://github.ugent.be/afpinto/iot_all_things_talk.git`
3. `cd iot_all_things_talk`
4. `pip install -r requirements.txt`
(We recommend that you perform this step inside a [Python Virtual Enviroment](https://realpython.com/blog/python/python-virtual-environments-a-primer/))
5. Create a new device  https://maker.allthingstalk.com

    6. Register / Sign in
    7. Select Devices, New Device, Your Own Device
    8. Choose a catchy name
9. Edit an `.env` file with your Device Token and Device ID

    10. Select your device at https://maker.allthingstalk.com
    11. Choose Settings, Authentication 
    12. Your `.env` file should look like [this](.env)
12. `python3 main`

## Built With
* [Allthingstalk Maker](https://maker.allthingstalk.com) - Where and how to get your first IoT project started? You can easily connect, collect, visualise and use data from your IoT devices with AllThingsTalk Maker.

## Authors
* Afonso Pinto [@afpinto](https://github.ugent.be/afpinto)
* Andreia Seabra [@arochase](https://github.ugent.be/arochase)
* Tomás Oliveira [@toliveir](https://github.ugent.be/toliveir)
