/*
 * Clients.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef CLIENTS_H_
#define CLIENTS_H_


#include "Node.h"
#include "Purchase.h"
#include <vector>

class Client {
private:
	Node* location;
	std::vector<Purchase> shopping;
public:
	Client(Node* location, std::vector<Purchase> shopping);
};


#endif /* CLIENTS_H_ */
