import random

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from settings import log


class ExplorerState(implements(StateInterface)):

    def __init__(self, robot):
        self.robot = robot
        self.speed = 50
        self.angle = 360
        self.clockwise = True

    def move(self):
        log("ExplorerState move")
        #self._rotate()
        self._random_step()
        self._random_step()
        self._random_step()

    def _rotate(self):
        log("ExplorerState _rotate")
        self.robot.odometry.rotate(self.angle, self.speed, self.clockwise)

    def _random_step(self):
        log("ExplorerState _random_step")
        possible_steps = [e.vector for e in Orientation]
        step = random.randint(0, len(possible_steps) - 1)
        next_pos = self.robot.position + possible_steps[step]
        self.robot.odometry.move(next_pos)
