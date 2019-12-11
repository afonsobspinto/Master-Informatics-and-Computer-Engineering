#!/usr/bin/env python

from robot import *
import rospy

from settings import log


def main():
    log("Candybot_nomap")
    rospy.init_node('main')
    try:
        r = Robot()
        r.start()
    except rospy.ROSInterruptException:
        pass


if __name__ == '__main__':
    main()
