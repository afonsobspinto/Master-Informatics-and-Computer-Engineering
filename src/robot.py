
from navigation.grid import Grid, GridType
from navigation.utils.astar import astar
from navigation.utils.orientation import ORIENTATION
from navigation.utils.position import Position
from sensors.infrared import Infrared
from sensors.ultrasound import Ultrasound


class Robot:
    def __init__(self, initial_position=Position(25, 25), rows=50):
        self.orientation = ORIENTATION.UP
        self.current_position = initial_position
        self.grid = Grid(self.current_position, rows)
        self.current_target = None
        self.path = []
        self._init_sensors()

    def _init_sensors(self):
        self.sensors = [Infrared(self)]

    def set_target(self, target_pos):
        if self.current_target != target_pos:
            self.current_target = target_pos
            shift = self.grid.set_pos(self.current_target, GridType.TARGET)
            print("fsf")
            self._update_positions(shift)
            self._find_path()

    def _update_positions(self, shift):
        self.current_position.row += shift
        self.current_position.col += shift

    def _find_path(self):
        self.path = astar(self.grid.grid,
                          self.current_position,
                          self.current_target)

    def move(self):
        if self.path:
            for next_pos in self.path:
                self.orientation = self.current_position.get_orientation(next_pos)
                # todo: add way to show orientation in plot
                print(self.orientation.value)
                # todo: rotate bot + move
                self.grid.set_pos(next_pos, GridType.ROBOT, self.current_position)
                self.current_position = next_pos

    def set_cliff(self):
        distance_tuple = (self.orientation.value[0] * self.grid.scaling, self.orientation.value[1] * self.grid.scaling)
        cliff_pos = self.current_position + distance_tuple
        self.grid.set_pos(cliff_pos, GridType.OBSTACLE)
        self._find_path()

    def set_obstacle(self, distance):
        distance_tuple = (self.orientation.value[0] * distance * self.grid.scaling, self.orientation.value[1] * distance * self.grid.scaling)
        obstacle_pos = self.current_position + distance_tuple
        self.grid.set_pos(obstacle_pos, GridType.OBSTACLE)
        self._find_path()
