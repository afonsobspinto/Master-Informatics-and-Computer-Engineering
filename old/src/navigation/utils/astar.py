##################
# Code adapted from
# https://gist.githubusercontent.com/Nicholas-Swift/003e1932ef2804bebef2710527008f44/raw/8fd79d81dcd5b52d01918b29689e0727154f886c/astar.py
# author: Nicholas Swift
##################
from navigation.grid import GridType
from navigation.utils.position import Position


class Node:
    """A node class for A* Pathfinding"""

    def __init__(self, parent=None, position=None):
        self.parent = parent
        self.position = position

        self.g = 0
        self.h = 0
        self.f = 0

    def __eq__(self, other):
        return self.position == other.position


class ContinueOuter(Exception):
    pass


def astar(maze, start, end):
    """Returns a list of positions as a path from the given start to the given end in the given maze"""

    # Create start and end node
    start_node = Node(None, start)
    end_node = Node(None, end)

    # Initialize both open and closed list
    open_list = []
    closed_list = []

    # Add the start node
    open_list.append(start_node)

    # Loop until you find the end
    while len(open_list) > 0:

        # Get the lowest f_cost to current node
        current_node = open_list[0]
        current_index = 0
        for index, item in enumerate(open_list):
            if item.f < current_node.f:
                current_node = item
                current_index = index

        # Pop current off open list, add to closed list
        open_list.pop(current_index)
        closed_list.append(current_node)

        # Found the goal
        if current_node == end_node:
            path = []
            current = current_node
            while current is not None:
                path.append(current.position)
                current = current.parent
            return path[::-1][1::]  # Return reversed path without 1st position

        # Generate children
        children = []
        for new_position in [(0, -1), (0, 1), (-1, 0), (1, 0)]:  # Adjacent squares

            # Get node position
            node_position = Position(current_node.position.row + new_position[0],
                                     current_node.position.col + new_position[1])

            # Make sure within range
            if node_position.row > (len(maze) - 1) or node_position.row < 0 or node_position.col > (
                    len(maze[len(maze) - 1]) - 1) or node_position.col < 0:
                continue

            # Make sure walkable terrain
            if maze[node_position.col][node_position.row] == GridType.OBSTACLE.value:
                continue

            # Make sure neighbour is not in the closed list
            if Node(current_node, node_position) in closed_list:
                continue

            # Create new node
            new_node = Node(current_node, node_position)

            # Append
            children.append(new_node)

        # Loop through children
        for child in children:

            try:
                # Child is on the closed list
                for closed_child in closed_list:
                    if child == closed_child:
                        raise ContinueOuter()
            except ContinueOuter:
                continue

            # Create the f, g, and h values
            child.g = current_node.g + 1
            child.h = ((child.position.row - end_node.position.row) ** 2) + (
                    (child.position.col - end_node.position.col) ** 2)
            child.f = child.g + child.h

            try:
                # Child is already in the open list
                for open_node in open_list:
                    if child == open_node and child.g > open_node.g:
                        raise ContinueOuter()
            except ContinueOuter:
                continue

            # Add the child to the open list
            open_list.append(child)
