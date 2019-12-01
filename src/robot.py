from navigation.grid import Grid, GridType
from navigation.utils.position import Position


class Robot:
    def __init__(self, initial_position=Position(25, 25), rows=50):
        self.current_position = initial_position
        self.grid = Grid(self.current_position, rows)
        self.current_target = None
        self.path = []

    def set_target(self, target_pos):
        if self.current_target != target_pos:
            self.current_target = target_pos
            self._find_path()

    def _find_path(self):
        self.path = [
            Position(5, 4), Position(5, 3), Position(5, 2),
            Position(4, 2), Position(3, 2), Position(2, 2)
            ]

    def move(self):
        for next_pos in self.path:
            self.grid.set_pos(next_pos, GridType.ROBOT, self.current_position)
            self.current_position = next_pos

