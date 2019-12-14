from interface import implements
from navigation.states.state_interface import StateInterface
from std_msgs.msg import String
import rospy
from navigation.utils.switch_state import SwitchState
import time


class CandyState(implements(StateInterface)):

    # 0 from Logic
    # 1 from Infrared
    def __init__(self, robot):
        print "Init CandyState"
        self.robot = robot
        self.type = "CandyState"
        self.candy_pub = rospy.Publisher('give_candy', String, queue_size=1)
        self.candy_sub = rospy.Subscriber('give_candy', String, self.handler, queue_size=1)
        self.gave = False
        self.move_on = False
        # Create subscriber to pi here
        # pi is also subscriber to give_candy
        # Todo: bool will have to be int because different from algorithm or from "thank you"

    def handler(self, string_msg):
        print "Received candy msg: " + str(string_msg.data)
        if string_msg.data == "candy_finished":
            self.move_on = True

    def move(self):
        if not self.gave:
            self.give_candy("give_first")
            self.robot.sensors[0].finished_target()
            self.gave = True
            print "Waiting while giving Candy"
        else:
            if self.move_on:
                self.robot.switch_state = SwitchState.TO_EXPLORER

    def give_candy(self, string_msg):
        print "Giving Candy!"
        msg = String()
        msg.data = string_msg
        self.candy_pub.publish(msg)
        self.robot.rate.sleep()
