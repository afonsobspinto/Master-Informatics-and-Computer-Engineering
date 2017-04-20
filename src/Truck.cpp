/*
 * Truck.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Truck.h"
#include "iostream"

Truck::Truck(Place* location):
		id(ids), capacity(50), usedCapacity(0), averageSpeed(60), location(location) {
	ids++;
}

unsigned char Truck::getCapacity() const {
	return capacity;
}

unsigned short Truck::getId() const {
	return id;
}

const Place* Truck::getLocation() const {
	return location;
}

unsigned char Truck::getUsedCapacity() const {
	return usedCapacity;
}

unsigned char Truck::getAverageSpeed() const {
	return averageSpeed;
}


void Truck::setRoute(const std::vector<Place*>& route) {
	this->route = route;
}


const std::vector<Place*>& Truck::getRoute() const {
	return route;
}

Truck::Truck():
		id(ids), capacity(50), usedCapacity(0), averageSpeed(60) {
	ids++;
}
