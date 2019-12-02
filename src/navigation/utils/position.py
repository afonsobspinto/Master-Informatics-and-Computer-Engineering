from navigation.utils.orientation import ORIENTATION


class Position:
    def __init__(self, row, col):
        self.row = row
        self.col = col

    def __eq__(self, other):
        if other:
            return self.row == other.row and self.col == other.col
        return False

    def __add__(self, other):
        if isinstance(other, Position):
            return Position(self.row + other.row, self.col + other.col)
        if isinstance(other, tuple):
            return Position(self.row + other[0], self.col + other[1])

    def get_orientation(self, next_pos):
        max_axis = abs(max(next_pos.row-self.row, next_pos.col - self.col))
        if max_axis == 0: max_axis = 1
        ori = ((next_pos.row-self.row) / max_axis, (next_pos.col - self.col) / max_axis)
        for o in ORIENTATION:
            if ori == o.value:
                return o
