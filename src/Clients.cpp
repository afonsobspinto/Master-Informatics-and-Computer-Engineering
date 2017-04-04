/*
 * Clients.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Clients.h"

Client::Client(Place* location, std::vector<Purchase> shopping) :
		location(location), shopping(shopping) {
}

const Place* Client::getLocation() const {
	return location;
}

const std::vector<Purchase>& Client::getGroceries() const {
	return shopping;
}

bool Client::Client::operator ==(const Client& rhs) {
	return (this->location == location);
}
