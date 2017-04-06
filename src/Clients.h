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
	std::vector<Purchase> shopping;
public:
	Client(long long int id, Coord coord);
	const std::vector<Purchase>& getGroceries() const;

	//bool operator == (const Client & rhs);
};


#endif /* CLIENTS_H_ */
