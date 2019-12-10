from interface import implements
from navigation.states.state_interface import StateInterface
from navigation.utils.orientation import Orientation


class TargetState(implements(StateInterface)):

    def __init__(self, robot, data):
        print "Init TargetState"
        self.robot = robot
        self.type = "TargetState"
        self.data = data
        self.current_target = 0

    def move(self):
        cur_tar = []
        cur_data = self.data
        if cur_data:
            if self.current_target == 0:
                self.current_target = cur_data[0][0]
            for cur in cur_data:
                if cur[0] == self.current_target:
                    cur_tar = cur

            goal_front = cur_tar[3]
            goal_side = cur_tar[4]
            distance_tuple = (
                self.robot.orientation.vector[0] * goal_front / self.robot.odometry.scaling,
                self.robot.orientation.vector[1] * goal_side / self.robot.odometry.scaling)
            goal_pos = self.robot.position + distance_tuple

    def update_data(self, new_data):
        # Need to update, but keep the labels intact
        print "Update data"
        temp = self.data
        for i, new in enumerate(new_data):
            found = False
            for j, old in enumerate(self.data):
                if new[0] == old[0] and not found:
                    temp[j] = new
                    found = True
                    break
            if not found:
                temp.append(new)
        self.data = temp
        print(self.data)
