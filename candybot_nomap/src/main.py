#!/usr/bin/env python
import subprocess

from robot import *


def run_rviz():
    subprocess.Popen(["roslaunch", "turtlebot3_slam", "turtlebot3_slam.launch", "slam_methods:=gmapping"],
                     stdin=subprocess.PIPE, stderr=subprocess.PIPE, stdout=subprocess.PIPE)


def main():
    rospy.init_node('main')
    try:
        run_rviz()
        r = Robot()
        r.start()
        rospy.spin()
    except rospy.ROSInterruptException:
        pass


if __name__ == '__main__':
    main()
