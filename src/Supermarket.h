/*
 * Supermarket.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef SUPERMARKET_H_
#define SUPERMARKET_H_

#include "Graph.h"
#include "Truck.h"
#include <vector>
#include <string>
#include "Place.h"

class Supermarket: public Place{

private:
	std::vector<Truck> trucks;
	std::string name;
	int capacity;
	void calculateCapacity();

public:
	Supermarket(long long int id, Coord coord, std::string name);
	const std::vector<Truck>& getTrucks() const;
	const std::string getName() const;
	void addTrucks(Truck& truck);
	const int getCapacity() const;
};



#endif /* SUPERMARKET_H_ */
