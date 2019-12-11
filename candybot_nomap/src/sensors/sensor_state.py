from enum import Enum


class SensorState(Enum):
    NO_OBSTACLE = 0
    CLIFF = 1
    OBSTACLE = 2

