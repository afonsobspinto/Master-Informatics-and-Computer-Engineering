import time

from navigation.grid import GridType
from navigation.utils.position import Position
from robot import Robot


r = Robot(Position(5, 5), 5)

r.grid.set_pos(Position(3, 3), GridType.OBSTACLE)
r.grid.set_pos(Position(3, 2), GridType.OBSTACLE)
r.grid.set_pos(Position(3, 1), GridType.OBSTACLE)
r.grid.set_pos(Position(3, 0), GridType.OBSTACLE)
r.grid.set_pos(Position(2, 3), GridType.OBSTACLE)
r.grid.set_pos(Position(1, 3), GridType.OBSTACLE)
#r.grid.set_pos(Position(0, 3), GridType.OBSTACLE)
r.grid.set_pos(Position(3, 8), GridType.OBSTACLE)
#time.sleep()
r.set_target(Position(2, 2))
r.move()
