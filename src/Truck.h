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

class Place;

class Truck{

private:
	unsigned short id;
	unsigned char capacity;
	unsigned char usedCapacity;
	unsigned char averageSpeed;
	Place* location;
	std::vector<Place*> route;

public:
	Truck();
	Truck(Place* location);
	unsigned char getCapacity() const;
	unsigned short getId() const;
	const Place* getLocation() const;
	unsigned char getUsedCapacity() const;
	unsigned char getAverageSpeed() const;
	void setRoute(const std::vector<Place*>& route);
	const std::vector<Place*>& getRoute() const;

};


#endif /* TRUCK_H_ */
