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
    def __init__(self, initial_position=Position(25, 25), rows=50, scaling=0.40):
        self._init_sensors()
        self.position = initial_position
        self.initial_pos = initial_position
        self.orientation = Orientation.FRONT
        self.grid = Grid(self.position, rows)
        self.communication = Communication(self)
        self.odometry = RobotOdometry(self, scaling)
        self.state = ExplorerState(self)
        self.switch_state = SwitchState.REMAIN
        self.sensor_state = SensorState.NO_OBSTACLE
        self.camera_data = []
        self.path = []
        self.next_pos = None
        self.current_target = None
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

    def update_odometry(self):
        self._update_orientation()
        self._update_position()

    def _update_position(self):
        self.position = self.odometry.odom_pos.to_int() + self.initial_pos

    def _update_orientation(self):
        if -math.pi / 4 <= self.odometry.theta < math.pi / 4:
            self.orientation = Orientation.FRONT
        elif math.pi / 4 <= self.odometry.theta < math.pi * 3 / 4:
            self.orientation = Orientation.LEFT
        elif math.pi * 3 / 4 <= self.odometry.theta or self.odometry.theta < -math.pi * 3 / 4:
            self.orientation = Orientation.BACK
        elif -math.pi * 3 / 4 <= self.odometry.theta < -math.pi / 4:
            self.orientation = Orientation.RIGHT

    def set_target(self, target_pos):
        if self.current_target != target_pos:
            shift = self.grid.set_pos(target_pos, GridType.TARGET)
            self.current_target = target_pos
            self._update_positions(shift)
            self._find_path()

    def _update_positions(self, shift):
        self.position.row += shift
        self.position.col += shift

    def _find_path(self):
        self.path = astar(self.grid.grid,
                          self.position,
                          self.current_target)
        if self.path:
            for e in self.path:
                #print str(e)
                pass

        #self.communication.proceed = "PROCEED"
        self.move()

    def move(self):
        if self.path:
            next_pos = self.path[0]
            self.next_pos = next_pos
            self.orientation = Orientation.get_orientation(self.position,   next_pos)
            self.odometry.move(next_pos)
            self.position = next_pos
            self.grid.set_pos(next_pos, GridType.ROBOT)
            self.state.update_data(self.camera_data)

            # TODO: stop not from cliff
            #if (self.communication.proceed == "CLIFF"):
                #self.set_cliff()
           # elif (self.communication.proceed == "SONAR_BOTTOM"):
                #self.set_cliff()
                # TODO: take bottom value and use set_distance
            #elif (self.communication.proceed == "SONAR_TOP"):
                #self.set_cliff()
                # TODO: take top value and use set_distance
            #else:
                #self.communication.stop_robot()

    def set_cliff(self):
        distance_tuple = (self.orientation.value[0], self.orientation.value[1])
        cliff_pos = self.position + distance_tuple
        self.grid.set_pos(cliff_pos, GridType.OBSTACLE)
        self._find_path()

    def set_obstacle(self, distance):
        distance_tuple = (
            self.orientation.value[0] * distance / self.odometry.scaling, self.orientation.value[1] * distance / self.odometry.scaling)
        obstacle_pos = self.position + distance_tuple
        self.grid.set_pos(obstacle_pos, GridType.OBSTACLE)
        self._find_path()
