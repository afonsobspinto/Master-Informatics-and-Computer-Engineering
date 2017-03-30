/*
 * SuperMarketChain.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef SUPERMARKETCHAIN_H_
#define SUPERMARKETCHAIN_H_

#include <vector>
#include "Supermarket.h"
#include "Graph.h"
#include "Place.h"
#include "LoadingResources.h"


class SuperMarketChain {
private:
	std::vector<Supermarket> supermarkets;
	Graph<Place>* graph;

public:
	SuperMarketChain();
};

#endif /* SUPERMARKETCHAIN_H_ */
