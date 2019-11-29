import numpy as np 
import matplotlib.pyplot as plt
from Move import *

DEBUG = True

class Grid():
	ROWS = 50
	def __init__(self):
		# Create 2D array of 50x50
		# 1 = 1cm
		self.square_scale = 10

		self.grid = [[0 for j in range(self.ROWS+1)] for i in range(self.ROWS+1)]

		# Todo: center of grid
		self.current
		self.current_x = 25
		self.current_y = 25
		self.updateCurrent(self.current_x,self.current_y)

		self.current_target_x = -1
		self.current_target_y = -1


	def increaseSize(self, size):
		for r in self.grid:
			r.append([0 for _ in range(size)])
		for i in range(size):
			self.grid.append([0 for j in range(self.ROWS+size+1)])


	def addObstacle(self, x, y):
		# Add obstace to grid		

		# Update current Path
		pass

	def updateCurrent(self, x, y):
		if(self.grid[self.current_x][self.current_y]==1):
			self.grid[self.current_x][self.current_y] = 0
		self.grid[x][y] = 1
		self.current_x = x
		self.current_y = y

	def updateTarget(self, x, y):
		# Remove previous if exist
		# Add new Target

		pass

	# TODO: keep track of multiple persons or not?
	def addPerson(self, x, y):
		pass

	def _check_boundaries():
		diff_x = self.current_x

	# perform pathfinding
	def pathFinding(self):

		moves = [Move(5,5), Move(5,6), Move(5,8), Move(6,8), Move(7,8)]
		
		if(DEBUG):
			self.showGraph(moves)
		else:
			self.followPath(moves)
		

	def followPath(moves):
		for m in moves:
			move(m)

	# Up, down, left, right
	def move(m):
		# m.x, m.y
		# Rotate
		# Publish
		# Move
		# Publish to
		# Queue in Ros?
		# update self.current
		pass

	def showGraph(self,moves):
		for move in moves:
			self.updateCurrent(move.x, move.y)
			plt.imshow(self.grid)
			plt.pause(1)
		plt.show()
