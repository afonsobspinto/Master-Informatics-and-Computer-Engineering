import random
import time

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.switch_state import SwitchState


class InfraredState(implements(StateInterface)):
    PROXIMITY = 2

    def __init__(self, robot):
        """
        InfraredState constructor
        @param robot:
        """
        self.robot = robot
        self.type = "TargetState"
        self.stopped = False
        self.rotated = False
        self.cleared = False
        self.timer = 0

    def move(self):
        """
        move implementation
        """
        if not self.stopped:
            self.robot.odometry.stop()
            self.stopped = True
            self.timer = time.time()
        else:
            if self.robot.odometry.goal_front < self.PROXIMITY:
                self.robot.odometry.cont = False
                self.robot.switch_state = SwitchState.TO_CANDY
            else:
                # Go to explorer state
                if not self.cleared:
                    self.robot.sensors[0].clear_current_target()
                    self.cleared = True
                elif not self.rotated:
                    print time.time() - self.timer
                    if time.time() - self.timer < random.randint(8, 15):
                        self.robot.odometry.rotate(self.robot.clockwise)
                    else:
                        self.rotated = True
                else:
                    self.robot.switch_state = SwitchState.TO_EXPLORER
