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
        self.speed = 5
        self.angle = 90
        self.clockwise = False

    def move(self):
        log("ExplorerState move")
        self._rotate()
        if self.robot.switch_state == SwitchState.REMAIN:
            self._wait_for_odom()

    def _rotate(self):
        log("ExplorerState _rotate")
        self.robot.odometry.rotate(self.angle, self.speed, self.clockwise)

    def _random_step(self):
        log("ExplorerState _random_step")
        possible_steps = [e.vector for e in Orientation]
        random.seed(time.clock())
        step = random.randint(0, len(possible_steps) - 1)
        next_pos = self.robot.position + possible_steps[step]
        self.robot.odometry.move(next_pos)

    def _wait_for_odom(self):
        while self.robot.odometry.odom_pos is None:
            pass


