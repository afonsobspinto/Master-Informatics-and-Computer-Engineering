/*
 * Place.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Place.h"
#include <iostream>


using namespace std;

Place::Place(long long int id, Coord coord, std::string name): id(id), coord(coord), name(name)  {
}


double Place::getDistance(Place* Place2) {
	return this->coord.distance(Place2->coord);
}

bool Place::operator ==(const Place& rhs) {
	return this->id == rhs.id;
}

const Coord& Place::getCoord() const {
	return coord;
}

long long int Place::getID() const {
	return id;
}

const std::string Place::getName() const{
	return name;
}

const std::vector<Transition*>& Place::getTransitions() const {
	return transitions;
}

void Place::addTransitions( Transition* transition) {
	this->transitions.push_back(transition);
}
