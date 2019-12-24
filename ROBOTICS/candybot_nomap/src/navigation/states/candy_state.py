from interface import implements
from navigation.states.state_interface import StateInterface
from std_msgs.msg import String
import rospy
from navigation.utils.switch_state import SwitchState
import time


class CandyState(implements(StateInterface)):
    TIMEOUT = 10

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
        self.timer = 0

    def handler(self, string_msg):
        """
        Handler function for messages in give_candy topic
        @param string_msg:
        """
        if string_msg.data == "candy_finished":
            self.move_on = True

    def move(self):
        """
        move implementation
        """
        if not self.gave:
            self.give_candy()
            self.robot.sensors[0].finished_target()
            self.gave = True
            self.timer = time.time()
        else:
            if self.move_on or time.time() - self.timer > self.TIMEOUT:
                self.robot.switch_state = SwitchState.TO_EXPLORER

    def give_candy(self):
        """
        Publishes message in give_candy
        """
        time.sleep(2)
        self.robot.communication.play_sound('give_first')
