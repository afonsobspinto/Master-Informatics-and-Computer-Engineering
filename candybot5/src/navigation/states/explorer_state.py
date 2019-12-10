import random
import time

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from settings import log


class ExplorerState(implements(StateInterface)):

    def __init__(self, robot):
        self.robot = robot
        self.speed = 20
        self.angle = 360
        self.clockwise = False

    def move(self):
        log("ExplorerState move")
        self._rotate()
        self._wait_for_odom()
        self._random_step()
        self._random_step()
        self._random_step()

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
