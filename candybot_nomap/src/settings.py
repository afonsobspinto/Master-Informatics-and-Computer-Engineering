SENSORS_TOPIC = 'candybot_sensors'
DEBUG = True


def log(class_, method, s):
    if DEBUG:
        print class_ + "::" + method + ": " + s + '\n'
