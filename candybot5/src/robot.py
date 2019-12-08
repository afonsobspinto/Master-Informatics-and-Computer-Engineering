#!/usr/bin/env python

import rospy
from communication.communication import Communication
from navigation.grid import Grid, GridType
from navigation.odometry import RobotOdometry
from navigation.states.explorer_state import ExplorerState
from navigation.utils.astar import astar
from navigation.utils.orientation import ORIENTATION
from navigation.utils.position import Position
from sensors.infrared import Infrared
from sensors.sensor_state import SensorState


class Robot:
    def __init__(self, initial_position=Position(25, 25), rows=50, scaling=0.1):
        self._init_sensors()
        self.current_pos = initial_position
        # self.orientation = ORIENTATION.UP
        # self.grid = Grid(self.current_pos, rows)
        self.communication = Communication(self)
        self.odometry = RobotOdometry(self, scaling)
        self.state = ExplorerState(self)
        self.sensor_state = SensorState.NO_OBSTACLE
        # self.path = []
        # self.next_pos = None
        # self.current_target = None
        self.rate = rospy.Rate(10)

    def _init_sensors(self):
        self.sensors = [Infrared(self)]

    def start(self):
        self.state.move()

    def set_target(self, target_pos):
        if self.current_target != target_pos:
            self.current_target = target_pos
            shift = self.grid.set_pos(self.current_target, GridType.TARGET)
            self._update_positions(shift)
            self._find_path()

    def _update_positions(self, shift):
        self.current_pos.row += shift
        self.current_pos.col += shift

    def _find_path(self):
        self.path = astar(self.grid.grid,
                          self.current_pos,
                          self.current_target)
        for e in self.path:
            print str(e)

        self.communication.proceed = "PROCEED"
        self.move()

    def move(self):
        if self.path:
            for i, next_pos in enumerate(self.path):
                self.next_pos = next_pos
                self.orientation = self.current_pos.get_orientation(next_pos)
                # todo: add way to show orientation in plot
                print "moving to next pos: " + str(next_pos.row) + "," + str(next_pos.col)
                self._move(next_pos)

                if (not (self.communication.proceed == "PROCEED")):
                    break
                # todo: rotate bot + move

                self.grid.set_pos(next_pos, GridType.ROBOT, self.current_pos)
                self.current_pos = next_pos
                print "New pos:" + str(self.current_pos)
                print i

            # TODO: stop not from cliff
            if (self.communication.proceed == "CLIFF"):
                self.set_cliff()
            elif (self.communication.proceed == "SONAR_BOTTOM"):
                self.set_cliff()
                # TODO: take bottom value and use set_distance
            elif (self.communication.proceed == "SONAR_TOP"):
                self.set_cliff()
                # TODO: take top value and use set_distance
            else:
                self.communication.stop_robot()


    def set_cliff(self):
        distance_tuple = (self.orientation.value[0], self.orientation.value[1])
        cliff_pos = self.current_pos + distance_tuple
        self.grid.set_pos(cliff_pos, GridType.OBSTACLE)
        self._find_path()

    def set_obstacle(self, distance):
        distance_tuple = (
            self.orientation.value[0] * distance / self.scaling, self.orientation.value[1] * distance / self.scaling)
        obstacle_pos = self.current_pos + distance_tuple
        self.grid.set_pos(obstacle_pos, GridType.OBSTACLE)
        self._find_path()
