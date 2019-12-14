import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState
from navigation.utils.sensor_side import SensorSide
import time


class UltrasonicState(implements(StateInterface)):
    DRIVING_DISTANCE = 0.1

    def __init__(self, robot, direction):
        self.robot = robot
        self.direction = direction
        self.type = "UltrasoundState"
        self.stopped = False
        self.first_turn = False
        self.driven = False
        self.second_turn = False
        self.start_theta = self.robot.odometry.theta
        self.div_theta = 0
        self.start_x = self.robot.odometry.odom_pos.x
        self.timer = time.time()

    def move(self):
        if not self.stopped:
            print "ULTRASOUND: ROBOT STOPPED"
            self.robot.odometry.stop()
            self.stopped = True
            print "ULTRASOUND: START FIRST TURN"
        elif not self.first_turn:
            print "SONAR: " + str(self.robot.sensors[2].right) + " " + str(self.robot.sensors[2].left)
            if self.robot.sensors[2].right:
                self.robot.odometry.rotate(clockwise=True)
            elif self.robot.sensors[2].left:
                self.robot.odometry.rotate(clockwise=False)
            else:
                print "ULTRASOUND: FIRST TURN DONE, START DRIVING"
                self.div_theta = self.robot.odometry.theta - self.start_theta
                self.first_turn = True
        elif not self.driven:
            if self.robot.sensors[2].left or self.robot.sensors[2].right:
                self.stopped = False
                self.first_turn = False
                self.start_theta = self.robot.odometry.theta
                self.start_x = self.robot.odometry.odom_pos.x
                self.timer = time.time()
            elif time.time()-self.timer > 3:
                self.robot.odometry.move_straight()
            else:
                print "ULTRASOUND: DRIVING FINISHED, SECOND TURN"
                self.driven = True
        elif not self.second_turn:
            if self.div_theta > 0 and self.robot.odometry.theta > self.start_theta:
                self.robot.odometry.rotate(clockwise=True)
            elif self.div_theta < 0 and self.robot.odometry.theta < self.start_theta:
                self.robot.odometry.rotate(clockwise=False)
            else:
                print "ULTRASOUND: SECOND TURN FINISHED"
                self.second_turn = True
        else:
            self.robot.switch_state = SwitchState.TO_FIRST_ROUND_EXPLORER
