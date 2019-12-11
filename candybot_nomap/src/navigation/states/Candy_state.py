from interface import implements
from navigation.states.state_interface import StateInterface
from std_msgs.msg import Bool
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
        self.candy_pub = rospy.Publisher('give_candy', Bool, queue_size=1)
        self.gave = False
        # Create subscriber to pi here
        # pi is also subscriber to give_candy
        # Todo: bool will have to be int because different from algorithm or from "thank you"

    def move(self):
        if not self.gave:
            print "Giving Candy!"
            time.sleep(2)
            bl = Bool()
            bl.data = True
            self.candy_pub.publish(bl)
            self.robot.rate.sleep()
            self.robot.sensors[0].finished_target()
            self.gave = True
        else:
            #Actually listen to sound from pi: if thank you give another candy (send from here)
            #then go to explorer
            # if no thank you, immediately go to explorer
            time.sleep(2)
            self.robot.switch_state = SwitchState.TO_EXPLORER
            pass
