from navigation.utils.position import Position
from robot import Robot


r = Robot(Position(5, 5), 10)
r.set_target(Position(2, 2))
r.move()
