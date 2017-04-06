/*
 * Place.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Place.h"
#include <iostream>


using namespace std;



Place::Place(long long int id, Coord coord): id(id), coord(coord) {
	label = "noLabel";
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

const std::vector<Transition*>& Place::getTransitions() const {
	return transitions;
}

void Place::addTransitions( Transition* transition) {
	this->transitions.push_back(transition);
}

const std::string& Place::getLabel() const {
	return label;
}

void Place::setLabel(const std::string& label) {
	this->label = label;
}
