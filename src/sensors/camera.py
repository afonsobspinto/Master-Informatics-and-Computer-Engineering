#!/usr/bin/env python
import roslib
import sys
import rospy
import cv2
from std_msgs.msg import String
from sensor_msgs.msg import Image, CompressedImage
from sensor_msgs.msg import CameraInfo
from cv_bridge import CvBridge, CvBridgeError
from turtlebot_face_recognition.turtlebot_face_recognition import TurtlebotFaceRecognition

class Camera:
    def __init__(self, robot):
        self.robot = robot
        self.bridge = CvBridge()
        self.turtlebot_face_recognition = TurtlebotFaceRecognition()
        self.camera_sub = rospy.Subscriber("/raspicam_node/image/compressed", CompressedImage, self.callback, queue_size=1)
    
    def __del__(self):
        cv2.destroyAllWindows()

    def callback(self, data):
        image = self.bridge.compressed_imgmsg_to_cv2(data, 'bgr8')
        self.turtlebot_face_recognition.process_image(image)
        cv2.imshow("PiCamera", image)
        cv2.waitKey(1)
