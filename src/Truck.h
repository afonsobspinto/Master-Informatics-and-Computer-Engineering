/*
 * Truck.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef TRUCK_H_
#define TRUCK_H_

#include "Place.h"
#include <list>

static unsigned short ids = 1;

class Truck{

private:
	unsigned short id;
	unsigned char capacity;
	unsigned char usedCapacity;
	unsigned char averageSpeed;
	Place* location;
	std::list<Place*> route;

public:
	Truck(Place* location);
	unsigned char getCapacity() const;
	unsigned short getId() const;
	const Place* getLocation() const;
	unsigned char getUsedCapacity() const;
	unsigned char getAverageSpeed() const;
	const std::list<Place*>& getRoute() const;
	void addRoute(Place* place);
};


#endif /* TRUCK_H_ */
