SENSORS_TOPIC = 'candybot_sensors'
DEBUG = True


def log(class_, method, s):
    """
    Debugging helper function
    @param class_:
    @param method:
    @param s:
    """
    if DEBUG:
        print class_ + "::" + method + ": " + s + '\n'
