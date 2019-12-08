import math
import rospy
from nav_msgs.msg import Odometry
from tf.transformations import euler_from_quaternion
from navigation.utils.position import Position
from sensors.sensor_state import SensorState


class RobotOdometry:
    THRESHOLD = 0.2
    PROXIMITY_THRESHOLD = 0.1

    def __init__(self, robot, scaling):
        self.robot = robot
        self.odom_pos = self.robot.current_pos
        self.scaling = scaling
        self.odom_rot = 0
        (self.roll, self.pitch, self.theta) = (0, 0, 0)
        self.odom_sub = rospy.Subscriber("/odom", Odometry, self.new_odom)

    def new_odom(self, msg):
        self.odom_pos = Position(-msg.pose.pose.position.y / self.scaling,
                                 -msg.pose.pose.position.x / self.scaling)
        self.odom_rot = msg.pose.pose.orientation
        (self.roll, self.pitch, self.theta) = euler_from_quaternion([self.odom_rot.x, self.odom_rot.y,
                                                                     self.odom_rot.z, self.odom_rot.w])

    def move(self, next_pos):
        while True:
            inc_col = next_pos.col - self.odom_pos.col
            inc_row = next_pos.row - self.odom_pos.row
            angle_to_next_pos = math.atan2(inc_row, inc_col)
            diff = angle_to_next_pos - self.theta

            if abs(diff) > self.THRESHOLD:
                if (diff > 0 and diff > math.pi) or (0 > diff > -math.pi):
                    self.robot.communication.move([0, 0, 0], [0, 0, -0.8])
                else:
                    self.robot.communication.move([0, 0, 0], [0, 0, 0.8])
            else:
                if diff > 0:
                    self.robot.communication.move([0.05, 0, 0], [0, 0, 0.1])
                else:
                    self.robot.communication.move([0.05, 0, 0], [0, 0, -0.1])

            if (abs(inc_col) < self.PROXIMITY_THRESHOLD and abs(inc_row) < self.PROXIMITY_THRESHOLD) or \
                    not (self.robot.sensor_state == SensorState.NO_OBSTACLE):
                self.robot.communication.stop()
                break

            self.robot.rate.sleep()

    def rotate(self, speed, angle, clockwise):
        angle -= 360
        if angle == 0:
            angle = 360
        angular_speed = speed * 2 * math.pi / 360
        angle_rad = angle * math.pi / 180
        if clockwise:
            angular_speed *= -1
        previous_theta = self.theta
        relative_delta = 0
        first = True
        while relative_delta < abs(angle_rad) - self.PROXIMITY_THRESHOLD:
            # Flag to fix weird bug
            if first:
                previous_theta = self.theta
                first = False
                continue
            print relative_delta
            # previous_theta 0.01 and theta -0.01
            if 0 <= previous_theta < math.pi / 2 and self.theta < 0:
                relative_delta += (abs(self.theta) - previous_theta)
            # previous_theta 3.14 and theta -3.14
            elif 0 < previous_theta < math.pi / 2 and self.theta < 0:
                relative_delta += (previous_theta - abs(previous_theta))
            # previous_theta -3.14 and theta 3.13
            elif 0 > previous_theta > - math.pi / 2 and self.theta > 0:
                relative_delta += (abs(previous_theta) - self.theta)
            # previous theta -0.01 and theta 0.01
            elif previous_theta <= 0 and previous_theta < - math.pi / 2 and self.theta > 0:
                relative_delta += (self.theta - abs(previous_theta))
            # theta 3.14 and previous_theta 3.10
            elif self.theta > previous_theta and self.theta > 0:
                relative_delta += self.theta - previous_theta
            # theta -3.10 and previous_theta -3.14
            elif previous_theta < self.theta < 0:
                relative_delta += (abs(previous_theta) - abs(self.theta))
            # theta 3.10 and previous_theta 3.14
            elif previous_theta > self.theta and previous_theta > 0:
                relative_delta += (previous_theta - self.theta)
            # theta -3.14 and previous_theta -3.10
            elif self.theta < previous_theta < 0:
                relative_delta += (abs(self.theta) - abs(previous_theta))

            previous_theta = self.theta

            self.robot.communication.move([0, 0, 0], [0, 0, angular_speed])
        self.robot.communication.stop()
