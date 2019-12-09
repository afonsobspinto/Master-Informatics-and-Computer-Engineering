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
        self.turtlebot_face_recognition = TurtlebotFaceRecognition(False, True)
        self.camera_sub = rospy.Subscriber("/raspicam_node/image/compressed", CompressedImage, self.callback)
    
    def __del__(self):
        cv2.destroyAllWindows()

    def callback(self, data):
        image = cv2.rotate(self.bridge.compressed_imgmsg_to_cv2(data, 'bgr8'), cv2.ROTATE_180)
        data = self.turtlebot_face_recognition.process_image_show(image)
        
