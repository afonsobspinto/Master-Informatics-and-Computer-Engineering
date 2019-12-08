#!/usr/bin/python
import rospy
from sensor_msgs.msg import Range
from candybot5.msg import CandybotSensors


class SensorsPublisher:

    ULTRASOUND_LEFT_TOPIC = "sensor/sonar_front1"
    ULTRASOUND_RIGHT_TOPIC = "sensor/sonar_front2"
    INFRARED_LEFT_TOPIC = "sensor/infrared_front1"
    INFRARED_RIGHT_TOPIC = "sensor/infrared_front2"
    SENSORS_TOPIC = "candybot_sensors"

    def __init__(self):
        self.candybot_sensors = CandybotSensors()
        self.candybot_sensors.infrared_left = 0.0
        self.candybot_sensors.infrared_right = 0.0
        self.candybot_sensors.ultrasound_left = 0.0
        self.candybot_sensors.ultrasound_right = 0.0


    def ultrasound_left_callback(self, range):
        self.candybot_sensors.ultrasound_left = range.range

    def ultrasound_right_callback(self, range):
        self.candybot_sensors.ultrasound_right = range.range

    def infrared_right_callback(self, range):
        self.candybot_sensors.infrared_right = range.range

    def infrared_left_callback(self, range):
        self.candybot_sensors.infrared_left = range.range

    def subscribe(self):
        rospy.Subscriber(self.ULTRASOUND_LEFT_TOPIC, Range, self.ultrasound_left_callback, queue_size=1)
        rospy.Subscriber(self.ULTRASOUND_RIGHT_TOPIC, Range, self.ultrasound_right_callback, queue_size=1)
        rospy.Subscriber(self.INFRARED_LEFT_TOPIC, Range, self.infrared_left_callback, queue_size=1)
        rospy.Subscriber(self.INFRARED_RIGHT_TOPIC, Range, self.infrared_right_callback, queue_size=1)

    def publish(self):
        sensor_pub = rospy.Publisher(self.SENSORS_TOPIC, CandybotSensors, queue_size=10)
        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            sensor_pub.publish(self.candybot_sensors)
            rate.sleep()

    def start(self):
        self.subscribe()
        self.publish()


if __name__ == "__main__":

    try:
        rospy.init_node('sensors_publisher')
        sp = SensorsPublisher()
        sp.start()
    except rospy.ROSInterruptException:
        pass
