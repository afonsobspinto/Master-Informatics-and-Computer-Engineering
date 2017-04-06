/*
 * Clients.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef CLIENTS_H_
#define CLIENTS_H_


#include "Purchase.h"
#include <vector>
#include "Place.h"

class Client: public Place {
private:
	Place* location;
	std::vector<Purchase> shopping;
public:
	Client(Place* location, std::vector<Purchase> shopping);
	const Place* getLocation() const;
	const std::vector<Purchase>& getGroceries() const;

	bool operator == (const Client & rhs);
};


#endif /* CLIENTS_H_ */
