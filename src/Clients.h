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
#include <string>
#include "Place.h"

class Client: public Place {
private:
	std::vector<Purchase> shopping;
	std::string name;
public:
	Client(long long int id, Coord coord, std::string name);
	const std::string getName() const;
	void addGroceries(Purchase& purchase);


	//bool operator == (const Client & rhs);
	virtual std::vector<Purchase>& getGroceries();
	virtual int getShoppingSize();

};


#endif /* CLIENTS_H_ */
