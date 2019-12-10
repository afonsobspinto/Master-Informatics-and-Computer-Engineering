import rospy
import numpy as np
import cv2
from std_msgs.msg import Image, CompressedImage
from cv_bridge import CvBridge

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + "Log: %s", data.data)

def listener():
    rospy_init_node('listener', anonymous=True)
    rospy.Subscriber('image/compressed', CompressedImage, callback)
    rospy.spin()

if __name__ == '__main__':
    listener()