"""
Abandoned due to practical difficulties
"""

import collections
import matplotlib.animation as animation
import matplotlib.pyplot as plt
from enum import Enum

from settings import DEBUG


class GridType(Enum):
    SPACE = 0.0
    OBSTACLE = 0.1
    ROBOT = -0.1
    TARGET = 0.05


class Grid:
    def __init__(self, robot_pos, rows):
        self.rows = rows
        self.grid = collections.deque(
            [collections.deque([GridType.SPACE.value for _ in range(self.rows + 1)]) for i in range(self.rows + 1)]
        )
        if DEBUG:
            fig, ax = plt.subplots()
            self.matrix = ax.matshow(self.grid)
            plt.colorbar(self.matrix)
            self.ani = animation.FuncAnimation(fig, self.update_visual, interval=500)
        self.set_pos(robot_pos, GridType.ROBOT)

    def update_visual(self, i):
        self.matrix.set_array(self.grid)

    def set_pos(self, position, grid_type, old_position=None, old_grid_type=GridType.SPACE):
        # remove from grid if robot or target
        if grid_type == GridType.ROBOT or grid_type == GridType.TARGET:
            for i in range(0, len(self.grid)):
                for j in range(0, len(self.grid[0])):
                    if self.grid[i][j] == grid_type.value:
                        #print("Remove target: " + str(i) + " " + str(j))
                        self.grid[i][j] = GridType.SPACE.value
        shift = self._check_boundaries(position)
        self.grid[position.col][position.row] = grid_type.value
        #print("Set target: " + str(position.col) + " " + str(position.row))
        if old_position:
            self.grid[old_position.col][old_position.row] = old_grid_type.value
        if DEBUG:
            plt.draw()
            plt.pause(0.3)

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
