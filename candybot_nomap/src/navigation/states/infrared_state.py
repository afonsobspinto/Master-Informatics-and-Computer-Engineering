import math

from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation
from navigation.utils.switch_state import SwitchState
from navigation.utils.sensor_side import SensorSide

class InfraredState(implements(StateInterface)):

    PROXIMITY = 0.3

    def __init__(self, robot, direction):
        print "Init InfraredState"
        self.robot = robot
        self.type = "TargetState"
        self.direction = direction
        self.stopped = False
        self.moved_back = True

    def move(self):
        if not self.stopped:
            print "INFRARED_SENSOR"
            self.robot.odometry.stop()
            self.stopped = True
            #print "START MOVING BACK"
            print "SWITCHING STATES"
        elif not self.moved_back:
            if self.robot.sensors[1].left and self.robot.sensors[1].right:
                self.robot.odometry.move_back(SensorSide.BOTH)
            elif self.robot.sensors[1].left:
                self.robot.odometry.move_back(SensorSide.LEFT)
            elif self.robot.sensors[1].right:
                self.robot.odometry.move_back(SensorSide.RIGHT)
            else:
                self.moved_back = True
                print "SWITCHING STATES"

        else:
            if self.robot.odometry.goal_front < self.PROXIMITY:
                    self.robot.odometry.cont = False
                    self.robot.switch_state = SwitchState.TO_CANDY
            else:
                # Go to explorer state
                if self.robot.odometry.goal_front >= self.PROXIMITY:
                    print "Cleared wrong target"
                    self.robot.sensors[0].clear_current_target()
                self.robot.switch_state = SwitchState.TO_EXPLORER
