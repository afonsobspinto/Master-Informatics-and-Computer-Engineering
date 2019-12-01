from navigation.grid import GridType
from navigation.utils.position import Position
from robot import Robot


r = Robot(Position(5, 5), 10)

r.grid.set_pos(Position(3, 3), GridType.OBSTACLE)
r.grid.set_pos(Position(3, 2), GridType.OBSTACLE)
r.set_target(Position(2, 2))
r.move()
