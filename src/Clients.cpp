/*
 * Clients.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Clients.h"

Client::Client(long long int id, Coord coord) :
		Place(id, coord) {
}

const std::vector<Purchase>& Client::getGroceries() const {
	return shopping;
}
