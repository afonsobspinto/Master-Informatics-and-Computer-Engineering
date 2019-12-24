import time

from interface import implements

from navigation.states.state_interface import StateInterface
from navigation.utils.switch_state import SwitchState


class UltrasonicState(implements(StateInterface)):
    DRIVING_DISTANCE = 0.1

    def __init__(self, robot):
        """
        UltrasonicState constructor
        @param robot:
        """
        self.robot = robot
        self.type = "UltrasoundState"
        self.stopped = False
        self.first_turn = False
        self.driven = False
        self.second_turn = False
        self.start_theta = self.robot.odometry.theta
        self.div_theta = 0
        self.start_x = self.robot.odometry.odom_pos.x
        self.timer = time.time()

    def move(self):
        """
        move function implementation
        """
        if not self.stopped:
            self.robot.odometry.stop()
            self.stopped = True
        elif not self.first_turn:
            if self.robot.sensors[2].right:
                self.robot.odometry.rotate(clockwise=True)
            elif self.robot.sensors[2].left:
                self.robot.odometry.rotate(clockwise=False)
            else:
                self.div_theta = self.robot.odometry.theta - self.start_theta
                self.first_turn = True
        elif not self.driven:
            if self.robot.sensors[2].left or self.robot.sensors[2].right:
                self.stopped = False
                self.first_turn = False
                self.start_theta = self.robot.odometry.theta
                self.start_x = self.robot.odometry.odom_pos.x
                self.timer = time.time()
            elif time.time()-self.timer > 3:
                self.robot.odometry.move_straight()
            else:
                self.driven = True
        else:
            self.robot.clockwise = self.div_theta > 0
            self.robot.switch_state = SwitchState.TO_FIRST_ROUND_EXPLORER

