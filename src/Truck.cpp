/*
 * Truck.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Truck.h"

Truck::Truck(unsigned short id, unsigned char capacity,
		unsigned char usedCapcity, bool working, Node* location):
		id(id), capacity(capacity), working(working), location(location) {
}

unsigned char Truck::getCapacity() const {
	return capacity;
}

unsigned short Truck::getId() const {
	return id;
}

const Node*& Truck::getLocation() const {
	return location;
}

unsigned char Truck::getUsedCapcity() const {
	return usedCapcity;
}

bool Truck::isWorking() const {
	return working;
}
