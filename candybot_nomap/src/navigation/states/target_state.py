import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState


class TargetState(implements(StateInterface)):

    PROXIMITY = 0.2

    def __init__(self, robot):
        print "Init TargetState"
        self.robot = robot
        self.type = "TargetState"
        self.stopped = False

    def move(self):
        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET:
            if self.robot.odometry.goal_front < self.PROXIMITY:
                self.robot.odometry.cont = False
                self.robot.switch_state = SwitchState.TO_CANDY
            else:
                self.robot.odometry.cont = True

            self.robot.odometry.move()
        else:
            print "STOP TARGET"
            self.robot.communication.stop()


