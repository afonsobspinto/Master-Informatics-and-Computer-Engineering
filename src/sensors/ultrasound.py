class Ultrasound:
    THRESHOLD = 500

    def __init__(self, robot):
        self.robot = robot
        pass

    # self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size = 1)
    # self.ultrasound_sub = rospy.Subscriber('ultrasound', SensorState, self.handle, queue_size = 1)
    # self.ultrasound()

    def handle(self, sensor):
        if sensor.data > self.THRESHOLD:
            self.robot.set_obstacle(sensor.data)

    def ultrasound(self):
        pass
        # rate = rospy.Rate(10)
        # while not rospy.is_shutdown():
        # 	rate.sleep()
