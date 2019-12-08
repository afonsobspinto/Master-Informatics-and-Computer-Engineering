#!/usr/bin/env python

import rospy
from geometry_msgs.msg import Twist
from candybot5.msg import CandybotSensors


class TestSensors:
    INFRARED_THRESHOLD = 0.1

    def __init__(self):
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=1)
        self.cliff_sub = rospy.Subscriber('candybot_sensors', CandybotSensors, self.handler, queue_size=1)
        self.loop()

    def handler(self, candybot_sensor):
        print(candybot_sensor.infrared_left)
        print(candybot_sensor.infrared_right)
        twist = Twist()
        if candybot_sensor.infrared_left > self.INFRARED_THRESHOLD \
                or candybot_sensor.infrared_right > self.INFRARED_THRESHOLD:
            linear_vel = 0
        else:
            linear_vel = 0.05

        twist.linear.x = linear_vel
        self.cmd_pub.publish(twist)

    def loop(self):
        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            rate.sleep()


def main():
    rospy.init_node('test_sensors')
    try:
        TestSensors()
    except rospy.ROSInterruptException:
        pass


if __name__ == '__main__':
    main()
