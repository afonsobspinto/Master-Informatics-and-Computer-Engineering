/*
 * Place.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Place.h"
#include <iostream>
#include <cstring>


using namespace std;

Place::Place(long long int id, Coord coord): id(id), coord(coord) {
	//cout << id << endl;
	//cout << coord << endl;
}


double Place::distance(Place& Place2) {
	return this->coord.distance(Place2.coord);
}

bool Place::operator ==(const Place& rhs) {
	return this->id == rhs.id;
}
