from navigation.utils.orientation import Orientation


def float_to_int(number):
    return int(round(number))


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

    def __str__(self):
        return "Row: " + str(self.row) + " | Col: " + str(self.col)

    def to_int(self):
        row = float_to_int(self.row)
        col = float_to_int(self.col)
        return Position(row, col)
