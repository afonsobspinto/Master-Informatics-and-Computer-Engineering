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
        self.current_target = 0
        self.finished_targets = []
        self.finished = False
        self.all_data = []

    def __del__(self):
        cv2.destroyAllWindows()

    def callback(self, data):
        image = cv2.rotate(self.bridge.compressed_imgmsg_to_cv2(data, 'bgr8'), cv2.ROTATE_180)
        #data = self.turtlebot_face_recognition.process_image_data(image)
        data = self.turtlebot_face_recognition.process_image_show(image)
        self.add_to_all_data(data)
        print self.all_data
        # TODO: is this correctly handled?
        if self.finished:
            if(self.current_target > 0):
                self.finished_targets.append(self.current_target)
                self.current_target = 0
                self.finished = False
                print "FINISHED TARGETS: " + str(self.finished_targets)
        
        for i, d in enumerate(self.all_data):
            if(d[0] in self.finished_targets):
                del self.all_data[i]
        if self.all_data:
            cur_tar = []
            if self.current_target == 0:
                self.current_target = self.all_data[0][0]
            for cur in self.all_data:
                if cur[0] == self.current_target:
                    cur_tar = cur
            if cur_tar:
                if self.robot.state.type == "ExplorerState":
                    self.robot.switch_state = SwitchState.TO_TARGET
                goal_front = cur_tar[3]
                goal_side = cur_tar[4]
                self.robot.odometry.goal_front = goal_front
                self.robot.odometry.goal_side = goal_side

    def add_to_all_data(self, data):
        temp = []
        for d in self.all_data:
            temp.append(d)
        for d in data:
            found = False
            for i, ad in enumerate(self.all_data):
                if d[0] == ad[0]:
                    temp[i] = d
                    found = True
            if not found:
                temp.append(d)
        self.all_data = temp


    def finished_target(self):
        self.finished = True



