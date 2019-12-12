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
from navigation.states.explorer_state import ExplorerState
from navigation.states.target_state import TargetState
from navigation.utils.switch_state import SwitchState

class Camera:
    def __init__(self, robot):
        print "Camera activated"
        self.robot = robot
        self.bridge = CvBridge()
        self.turtlebot_face_recognition = TurtlebotFaceRecognition(False, True)
        self.camera_sub = rospy.Subscriber("/raspicam_node/image/compressed", CompressedImage, self.callback)
        self.current_target = []
        self.finished_targets = []
        self.finished = False

    def __del__(self):
        cv2.destroyAllWindows()

    def callback(self, data):
        # If current target is finished, add it to finished list
        if self.finished and self.current_target:
            self.add_to_finished()

        # Get image and process it
        image_data = self.get_image_data(data)
        
        # Remove finished from data
        removed_data = self.remove_finished_from_image_data(image_data)

        # Set current target
        self.set_current_target(removed_data)

        # Print some debug info
        self.print_debug_info()

        if current_target:
            if self.robot.state.type == "ExplorerState":
                self.robot.switch_state = SwitchState.TO_TARGET
            self.set_target_in_odometry(cur_tar)

    def finished_target(self):
        self.finished = True

    def add_to_finished(self):
        # Add to finished
        self.finished_targets.append(self.current_target[0])

        # Clear current target
        self.current_target = []

        # Reset finished flag
        self.finished = False
        print "FINISHED TARGETS: " + str(self.finished_targets)

    def get_image_data(self, data):
        image = cv2.rotate(self.bridge.compressed_imgmsg_to_cv2(data, 'bgr8'), cv2.ROTATE_180)
        image_data = self.turtlebot_face_recognition.process_image_show(image)
        return image_data

    def remove_finished_from_image_data(self, data):
        temp_data = []
        for d in data:
            if d[0] not in self.finished_targets:
                temp_data.append(d)
        return temp_data

    def set_current_target(self, data):
        if data:
            if self.current_target:
                for d in data:
                    if self.current_target[0] == d[0]:
                        self.current_target = d
                        break
            else:
                self.current_target = data[0]

    def print_debug_info(self):
        print("-------")
        print(self.current_target)
        print(self.finished_targets)

    def set_target_in_odometry(self, cur_tar):
        self.robot.odometry.goal_front = cur_tar[3] #goal front
        self.robot.odometry.goal_side = cur_tar[4]  #goal side