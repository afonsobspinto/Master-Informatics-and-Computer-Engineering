import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState
from navigation.utils.sensor_side import SensorSide


class UltrasoundState(implements(StateInterface)):
    DRIVING_DISTANCE = 0.2


    def __init__(self, robot, direction):
        print "Init UltrasoundState"
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
        self.start_clockwise = self.robot.sensors[2].right

    def move(self):
        if not self.stopped:
            print "ULTRASOUND: ROBOT STOPPED"
            self.robot.communication.stop()
            self.stopped = True
            print "ULTRASOUND: START FIRST TURN"
        elif not self.first_turn:
            if self.robot.sensors[2].left or self.robot.sensors[2].right:
                if (self.start_clockwise):
                    self.robot.odometry.rotate(clockwise=True)
                else:
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
            elif abs(self.robot.odometry.odom_pos.x - self.start_x) < self.DRIVING_DISTANCE:
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
            self.robot.sensors[0].clear_current_target()
            self.robot.switch_state = SwitchState.TO_EXPLORER