class Position:
	def __init__(self, row, col):
		self.row = row
		self.col = col

	def __eq__(self, other):
		if other:
			return self.row == other.row and self.col == other.col
		return False
