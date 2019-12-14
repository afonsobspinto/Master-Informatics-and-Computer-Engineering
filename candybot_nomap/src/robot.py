#!/usr/bin/env python
from enum import Enum

import rospy

from communication.communication import Communication
from navigation.odometry import RobotOdometry
from navigation.states.Candy_state import CandyState
from navigation.states.explorer_state import ExplorerState
from navigation.states.infrared_state import InfraredState
from navigation.states.lidar_state import LidarState
from navigation.states.target_state import TargetState
from navigation.states.ultrasound_state import UltrasoundState
from navigation.utils.sensor_side import SensorSide
from navigation.utils.switch_state import SwitchState
from sensors.camera import Camera
from sensors.infrared import Infrared
from sensors.lidar import Lidar


class Robot:
    def __init__(self):
        self._init_sensors()
        self.communication = Communication(self)
        self.odometry = RobotOdometry(self)
        self.state = ExplorerState(self)
        self.switch_state = SwitchState.REMAIN_EXPLORER
        self.camera_data = []
        self.rate = rospy.Rate(10)

    def _init_sensors(self):
        # self.sensors = [Camera(self), Infrared(self), Ultrasound(self), Lidar(self)]
        # todo: add Ultrasound
        self.sensors = [Camera(self), Infrared(self), Lidar(self)]

    def start(self):
        while True:
            if self.switch_state == SwitchState.TO_INFRARED_BOTH:
                self.state = InfraredState(self, SensorSide.BOTH)
                self.switch_state = SwitchState.REMAIN_INFRARED
            if self.switch_state == SwitchState.TO_INFRARED_LEFT:
                self.state = InfraredState(self, SensorSide.LEFT)
                self.switch_state = SwitchState.REMAIN_INFRARED
            if self.switch_state == SwitchState.TO_INFRARED_RIGHT:
                self.state = InfraredState(self, SensorSide.RIGHT)
                self.switch_state = SwitchState.REMAIN_INFRARED
            if self.switch_state == SwitchState.TO_ULTRASOUND_BOTH:
                self.state = UltrasoundState(self, SensorSide.BOTH)
                self.switch_state = SwitchState.REMAIN_ULTRASOUND
            if self.switch_state == SwitchState.TO_ULTRASOUND_LEFT:
                self.state = UltrasoundState(self, SensorSide.LEFT)
                self.switch_state = SwitchState.REMAIN_ULTRASOUND
            if self.switch_state == SwitchState.TO_ULTRASOUND_RIGHT:
                self.state = UltrasoundState(self, SensorSide.RIGHT)
                self.switch_state = SwitchState.REMAIN_ULTRASOUND
            if self.switch_state == SwitchState.TO_LIDAR:
                self.state = LidarState(self, SensorSide.BOTH)
                self.switch_state = SwitchState.REMAIN_LIDAR
            elif self.switch_state == SwitchState.TO_EXPLORER:
                self.state = ExplorerState(self)
                self.switch_state = SwitchState.REMAIN_EXPLORER
            elif self.switch_state == SwitchState.TO_FIRST_ROUND_EXPLORER:
                self.state = ExplorerState(self, target=self.sensors[0].current_target)
                self.switch_state = SwitchState.REMAIN_EXPLORER
            elif self.switch_state == SwitchState.TO_TARGET:
                self.state = TargetState(self)
                self.switch_state = SwitchState.REMAIN_TARGET
            elif self.switch_state == SwitchState.TO_CANDY:
                self.state = CandyState(self)
                self.switch_state = SwitchState.REMAIN_CANDY
            else:
                pass
            self.state.move()
