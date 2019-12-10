#!/usr/bin/env python
#################################################################################
# Copyright 2018 ROBOTIS CO., LTD.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#################################################################################

# Authors: Gilbert #

import rospy
from geometry_msgs.msg import Twist
from turtlebot3_msgs.msg import SensorState

from communication.communication import Communication


class Infrared:
    THRESHOLD = 800

    def __init__(self, robot):
        self.robot = robot
        self.infrared_sub = rospy.Subscriber('sensor_state', SensorState, self.handle, queue_size=1)
        self.cliff()

    def handle(self, sensor):
        if (sensor.cliff > self.THRESHOLD or sensor.illumination > self.THRESHOLD ) and (self.robot.current_position + self.robot.orientation.value == self.robot.next_pos):
            # TODO: only stop when next_pos is on path
            self.robot.communication.proceed = "CLIFF"


    def cliff(self):
        #rate = rospy.Rate(1)
        pass
        #while not rospy.is_shutdown():
            #rate.sleep()


