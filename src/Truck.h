/*
 * Truck.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef TRUCK_H_
#define TRUCK_H_

#include "Place.h"

class Truck{
private:
	unsigned short id;
	unsigned char capacity;
	unsigned char usedCapcity;
	unsigned char averageSpeed;
	bool working;
	Place* location;

public:
	Truck(unsigned short id, unsigned char capacity,  unsigned char usedCapcity, unsigned char averageSpeed, bool working, Place* location);
	unsigned char getCapacity() const;
	unsigned short getId() const;
	const Place* getLocation() const;
	unsigned char getUsedCapcity() const;
	bool isWorking() const;
	unsigned char getAverageSpeed() const;
};


#endif /* TRUCK_H_ */
