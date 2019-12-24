#!/usr/bin/env python
import cv2
import rospy
from cv_bridge import CvBridge
from sensor_msgs.msg import CompressedImage
from navigation.utils.switch_state import SwitchState
from turtlebot_face_recognition.turtlebot_face_recognition import TurtlebotFaceRecognition


class Camera:
    def __init__(self, robot):
        """
        Camera sensor constructor
        @param robot:
        """
        self.robot = robot
        self.bridge = CvBridge()
        self.turtlebot_face_recognition = TurtlebotFaceRecognition(False, True)
        self.camera_sub = rospy.Subscriber("/raspicam_node/image/compressed", CompressedImage, self.callback)
        self.current_target = []
        self.finished_targets = []
        self.finished = False

    def __del__(self):
        """
        Camera sensor destructor
        """
        cv2.destroyAllWindows()

    def callback(self, data):
        """
        Handler function for /raspicam_node/image/compressed messages
        @param data:
        """
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
        # self.print_debug_info()

        if self.current_target:
            if self.robot.state.type == "ExplorerState":
                if self.robot.state.target is None:
                    self.robot.switch_state = SwitchState.TO_TARGET
                else:
                    if ((self.current_target[3] is not self.robot.state.target[3] or (
                            self.current_target[4] is not self.robot.state.target[4]))):
                        self.robot.switch_state = SwitchState.TO_TARGET
            self.set_target_in_odometry(self.current_target)

    def finished_target(self):
        """
        Sets finished flag to true
        """
        self.finished = True

    def add_to_finished(self):
        """
        Adds current_target[0] to finished list
        """
        # Add to finished
        self.finished_targets.append(self.current_target[0])

        # Clear current target
        self.current_target = []

        # Reset finished flag
        self.finished = False

    def get_image_data(self, data):
        """
        Gets/Interprets image from data message
        @param data:
        @return:
        """
        image = cv2.rotate(self.bridge.compressed_imgmsg_to_cv2(data, 'bgr8'), cv2.ROTATE_180)
        image_data = self.turtlebot_face_recognition.process_image_show(image)
        return image_data

    def remove_finished_from_image_data(self, data):
        """
        Removes faces already served
        @param data:
        @return:
        """
        temp_data = []
        for d in data:
            if d[0] not in self.finished_targets:
                temp_data.append(d)
        return temp_data

    def set_current_target(self, data):
        """
        Sets current target
        @param data:
        """
        if data:
            if self.current_target:
                for d in data:
                    if self.current_target[0] == d[0]:
                        self.current_target = d
                        break
            else:
                self.current_target = data[0]

    def set_target_in_odometry(self, cur_tar):
        """
        Sets target in odometry
        @param cur_tar:
        """
        self.robot.odometry.goal_front = cur_tar[3]  # goal front
        self.robot.odometry.goal_side = cur_tar[4]  # goal side

    def clear_current_target(self):
        """
        Clears current target
        """
        # Clear current target
        self.current_target = []

        # Reset finished flag
        self.finished = False
