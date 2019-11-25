class UltraSound():
	def __init__(self):
		self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size = 1)
		self.ultrasound_sub = rospy.Subscriber('ultrasound', SensorState, self.handleUltrasound, queue_size = 1)
		self.ultrasound()

	def ultrasound(self):
		rate = rospy.Rate(10)
		while not rospy.is_shutdown():
			rate.sleep()

	def handleUltrasound(self, sensor):
		pass
