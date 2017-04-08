/*
 * SuperMarketChain.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef SUPERMARKETCHAIN_H_
#define SUPERMARKETCHAIN_H_

#include <unordered_map>
#include <vector>

#include "Graph.h"
#include "Street.h"
#include "Supermarket.h"
#include "Transition.h"
#include "Clients.h"

class SuperMarketChain {
private:
	Graph<Place>* graph;
	std::vector<Supermarket> supermarkets;
	std::vector<Client> clients;
	std::unordered_map<long long int, Place*>* places;
	pair<int, int> averagePlaces;
	std::unordered_map<long long int, Place*>* allNodes;
	std::unordered_map<long long int, Street*>* roads;
	std::vector<Transition*>transitions;
	pair<int, int> convertGeoGraphicCoord(long double geoCoordX, long double geoCoordY);
	void calcAveragePlaces();
	static const int heigth;
	static const int width;


public:
	SuperMarketChain();
	Graph<Place>* getGraph() const;
	std::unordered_map<long long int, Place*>* getPlaces();
	std::unordered_map<long long int, Street*>* getRoads();
	std::unordered_map<long long int, Place*>* getAllNodes();
	void displayGraph();
	std::vector<Transition*>* getTransitions();
	const std::vector<Client>& getClients() const;
	void addClients(Client& client);
	const std::vector<Supermarket>& getSupermarkets() const;
	void addSupermarkets(Supermarket& supermarket);
};

#endif /* SUPERMARKETCHAIN_H_ */
