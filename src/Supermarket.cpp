/*
 * Supermarket.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Supermarket.h"

using namespace std;

Supermarket::Supermarket(long long int id, Coord coord): Place(id, coord){
}


const std::vector<Truck>& Supermarket::getTrucks() const {
	return trucks;
}

void Supermarket::addTrucks(Truck& truck) {
	this->trucks.push_back(truck);
}
