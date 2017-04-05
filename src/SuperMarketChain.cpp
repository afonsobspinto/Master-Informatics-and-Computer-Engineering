/*
 * SuperMarketChain.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "SuperMarketChain.h"



SuperMarketChain::SuperMarketChain() {

	graph = new Graph<Place>;

	LoadingResources(this);

}

std::unordered_map<long long int, Place>* SuperMarketChain::getPlaces() {
	return places;
}

std::unordered_map<long long int, Street>* SuperMarketChain::getRoads()  {
	return roads;
}

const std::vector<Supermarket>& SuperMarketChain::getSupermarkets() const {
	return supermarkets;
}

Graph<Place>* SuperMarketChain::getGraph() const {
	return graph;
}
