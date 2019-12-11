import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState


class TargetState(implements(StateInterface)):

    def __init__(self, robot):
        print "Init TargetState"
        self.robot = robot
        self.type = "TargetState"
        self.data = self.robot.camera_data

    def move(self):
        while self.robot.switch_state == SwitchState.REMAIN or self.robot.switch_state == SwitchState.TO_TARGET:
            if self.robot.odometry.goal_front < 0.3:
                self.robot.odometry.cont = False
                self.robot.switch_state = SwitchState.TO_CANDY
            else:
                self.robot.odometry.cont = True

            self.robot.odometry.move()

        print "STOP TARGET"
        self.robot.communication.stop()


