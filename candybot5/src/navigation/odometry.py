import math
import sys

import rospy
from nav_msgs.msg import Odometry
from tf.transformations import euler_from_quaternion

from navigation.utils.orientation import Orientation
from navigation.utils.position import Position


def _converter(angle):
    if angle < 0:
        angle *= -1
    angle %= 360
    if angle == 0:
        angle = 360
    return angle * math.pi / 180


class RobotOdometry:
    PROXIMITY_THRESHOLD = 0.1
    CORRECTION_THRESHOLD = 0.2
    ERROR_DELTA = 0.09

    def __init__(self, robot, scaling):
        self.robot = robot
        self.scaling = scaling
        self.odom_sub = rospy.Subscriber("/odom", Odometry, self.update_odom)
        self.odom_pos = None
        self.odom_rot = 0
        (self.roll, self.pitch, self.theta) = (0, 0, 0)
        self.pose = None

    def update_odom(self, msg):
        self.odom_pos = Position(-msg.pose.pose.position.y / self.scaling,
                                 -msg.pose.pose.position.x / self.scaling)
        self.odom_rot = msg.pose.pose.orientation
        (self.roll, self.pitch, self.theta) = euler_from_quaternion([self.odom_rot.x, self.odom_rot.y,
                                                                     self.odom_rot.z, self.odom_rot.w])
        self.robot.update_odometry()

    def _euclidean_distance(self, next_pos):
        return round(math.sqrt(pow((next_pos.col - self.odom_pos.col), 2) +
                         pow((next_pos.row - self.odom_pos.row), 2)), 2)

    def move(self, next_pos, lin_speed=0.08):
        next_orientation = Orientation.get_orientation(self.robot.position, next_pos)
        steering_angle = next_orientation.angle - self.robot.orientation.angle
        angle = steering_angle % 180
        clockwise = steering_angle < 180
        self.rotate(angle, clockwise=clockwise)
        distance = self._euclidean_distance(next_pos)
        previous_distance = 2
        failure_delta = 1
        while distance >= self.PROXIMITY_THRESHOLD * failure_delta:
            # todo: apply corrections
            if self._detect_failure(previous_distance, distance):
                self.robot.communication.stop()
                lin_speed *= -0.9
                failure_delta *= 1.1
                print previous_distance-distance
            self.robot.communication.move([lin_speed, 0, 0], [0, 0, 0])
            self.robot.rate.sleep()
            previous_distance = distance
            distance = self._euclidean_distance(next_pos)

        self.robot.communication.stop()

    def _detect_failure(self, previous_distance, distance):
        return previous_distance < distance

    def rotate(self, angle, speed=50, clockwise=True, rad=False):
        if angle == 0:
            return
        angle_rad = angle if rad else _converter(angle)
        angular_speed = speed * 2 * math.pi / 360
        if angle < 0:
            clockwise = not clockwise
        if clockwise:
            angular_speed *= -1.0
        previous_theta = self.theta
        relative_delta = 0
        while relative_delta < abs(angle_rad) - self.PROXIMITY_THRESHOLD:
            relative_delta = self._rotate_logic(previous_theta, relative_delta)
            previous_theta = self.theta
            self.robot.communication.move([0, 0, 0], [0, 0, angular_speed])
        self.robot.communication.stop()

    def _rotate_logic(self, previous_theta, relative_delta):
        # previous_theta 0.01 and theta -0.01
        if 0 <= previous_theta < (math.pi / 2) and self.theta < 0:
            relative_delta += (abs(self.theta) - previous_theta)
        # previous_theta 3.14 and theta -3.14
        elif 0 < previous_theta > (math.pi / 2) and self.theta < 0:
            relative_delta += (previous_theta - abs(previous_theta))
        # previous_theta -3.14 and theta 3.13
        elif 0 > previous_theta > - (math.pi / 2) and self.theta > 0:
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
        return relative_delta
