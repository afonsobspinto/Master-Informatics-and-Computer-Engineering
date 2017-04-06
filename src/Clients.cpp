/*
 * Clients.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Clients.h"

Client::Client(long long int id, Coord coord, std::string name) :
		Place(id, coord, name) {
}

const std::vector<Purchase>& Client::getGroceries() const {
	return shopping;
}

const std::string Client::getName() const {
	return name;
}
