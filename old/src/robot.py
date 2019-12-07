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
import rospy

from sensors.ultrasound import *
from settings import *


class Robot:
    def __init__(self, initial_position=Position(25, 25), rows=50,scaling=0.1):
        self.orientation = ORIENTATION.UP
        self.communication = Communication()
        self.current_position = initial_position
        self.grid = Grid(self.current_position, rows)
        self.current_target = None
        self.path = []

        self.scaling = scaling
        self.next_pos=None
        self._init_sensors()
        self.odom_pos = initial_position
        self.odom_rot = 0
        (self.roll, self.pitch, self.theta) = (0,0,0)
        self.odom_sub = rospy.Subscriber("/odom", Odometry, self.new_odom)
        self.rate = rospy.Rate(50)



    def new_odom(self, msg):
        self.odom_pos = Position(-msg.pose.pose.position.y/self.scaling, -msg.pose.pose.position.x/self.scaling)
        self.odom_rot = msg.pose.pose.orientation
        (self.roll, self.pitch, self.theta) = euler_from_quaternion([self.odom_rot.x, self.odom_rot.y, self.odom_rot.z, self.odom_rot.w])


    def _init_sensors(self):
        self.sensors = [Infrared(self)] #Ultrasound(self)

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
        for e in self.path:
            print str(e)

        self.communication.proceed = "PROCEED"
        self.move()

    def move(self):
        if self.path:
            for i, next_pos in enumerate(self.path):
                self.next_pos = next_pos
                self.orientation = self.current_position.get_orientation(next_pos)
                # todo: add way to show orientation in plot
                print "moving to next pos: " + str(next_pos.row) + "," + str(next_pos.col)
                self._move(next_pos)

                if(not (self.communication.proceed=="PROCEED")):
                    break
                # todo: rotate bot + move

                self.grid.set_pos(next_pos, GridType.ROBOT, self.current_position)
                self.current_position = next_pos
                print "New pos:" + str(self.current_position)
                print i

            # TODO: stop not from cliff
            if(self.communication.proceed == "CLIFF"):
                self.set_cliff()
            elif (self.communication.proceed == "SONAR_BOTTOM"):
                self.set_cliff()
                # TODO: take bottom value and use set_distance
            elif(self.communication.proceed == "SONAR_TOP"):
                self.set_cliff()
                # TODO: take top value and use set_distance
            else:
                self.communication.stop_robot()

    def _move(self, next_pos):

        while(True):
            inc_col = next_pos.col - self.odom_pos.col
            inc_row = next_pos.row - self.odom_pos.row
            angle_to_next_pos = math.atan2(inc_row, inc_col)
            diff = angle_to_next_pos-self.theta

            #print "INCREMENT: " + str(inc_col) + " | " + str(inc_row)
            #print "ANGLE: " + str(angle_to_next_pos)
            #print "DIFF: " + str(diff)
            if abs(diff) > 0.2:
                if((diff>0 and diff > math.pi) or (diff<0 and diff > -math.pi)):
                    self.communication.move_robot([0,0,0],[0,0,-0.8])
                else:
                    self.communication.move_robot([0,0,0],[0,0,0.8])

            else:
                if(diff > 0):
                    self.communication.move_robot([0.05,0,0],[0,0,0.1])
                else:
                    self.communication.move_robot([0.05,0,0],[0,0,-0.1])

            if((abs(inc_col) < 0.1 and abs(inc_row) < 0.1) or not (self.communication.proceed=="PROCEED")):
                break

            self.rate.sleep()


    def set_cliff(self):
        distance_tuple = (self.orientation.value[0], self.orientation.value[1])
        cliff_pos = self.current_position + distance_tuple
        self.grid.set_pos(cliff_pos, GridType.OBSTACLE)
        self._find_path()


    def set_obstacle(self, distance):
        distance_tuple = (self.orientation.value[0] * distance / self.scaling, self.orientation.value[1] * distance / self.scaling)
        obstacle_pos = self.current_position + distance_tuple
        self.grid.set_pos(obstacle_pos, GridType.OBSTACLE)
        self._find_path()
