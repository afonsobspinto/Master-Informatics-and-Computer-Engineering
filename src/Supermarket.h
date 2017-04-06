/*
 * Supermarket.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef SUPERMARKET_H_
#define SUPERMARKET_H_

#include "Truck.h"
#include <vector>
#include "Place.h"

class Supermarket: public Place{

private:
	std::vector<Truck> trucks;
	Place* location;

public:
	Supermarket(std::vector<Truck> trucks, Place* location);
	const Place* getLocation() const;
	const std::vector<Truck>& getTrucks() const;
};



#endif /* SUPERMARKET_H_ */
