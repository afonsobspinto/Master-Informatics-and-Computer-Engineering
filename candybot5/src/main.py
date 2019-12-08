#!/usr/bin/env python

from robot import *
import rospy


def main():
    rospy.init_node('main')
    try:
        r = Robot(Position(0, 0), rows=5)
        r.start()
    except rospy.ROSInterruptException:
        pass


if __name__ == '__main__':
    main()
