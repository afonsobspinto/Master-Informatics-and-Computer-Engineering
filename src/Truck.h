/*
 * Truck.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef TRUCK_H_
#define TRUCK_H_


class Truck{
private:
	unsigned short id;
	unsigned char capacity;
	unsigned char usedCapcity;
	bool working;
	Node* location;
public:
	Truck(unsigned short id, unsigned char capacity,  unsigned char usedCapcity, bool working, Node* location);
	unsigned char getCapacity() const;
	unsigned short getId() const;
	const Node*& getLocation() const;
	unsigned char getUsedCapcity() const;
	bool isWorking() const;
};


#endif /* TRUCK_H_ */
