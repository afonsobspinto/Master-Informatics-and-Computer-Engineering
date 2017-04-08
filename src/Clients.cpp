/*
 * Clients.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Clients.h"

using namespace std;


Client::Client(long long int id, Coord coord, std::string name) :
		Place(id, coord) {
	this->name = name;
	setLabel("client");
}

const vector<Purchase>& Client::getGroceries() const {
	return shopping;
}

const string Client::getName() const {
	return name;
}

void Client::addGroceries(Purchase& purchase){
	this->shopping.push_back(purchase);
}
