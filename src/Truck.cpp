/*
 * Truck.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Truck.h"

Truck::Truck(unsigned short id, unsigned char capacity,
		unsigned char usedCapcity, unsigned char averageSpeed, bool working, Place* location):
		id(id), capacity(capacity), usedCapcity(usedCapcity), averageSpeed(averageSpeed), working(working), location(location) {
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

unsigned char Truck::getUsedCapcity() const {
	return usedCapcity;
}

unsigned char Truck::getAverageSpeed() const {
	return averageSpeed;
}

bool Truck::isWorking() const {
	return working;
}
