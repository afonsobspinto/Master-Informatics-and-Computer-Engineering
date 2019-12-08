import math
from interface import implements
from navigation.states.state_interface import StateInterface


class ExplorerState(implements(StateInterface)):

    def __init__(self, robot):
        self.robot = robot
        self.speed = 50
        self.angle = 360
        self.clockwise = True

    def move(self):
        self._rotate()

    def _rotate(self):
        self.robot.odometry.rotate(self.speed, self.angle, self.clockwise)

    def _random_step(self):
        pass
