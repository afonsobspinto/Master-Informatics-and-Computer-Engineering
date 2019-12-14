#!/usr/bin/env python
import math

import rospy
from sensor_msgs.msg import LaserScan

from navigation.utils.switch_state import SwitchState
from settings import log


#
# Code adapted from
# https://github.com/ROBOTIS-GIT/turtlebot3/blob/master/turtlebot3_example/nodes/turtlebot3_obstacle#L43
#
class Lidar:
    STOP_DISTANCE = 0.2
    LIDAR_ERROR = 0.05
    SAFE_STOP_DISTANCE = STOP_DISTANCE + LIDAR_ERROR

    def __init__(self, robot):
        log("Lidar", "__init__", "Lidar Sensor Activated")
        self.robot = robot
        self.lidar_sub = rospy.Subscriber('scan', LaserScan, self.handle, queue_size=1)
        self.obstacle_flag = False
        # todo: add left and right
        # todo: middle one left

    def handle(self, sensor):
        # lidar_distances = self.get_scan(sensor)
        # min_distance = min(lidar_distances)


        #todo: update left and right

        ## if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET:
        # todo: send to the right state
        # if min_distance < self.SAFE_STOP_DISTANCE:
        #     log("Lidar", "handle", "Detected Object")
        #     self.robot.switch_state = SwitchState.TO_LIDAR
        pass

    def get_scan(self, scan):
        scan_filter = []
        samples = len(scan.ranges)
        angle_view = 90
        min, front, max = self.get_indexes(angle_view)
        #
        # for i in range(min, max+1):
        #     if scan_filter[i] != float('Inf') or not math.isnan(scan_filter[i]) or scan_filter!=0.0:
        #         pass


        # Look at the middle only
        # Remove zeros and infinites
        # Look for min distance

        return scan_filter

    def get_indexes(self, angle_view):
        front_angle = 90
        split_angle = angle_view / 2
        min_angle = front_angle - split_angle
        max_angle = front_angle + split_angle
        return min_angle, front_angle, max_angle


