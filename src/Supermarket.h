/*
 * Supermarket.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef SUPERMARKET_H_
#define SUPERMARKET_H_

#include "Node.h"
#include "Truck.h"
#include <vector>

class Supermarket{
	std::vector<Truck> trucks;
	Node* location;

};



#endif /* SUPERMARKET_H_ */
