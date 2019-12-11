import math

import aenum


class Orientation(aenum.AutoNumberEnum):
    _init_ = 'vector angle'
    FRONT = (0, 1), 0
    RIGHT = (-1, 0), 90
    BACK = (0, -1), 180
    LEFT = (1, 0), 270

    @staticmethod
    def get_orientation(origin, destination):
        max_axis = abs(max(destination.row - origin.row, destination.col - origin.col))
        if max_axis == 0: max_axis = 1
        ori = ((destination.row - origin.row) / max_axis, (destination.col - origin.col) / max_axis)
        for o in Orientation:
            if ori == o.vector:
                return o


