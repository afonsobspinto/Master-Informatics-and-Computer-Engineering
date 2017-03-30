/*
 * Supermarket.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Supermarket.h"

using namespace std;

Supermarket::Supermarket(vector<Truck> trucks, Place* location): trucks(trucks), location(location) {
}

const Place* Supermarket::getLocation() const {
	return location;
}

const std::vector<Truck>& Supermarket::getTrucks() const {
	return trucks;
}
