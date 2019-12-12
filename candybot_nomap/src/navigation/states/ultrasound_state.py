import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState
from navigation.utils.sensor_side import SensorSide


class UltrasoundState(implements(StateInterface)):
    DRIVING_DISTANCE = .5

    def __init__(self, robot, direction):
        print "Init UltrasoundState"
        self.robot = robot
        self.direction = direction
        self.type = "UltrasoundState"
        self.stopped = False
        self.first_turn = False
        self.driven = False
        self.second_turn = False
        self.start_theta = robot.odometry.theta
        self.div_theta = 0
        self.start_x = robot.odometry.pos.x

    def move(self):
        if not self.stopped:
            print "ULTRASOUND: ROBOT STOPPED"
            self.robot.communication.stop()
            self.stopped = True
        elif not self.first_turn:
            if (self.robot.sensors[2].left):
                self.robot.odometry.rotate(clockwise=False)
            elif (self.robot.sensors[2].right):
                self.robot.odometry.rotate(clockwise=True)
            else:
                print "ULTRASOUND: ROBOT TURNED"
                self.theta = robot.odometry.theta - self.theta
                self.first_turn = True
        elif not self.driven:
            if self.robot.sensors[2].left or self.robot.sensors[2].right:
                self.stopped = False
                self.first_turn = False
            elif abs(robot.odometry.pos.x - self.start_x) < self.DRIVING_DISTANCE:
                self.robot.odometry.move_straight()
            else:
                print "ULTRASOUND: ROBOT MOVED"
                self.driven = True
        elif not self.second_turn:
            if self.div_theta > 0 and robot.odometry.theta > self.start_theta:
                self.robot.odometry.rotate(clockwise=False)
            elif self.div_theta < 0 and robot.odometry.theta < self.start_theta:
                self.robot.odometry.rotate(clockwise=True)
            else:
                print "ULTRASOUND: ROBOT TURNED"
                self.second_turn = True
        else:
            self.robot.switch_state = SwitchState.TO_EXPLORER