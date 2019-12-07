class Camera:
    def __init__(self):
        pass

    def handle(self, sensor):
        d = sensor.distance
        id = sensor.person_id
        ang = sensor.angle
        if sensor.data > self.THRESHOLD:
            self.robot.set_obstacle(sensor.data)
