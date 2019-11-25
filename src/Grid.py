class Grid():
	def __init__(self):
		# Create 2D array of 50x50
		# 1 = 1cm
		self.square_scale = 10

		# Todo: center of grid
		self.current_x = 0
		self.current_y = 0
		self.grid = []

	def increaseSize(self, size):
		pass

	def addObstacle(self, x, y):
		# Add obstace to grid		

		# Update current Path
		pass

	def updateTarget(self, x, y):
		# Remove previous if exist
		# Add new Target
		pass

	# TODO: keep track of multiple persons or not?
	def addPerson(self, x, y):
		pass

	# perform pathfinding
	def pathFinding():

		moves = []
		
		followPath(moves)

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

