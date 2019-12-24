#!/usr/bin/env python
import math

import rospy
from sensor_msgs.msg import LaserScan

from navigation.utils.switch_state import SwitchState
from settings import log


class Lidar:
    SAFE_STOP_DISTANCE = 0.17
    ANGLE_VIEW = 60

    def __init__(self, robot):
        """
        Lidar sensor constructor
        @param robot:
        """
        log("Lidar", "__init__", "Lidar Sensor Activated")
        self.robot = robot
        self.lidar_sub = rospy.Subscriber('scan', LaserScan, self.handle, queue_size=1)
        self.left = False
        self.right = False

    def handle(self, sensor):
        """
        Handler function for scan messages
        @param sensor:
        """
        left_distances, right_distances = self.get_scan(sensor)

        self.left = self._detect(left_distances)
        self.right = self._detect(right_distances)

        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET \
                or self.robot.switch_state == SwitchState.REMAIN_ULTRASOUND:
            if self.left or self.right:
                #print self.left, self.right
                self.robot.switch_state = SwitchState.TO_LIDAR

    def _detect(self, lidar_distances):
        """
        Detects near objects
        @param lidar_distances:
        @return:
        """
        for distance in lidar_distances:
            if distance < self.SAFE_STOP_DISTANCE:
                return True
        return False

    def get_scan(self, scan):
        """
        Reads scan vector for the desirable angles
        @param scan:
        @return:
        """
        left_scan_filter = []
        right_scan_filter = []
        left_min = self.ANGLE_VIEW
        left_max = 0
        right_min = 359
        right_max = 360 - self.ANGLE_VIEW

        if scan.ranges:
            for i in range(left_min, left_max, -1):
                ray = scan.ranges[i]
                if ray != float('Inf') and not math.isnan(ray) and ray != 0.0:
                    left_scan_filter.append(ray)

            for i in range(right_min, right_max, -1):
                ray = scan.ranges[i]
                if ray != float('Inf') and not math.isnan(ray) and ray != 0.0:
                    right_scan_filter.append(ray)

        return right_scan_filter, left_scan_filter
