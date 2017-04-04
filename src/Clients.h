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

class Client {
private:
	Place* location;
	std::vector<Purchase> shopping;
public:
	Client(Place* location, std::vector<Purchase> shopping);
	const Place* getLocation() const;
	const std::vector<Truck>& getGroceries() const;

	bool Client::operator == (const Client & rhs);
};


#endif /* CLIENTS_H_ */
