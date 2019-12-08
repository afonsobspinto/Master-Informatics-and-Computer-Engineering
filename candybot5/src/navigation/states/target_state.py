from interface import implements
from navigation.states.state_interface import StateInterface


class TargetState(implements(StateInterface)):

    def __init__(self, robot):
        self.robot = robot

    def move(self, x):
        return x * 2
