/*
 * Supermarket.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Supermarket.h"

using namespace std;

Supermarket::Supermarket(long long int id, Coord coord, std::string name): Place(id, coord, name){
}


const std::vector<Truck>& Supermarket::getTrucks() const {
	return trucks;
}

const std::string Supermarket::getName() const{
	return name;
}

void Supermarket::addTrucks(Truck& truck) {
	this->trucks.push_back(truck);
}
