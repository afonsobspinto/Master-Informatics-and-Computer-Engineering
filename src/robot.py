#!/usr/bin/env python

from communication.communication import Communication
from navigation.grid import Grid, GridType
from nav_msgs.msg import Odometry
from tf.transformations import euler_from_quaternion
from geometry_msgs.msg import Point, Twist
from navigation.utils.astar import astar
from navigation.utils.orientation import ORIENTATION
from navigation.utils.position import Position
from sensors.infrared import Infrared
import math


class Robot:
    def __init__(self, initial_position=Position(25, 25), rows=50):
        self.orientation = ORIENTATION.UP
        self.communication = Communication()
        self.current_position = initial_position
        self.grid = Grid(self.current_position, rows)
        self.current_target = None
        self.path = []
        self.next_pos=None
        self._init_sensors()
        self.proceed = True
        self.odom_pos = initial_position
        self.odom_rot = 0
        (self.roll, self.pitch, self.theta) = (0,0,0)
        self.odom_sub = rospy.Subscriber("/odom", Odometry, new_odom)


    def new_odom(self, msg):
        self.odom_pos = Position(msg.pose.pose.position.x, msg.pose.pose.position.y)
        self.odom_rot = msg.pose.pose.orientation
        (self.self.roll, self.pitch, self.theta) = euler_from_quaternion([rot_q.x, rot_q.y, rot_q.z, rot_q.w])


    def _init_sensors(self):
        self.sensors = [Infrared(self)]

    def set_target(self, target_pos):
        if self.current_target != target_pos:
            self.current_target = target_pos
            shift = self.grid.set_pos(self.current_target, GridType.TARGET)
            self._update_positions(shift)
            self._find_path()

    def _update_positions(self, shift):
        self.current_position.row += shift
        self.current_position.col += shift

    def _find_path(self):
        self.path = astar(self.grid.grid,
                          self.current_position,
                          self.current_target)

    def move(self):
        if self.path:
            for next_pos in self.path:
                self.next_pos=next_pos
                self.orientation = self.current_position.get_orientation(next_pos)
                # todo: add way to show orientation in plot
                self._move(next_pos)

                print(self.orientation.value)
                # todo: rotate bot + move

                self.grid.set_pos(next_pos, GridType.ROBOT, self.current_position)
                self.current_position = next_pos

    def _move(self, next_pos):

        while(abs(inc_x) < 0.1 and abs(inc_y) < 0.1):
            inc_col = next_pos[0].col - self.odom_pos.col
            inc_row = next_pos[0].row - self.odom_pos.row
            angle_to_next_pos = atan2(inc_row, inc_col)
            diff = angle_to_next_pos-self.theta

            if abs(diff) > 0.2:
                if((diff>0 and diff > math.pi) or (diff<0 and diff > -math.pi)):
                    self.communication.move_robot([0,0,0],[0,0,-0.8])
                else:
                    self.communication.move_robot([0,0,0],[0,0,0.8])

            else:
                if(diff > 0):
                    self.communication.move_robot([0.2,0,0],[0,0,0.1])
                else:
                    self.communication.move_robot([0.2,0,0],[0,0,-0.1])



    def set_cliff(self):
        distance_tuple = (self.orientation.value[0] * self.grid.scaling, self.orientation.value[1] * self.grid.scaling)
        cliff_pos = self.current_position + distance_tuple
        self.grid.set_pos(cliff_pos, GridType.OBSTACLE)
        self._find_path()
        self.communication.proceed = True

    def set_obstacle(self, distance):
        distance_tuple = (self.orientation.value[0] * distance * self.grid.scaling, self.orientation.value[1] * distance * self.grid.scaling)
        obstacle_pos = self.current_position + distance_tuple
        self.grid.set_pos(obstacle_pos, GridType.OBSTACLE)
        self._find_path()
