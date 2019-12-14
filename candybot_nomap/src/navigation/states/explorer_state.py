import math
import time

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.switch_state import SwitchState


class ExplorerState(implements(StateInterface)):

    def __init__(self, robot, target=None):
        if target:
            print "Init ExplorerState with target: " + str(target)
        else:
            print "Init ExplorerState"
        self.robot = robot
        self.type = "ExplorerState"
        self.target = target
        self.timer = time.time()

    def move(self):
        if self.target:
            # make check for 360 degrees
            if time.time() - self.timer > 2 * math.pi / 0.3:
                self.target = None
                self.robot.sensors[0].clear_current_target()
        if self.robot.switch_state == SwitchState.REMAIN_EXPLORER or self.robot.switch_state == SwitchState.TO_EXPLORER:
            self.robot.odometry.rotate(clockwise=self.robot.clockwise)
        else:
            print "STOP ROTATE"
            self.robot.communication.stop()
