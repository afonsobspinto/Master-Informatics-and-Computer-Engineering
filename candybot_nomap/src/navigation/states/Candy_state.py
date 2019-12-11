from interface import implements
from navigation.states.state_interface import StateInterface


class CandyState(implements(StateInterface)):

    def __init__(self, robot):
    	print "Init CandyState"
        self.robot = robot
        self.type = "CandyState"

    def move(self):
        return 2
