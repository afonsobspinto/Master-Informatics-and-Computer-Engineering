import matplotlib.pyplot as plt
from enum import Enum

import numpy

from settings import DEBUG


class GridType(Enum):
    SPACE = 1.0
    OBSTACLE = 2.0
    ROBOT = 3.0
    TARGET = 4.0


class Grid:

    def __init__(self, robot_pos, rows, scaling=1):
        self.rows = rows
        self.scaling = scaling
        self.grid = [[GridType.SPACE.value for j in range(self.rows + 1)] for i in range(self.rows + 1)]
        self.set_pos(robot_pos, GridType.ROBOT)

    def set_pos(self, position, grid_type, old_position=None, old_grid_type=GridType.SPACE):
        # todo: check boundaries, increase map
        self.grid[position.col][position.row] = grid_type.value
        if old_position:
            self.grid[old_position.col][old_position.row] = old_grid_type.value
        if DEBUG:
            plt.imshow(self.grid)
            plt.pause(1)

    def get_pos(self, position):
        return self.grid[position.col][position.row]
