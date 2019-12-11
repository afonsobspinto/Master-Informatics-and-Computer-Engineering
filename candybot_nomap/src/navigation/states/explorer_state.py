import random
import time

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState
from settings import log


class ExplorerState(implements(StateInterface)):

    def __init__(self, robot):
        print "Init ExplorerState"
        self.robot = robot
        self.type = "ExplorerState"

    def move(self):
        log("ExplorerState move")
        while self.robot.switch_state == SwitchState.REMAIN_EXPLORER or self.robot.switch_state == SwitchState.TO_EXPLORER:
        	self.robot.odometry.rotate(clockwise=True)

        print "STOP ROTATE"
        self.robot.communication.stop()


