import collections

import matplotlib.pyplot as plt
from enum import Enum

import numpy
from matplotlib import colors

from settings import DEBUG


class GridType(Enum):
    SPACE = 1.0
    OBSTACLE = 2.0
    ROBOT = 3.0
    TARGET = 4.0


class Grid:

    def __init__(self, robot_pos, rows, scaling=1):
        if DEBUG:
            self.cmap = colors.ListedColormap(['white', 'black', 'blue', 'red'])
            bounds = [0, 1.5, 2.5, 3.5, 4.5]
            self.norm = colors.BoundaryNorm(bounds, self.cmap.N)
        self.rows = rows
        self.scaling = scaling
        self.grid = collections.deque(
            [collections.deque([GridType.SPACE.value for _ in range(self.rows + 1)]) for i in range(self.rows + 1)]
        )
        self.set_pos(robot_pos, GridType.ROBOT)

    def set_pos(self, position, grid_type, old_position=None, old_grid_type=GridType.SPACE):
        shift = self._check_boundaries(position)
        self.grid[position.col][position.row] = grid_type.value
        if old_position:
            self.grid[old_position.col][old_position.row] = old_grid_type.value
        if DEBUG:
            plt.imshow(self.grid, cmap=self.cmap, norm=self.norm)
            plt.pause(0.4)
        return shift

    def _check_boundaries(self, position):
        min_axis = 0
        if position.row > self.rows or position.col > self.rows:
            self.rows = max(abs(position.row), abs(position.col))
            self._increase_map()
        if position.row < 0 or position.col < 0:
            min_axis = min(position.row, position.col)
            self.rows += abs(min_axis)
            self._shift_map()
            position.col += abs(min_axis)
            position.row += abs(min_axis)
        return abs(min_axis)

    def _increase_map(self):
        diff = self.rows - len(self.grid[0]) + 1
        for row in self.grid:
            row.extend([GridType.SPACE.value for _ in range(0, diff)])
        for _ in range(0, diff):
            self.grid.append(collections.deque([GridType.SPACE.value for _ in range(0, self.rows + 1)]))

    def _shift_map(self):
        diff = self.rows - len(self.grid[0]) + 1
        for row in self.grid:
            row.extendleft([GridType.SPACE.value for _ in range(0, diff)])
        for _ in range(0, diff):
            self.grid.appendleft(collections.deque([GridType.SPACE.value for _ in range(0, self.rows + 1)]))

    def get_pos(self, position):
        return self.grid[position.col][position.row]
