#!/usr/bin/env python
import roslib
roslib.load_manifest('beginner_tutorials')
import sys
import rospy
from std_msgs.msg import String
from sensor_msgs.msg import Image, CompressedImage
from sensor_msgs.msg import CameraInfo
from cv_bridge import CvBridge, CvBridgeError
import cv2

class ImageListener:
    def __init__(self):
        self.bridge = CvBridge()
        self.image_sub = rospy.Subscriber("/raspicam_node/image/compressed", CompressedImage, self.callback)
    
    def callback(self, data):
        try:
            cv_image = self.bridge.compressed_imgmsg_to_cv2(data, 'bgr8')
        except CvBridgeError as e:
            print(e)
        (rows, cols, channels) = cv_image.shape
        cv2.imshow("Image Window", cv_image)
        cv2.waitKey(3)

if __name__ == '__main__':
    ic = image_converter()
    rospy.init_node('ImageListener')
    rospy.spin()
    cv2.destroyAllWindows()
