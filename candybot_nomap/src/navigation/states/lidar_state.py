import time

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.sensor_enum import SensorEnum
from navigation.utils.switch_state import SwitchState
from settings import log


class LidarState(implements(StateInterface)):
    DRIVING_DISTANCE = 0.2

    def __init__(self, robot):
        log("LidarState", "__init__", "Activated")
        self.robot = robot
        self.type = "LidarState"
        self.stopped = False
        self.first_turn = False
        self.driven = False
        self.second_turn = False
        self.start_theta = self.robot.odometry.theta
        self.div_theta = 0
        self.start_x = self.robot.odometry.odom_pos.x
        self.timer = 0

    # todo: add sound obstacle avoidance sound
    def move(self):
        if not self.stopped:
            print ("lidar robot stopped ")
            self.robot.odometry.stop()
            self.stopped = True
            print("lidar: first turn")
        elif not self.first_turn:
            if self.robot.sensors[SensorEnum.Lidar.value].left:
                self.robot.odometry.rotate(clockwise=True)
            elif self.robot.sensors[SensorEnum.Lidar.value].right:
                self.robot.odometry.rotate(clockwise=False)
            else:
                print "lidar: first turn done, start driving"
                self.div_theta = self.robot.odometry.theta - self.start_theta
                self.first_turn = True
        elif not self.driven:
            if self.robot.sensors[SensorEnum.Lidar.value].left or self.robot.sensors[SensorEnum.Lidar.value].right:
                self.stopped = False
                self.first_turn = False
                self.start_theta = self.robot.odometry.theta
                self.start_x = self.robot.odometry.odom_pos.x
                self.timer = time.time()
            elif time.time() - self.timer < 3:
                self.robot.odometry.move_straight()

            else:
                print("lidar: driving finished, second turn")
                self.driven = True
                if not self.stopped:
                    print self.stopped
        else:
            self.robot.clockwise = self.div_theta > 0
            self.robot.switch_state = SwitchState.TO_FIRST_ROUND_EXPLORER
