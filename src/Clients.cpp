/*
 * Clients.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Clients.h"
#include "iostream"

using namespace std;


Client::Client(long long int id, Coord coord, std::string name) :
		Place(id, coord) {
	this->name = name;
	setLabel("client");
}


const string Client::getName() const {
	return name;
}

std::vector<Purchase>& Client::getGroceries(){
	return shopping;
}

void Client::addGroceries(Purchase& purchase){
	this->shopping.push_back(purchase);
}

int Client::getShoppingSize() {
	return shopping.size();
}
