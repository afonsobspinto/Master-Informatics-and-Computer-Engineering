"""
Abandoned due to practical difficulties
"""

def float_to_int(number):
    return int(round(number))


class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        if isinstance(other, Position):
            return Position(self.row + other.row, self.col + other.col)
        if isinstance(other, tuple):
            return Position(self.row + other[0], self.col + other[1])

    def __str__(self):
        return "X: " + str(self.x) + " | Y: " + str(self.y)

