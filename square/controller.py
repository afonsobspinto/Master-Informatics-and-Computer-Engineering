#!/usr/bin/env python
import rospy
from nav_msgs.msg import Odometry
from tf.transformations import euler_from_quaternion
from geometry_msgs.msg import Point, Twist
from math import atan2

x = 0.0
y = 0.0
theta = 0.0

def newOdom(msg):
    global x
    global y
    global theta

    x = msg.pose.pose.position.x
    y = msg.pose.pose.position.y

    rot_q = msg.pose.pose.orientation
    (roll, pitch, theta) = euler_from_quaternion([rot_q.x, rot_q.y, rot_q.z, rot_q.w])

rospy.init_node("square_publisher")

sub = rospy.Subscriber("/odom", Odometry, newOdom)
pub = rospy.Publisher("/cmd_vel", Twist, queue_size = 1)

speed = Twist()

r = rospy.Rate(50)

goal = Point()

xl = [0,0,1,1]
yl = [0,1,1,0]

cur = 0
goal.x = xl[cur]
goal.y = yl[cur]

while not rospy.is_shutdown():
    inc_x = goal.x -x
    inc_y = goal.y -y


    angle_to_goal = atan2(inc_y, inc_x)

    diff = angle_to_goal-theta
    #print(diff)
    if abs(diff) > 0.2:
        if(diff > 0 and diff < 3.14159):
            speed.linear.x = 0.0
            speed.angular.z = 0.8
        elif(diff>0 and diff > 3.14159):
            speed.linear.x = 0.0
            speed.angular.z = -0.8
        elif(diff<0 and diff > -3.14159):
            speed.linear.x = 0.0
            speed.angular.z = -0.8
        else:
            speed.linear.x = 0.0
            speed.angular.z = 0.8

    else:
        speed.linear.x = 0.2
        if(diff > 0):
            speed.angular.z = 0.1
        else:
            speed.angular.z = -0.1

    if(abs(inc_x) < 0.1 and abs(inc_y) < 0.1):
        cur = (cur+1)%4
        goal.x = xl[cur]
        goal.y = yl[cur]
        #print("Changed current goal to: ", goal.x, " ", goal.y)

    pub.publish(speed)
    r.sleep()
