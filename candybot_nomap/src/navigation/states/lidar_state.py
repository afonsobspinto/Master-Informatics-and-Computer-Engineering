from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.sensor_enum import SensorEnum
from navigation.utils.switch_state import SwitchState
from settings import log


class LidarState(implements(StateInterface)):
    DRIVING_DISTANCE = 0.2

    def __init__(self, robot):
        log("LidarState", "__init__",  "Activated")
        self.robot = robot
        self.type = "LidarState"
        self.stopped = False
        self.first_turn = False
        self.driven = False
        self.second_turn = False
        self.start_theta = self.robot.odometry.theta
        self.div_theta = 0
        self.start_x = self.robot.odometry.odom_pos.x

    def move(self):
        if not self.stopped:
            self.robot.communication.stop()
            self.stopped = True
        elif not self.first_turn:
            if self.robot.sensors[SensorEnum.Lidar.value].obstacle_flag:
                self.robot.odometry.rotate(clockwise=True)
            else:
                self.div_theta = self.robot.odometry.theta - self.start_theta
                self.first_turn = True
        elif not self.driven:
            if self.robot.sensors[SensorEnum.Lidar.value].obstacle_flag:
                self.stopped = False
                self.first_turn = False
                self.start_theta = self.robot.odometry.theta
                self.start_x = self.robot.odometry.odom_pos.x
            elif abs(self.robot.odometry.odom_pos.x - self.start_x) < self.DRIVING_DISTANCE:
                self.robot.odometry.move_straight()
            else:
                self.driven = True
        elif not self.second_turn:
            if self.div_theta > 0 and self.robot.odometry.theta > self.start_theta:
                self.robot.odometry.rotate(clockwise=True)
            elif self.div_theta < 0 and self.robot.odometry.theta < self.start_theta:
                self.robot.odometry.rotate(clockwise=False)
            else:
                self.second_turn = True
        else:
            self.robot.sensors[0].clear_current_target()
            self.robot.switch_state = SwitchState.TO_EXPLORER
