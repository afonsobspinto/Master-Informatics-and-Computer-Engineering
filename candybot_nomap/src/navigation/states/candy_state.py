import rospy
from interface import implements
from std_msgs.msg import String

from navigation.states.state_interface import StateInterface
from navigation.utils.switch_state import SwitchState


class CandyState(implements(StateInterface)):

    # 0 from Logic
    # 1 from Infrared
    def __init__(self, robot):
        """
        CandyState constructor
        @param robot:
        """
        self.robot = robot
        self.type = "CandyState"
        self.candy_pub = rospy.Publisher('give_candy', String, queue_size=1)
        self.candy_sub = rospy.Subscriber('give_candy', String, self.handler, queue_size=1)
        self.gave = False
        self.move_on = False

    def handler(self, string_msg):
        """
        Handler function for messages on give_candy topic
        @param string_msg:
        """
        if string_msg.data == "candy_finished":
            self.move_on = True

    def move(self):
        """
        move implementation
        """
        if not self.gave:
            self.give_candy("give_first")
            self.robot.sensors[0].finished_target()
            self.gave = True
        else:
            if self.move_on:
                self.robot.switch_state = SwitchState.TO_EXPLORER

    def give_candy(self, string_msg):
        """
        Publishes give_candy message
        @param string_msg:
        """
        msg = String()
        msg.data = string_msg
        self.candy_pub.publish(msg)
        self.robot.rate.sleep()
