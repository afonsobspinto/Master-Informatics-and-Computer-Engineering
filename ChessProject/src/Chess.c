void drawBoard(Piece pieces[][8])
{
	//Black pieces are going to be all lower case and white pieces are going to be upper case

    //array location new type  name  color
	pieces[7][0] = new Rook   ('R', 'b');
	pieces[7][1] = new Knight ('N', 'b');
	pieces[7][2] = new Bishop ('B', 'b');
	pieces[7][3] = new King   ('K', 'b');
	pieces[7][4] = new Queen  ('Q', 'b');
	pieces[7][5] = new Bishop ('B', 'b');
	pieces[7][6] = new Knight ('N', 'b');
	pieces[7][7] = new Rook   ('R', 'b');

	//set the blank pieces and pawns
	for (int col = 0; col <= 7; col++)
		pieces[6][col] = new Pawn('p', 'b');

	for (int col = 0; col <= 7; col++)
		pieces[5][col] = new Empty(' ', 'e');

	for (int col = 0; col <= 7; col++)
		pieces[4][col] = new Empty(' ', 'e');

	for (int col = 0; col <= 7; col++)
		pieces[3][col] = new Empty(' ', 'e');

	for (int col = 0; col <= 7; col++)
		pieces[2][col] = new Empty(' ', 'e');

	for (int col = 0; col <= 7; col++)
		pieces[1][col] = new Pawn('p', 'w');

	//set the black pieces

	pieces[0][0] = new Rook  ('R', 'w');
	pieces[0][1] = new Knight('N', 'w');
	pieces[0][2] = new Bishop('B', 'w');
	pieces[0][3] = new King  ('K', 'w');
	pieces[0][4] = new Queen ('Q', 'w');
	pieces[0][5] = new Bishop('B', 'w');
	pieces[0][6] = new Knight('N', 'w');
	pieces[0][7] = new Rook  ('R', 'w');


	// display the column header
	cout << "   A  B  C  D  E  F  G  H \n";


	//Use a standard for loop in order to set the board with row and column label
	for (int row = 7; row >= 0; row--)
	{
		cout << row + 1 << " ";
		for (int col = 0; col <= 7; col++)
		{
			cout << " " << pieces[row][col].name << " ";
		}
		cout << endl;
	}

}
