import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState
from navigation.utils.sensor_side import SensorSide
from settings import log


class InfraredState(implements(StateInterface)):

    def __init__(self, robot, direction):
        log("InfraredState", "__init__", "Activated")
        self.robot = robot
        self.type = "TargetState"
        self.direction = direction
        self.stopped = False

    def move(self):
        if not self.stopped:
            self.robot.communication.stop()
            self.stopped = True

        if self.robot.odometry.goal_front < 0.5:
                self.robot.odometry.cont = False
                self.robot.switch_state = SwitchState.TO_CANDY
        else:
            # Go to explorer state
            if self.robot.odometry.goal_front >= 3:
                log("InfraredState", "move", "Removed Wrong Target")
                self.robot.sensors[0].clear_current_target()
            self.robot.switch_state = SwitchState.TO_EXPLORER
        # Check if label is close enough (1m)
        # if yes: go to candy_State
        # if not in direction, go to explorerstate

