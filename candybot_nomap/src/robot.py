#!/usr/bin/env python

import rospy

from communication.communication import Communication
from navigation.odometry import RobotOdometry
from navigation.states.candy_state import CandyState
from navigation.states.explorer_state import ExplorerState
from navigation.states.infrared_state import InfraredState
from navigation.states.lidar_state import LidarState
from navigation.states.target_state import TargetState
from navigation.states.ultrasonic_state import UltrasonicState
from navigation.utils.sensor_side import SensorSide
from navigation.utils.switch_state import SwitchState
from sensors.camera import Camera
from sensors.infrared import Infrared
from sensors.lidar import Lidar
from sensors.ultrasonic import Ultrasonic


class Robot:
    def __init__(self):
        self._init_sensors()
        self.rate = rospy.Rate(10)
        self.switch_state = SwitchState.REMAIN_EXPLORER
        self.communication = Communication(self)
        self.odometry = RobotOdometry(self)
        self.state = ExplorerState(self)
        self.camera_data = []
        self.clockwise = False

    def _init_sensors(self):
        #self.sensors = [Camera(self), Infrared(self), Ultrasonic(self), Lidar(self)]
        self.sensors = [Camera(self), Infrared(self), Lidar(self)]

    def start(self):
        self._wait_for_odometry()
        while True:
            if self.switch_state == SwitchState.TO_INFRARED:
                self.state = InfraredState(self)
                self.switch_state = SwitchState.REMAIN_INFRARED
            elif self.switch_state == SwitchState.TO_ULTRASOUND:
                self.state = UltrasonicState(self)
                self.switch_state = SwitchState.REMAIN_ULTRASOUND
            elif self.switch_state == SwitchState.TO_LIDAR:
                self.state = LidarState(self)
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

    def _wait_for_odometry(self):
        while self.odometry.odom_pos is None:
            pass
