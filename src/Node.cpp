/*
 * Node.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Node.h"
#include <iostream>
#include <cstring>


using namespace std;

Node::Node(long long int id, Coord coord): id(id), coord(coord) {
	//cout << id << endl;
	//cout << coord << endl;
}


double Node::distance(Node& node2) {
	return this->coord.distance(node2.coord);
}

bool Node::operator ==(const Node& rhs) {
	return this->id == rhs.id;
}
