import math

import rospy
from nav_msgs.msg import Odometry
from tf.transformations import euler_from_quaternion

from navigation.utils.position import Position
from navigation.utils.sensor_side import SensorSide


def _converter(angle):
    """
    Custom degrees to rad converter
    @param angle:
    @return:
    """
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

    def __init__(self, robot):
        """
        RobotOdometry constructor
        @param robot:
        """
        self.robot = robot
        self.odom_sub = rospy.Subscriber("/odom", Odometry, self.update_odom)
        self.odom_pos = None
        self.odom_rot = 0
        (self.roll, self.pitch, self.theta) = (0, 0, 0)
        self.pose = None
        self.cont = False
        self.goal_front = 1
        self.goal_side = 0

    def update_odom(self, msg):
        """
        Handler for odom topic messages
        @param msg:
        """
        self.odom_pos = Position(-msg.pose.pose.position.y,
                                 -msg.pose.pose.position.x)
        self.odom_rot = msg.pose.pose.orientation
        (self.roll, self.pitch, self.theta) = euler_from_quaternion([self.odom_rot.x, self.odom_rot.y,
                                                                     self.odom_rot.z, self.odom_rot.w])

    def move(self):
        """
        Sets the movement velocity/direction
        """
        if self.cont:
            angle_to_goal = math.atan(self.goal_side/self.goal_front)
            mov = [0.05, 0, 0]
            if angle_to_goal > 0:
                rot = [0, 0, 0.05]
            else:
                rot = [0, 0, -0.05]
            self.robot.communication.move(mov, rot)

    def rotate(self, clockwise):
        """
        Sets the rotation velocity/direction
        @param clockwise:
        """
        mov = [0, 0, 0]
        if clockwise:
            rot = [0, 0, -0.3]
        else:
            rot = [0, 0, 0.3]
        self.robot.communication.move(mov, rot)

    def move_straight(self):
        """
        Sets moving straight velocity
        """
        mov = [0.05, 0, 0]
        rot = [0, 0, 0]
        self.robot.communication.move(mov, rot)

    def move_back(self, sensor_side):
        """
        Sets moving straight velocity and rotation
        @param sensor_side:
        """
        mov = [-0.05, 0, 0]
        if sensor_side == SensorSide.LEFT:
            rot = [0, 0, 0.1]
        elif sensor_side == SensorSide.RIGHT:
            rot = [0, 0, -0.1]
        else:
            rot = [0, 0, 0]
        self.robot.communication.move(mov, rot)

    def stop(self):
        """
        Sets stop velocity and rotation
        """
        mov = [0, 0, 0]
        rot = [0, 0, 0]
        self.robot.communication.move(mov, rot)