/*
 * SuperMarketChain.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef SUPERMARKETCHAIN_H_
#define SUPERMARKETCHAIN_H_

#include <vector>
#include <unordered_map>
#include "Supermarket.h"
#include "Graph.h"
#include "Place.h"
#include "Street.h"
#include "LoadingResources.h"


class SuperMarketChain {
private:

	Graph<Place>* graph;
	std::vector<Supermarket> supermarkets;
	std::unordered_map<long long int, Place>* places;
	std::unordered_map<long long int, Street>* roads;

public:
	SuperMarketChain();
	Graph<Place>* getGraph() const;
	const std::unordered_map<long long int, Place>* getPlaces();
	const std::unordered_map<long long int, Street>* getRoads();
	const std::vector<Supermarket>& getSupermarkets() const;
};

#endif /* SUPERMARKETCHAIN_H_ */
