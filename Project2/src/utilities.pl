getIndex(Row, Col, ColumnSize, Index):-
    Col < ColumnSize,
    Index is Row * ColumnSize + Col.