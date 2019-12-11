#!/usr/bin/env python
import math
import time

import rospy
from communication.communication import Communication
from navigation.grid import Grid, GridType
from navigation.odometry import RobotOdometry
from navigation.states.explorer_state import ExplorerState
from navigation.states.target_state import TargetState
from navigation.states.Candy_state import CandyState
from navigation.utils.astar import astar
from navigation.utils.orientation import Orientation
from navigation.utils.position import Position
from navigation.utils.switch_state import SwitchState
from sensors.infrared import Infrared
from sensors.camera import Camera
from sensors.sensor_state import SensorState


class Robot:
    def __init__(self):
        self._init_sensors()
        self.communication = Communication(self)
        self.odometry = RobotOdometry(self)
        self.state = ExplorerState(self)
        self.switch_state = SwitchState.REMAIN
        self.sensor_state = SensorState.NO_OBSTACLE
        self.camera_data = []
        self.rate = rospy.Rate(10)

    def _init_sensors(self):
        self.sensors = [Infrared(self), Camera(self)]

    def start(self):
        while True:
            self.state.move()
            if self.switch_state == SwitchState.TO_EXPLORER:
                self.state = ExplorerState(self)
                self.switch_state = SwitchState.REMAIN
            elif self.switch_state == SwitchState.TO_TARGET:
                self.state = TargetState(self)
                self.switch_state = SwitchState.REMAIN
            elif self.switch_state == SwitchState.TO_CANDY:
                self.state = CandyState(self)
                self.switch_state = SwitchState.REMAIN
            else:
                pass
