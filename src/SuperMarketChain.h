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
	std::unordered_map<int, Place*>* places;
	pair<int, int> averagePlaces;
	std::unordered_map<int, Place*>* allNodes;
	std::unordered_map<long long int, Street*>* roads;
	std::vector<Transition*>transitions;
	std::vector<set<Place*>> scc;
	pair<int, int> convertGeoGraphicCoord(long double geoCoordX, long double geoCoordY);
	void calcAveragePlaces();
	static const int heigth;
	static const int width;
	std::vector <string> colors;
	std::vector<Client*> getClientsOnSet(set<Place*> sccSet);
	std::vector<Supermarket*> getSupermarketsOnSet(set<Place*> sccSet);
	std::vector<Client*> unreachableClients;
	std::vector<Supermarket*> unneededSupermarkets;


public:
	SuperMarketChain();
	Graph<Place>* getGraph() const;
	std::unordered_map<int, Place*>* getPlaces();
	std::unordered_map<long long int, Street*>* getRoads();
	std::unordered_map<int, Place*>* getAllNodes();
	void displayGraph();
	void displaySCC();
	std::vector<Transition*>* getTransitions();
	const std::vector<Client>& getClients() const;
	void addClients(Client& client);
	const std::vector<Supermarket>& getSupermarkets() const;
	void addSupermarkets(Supermarket& supermarket);
	int getTotalShopping();
	int getTotalCapacity();
	void generateShopping();
	void generateTrucks();
	void calculateRoutes();

};

#endif /* SUPERMARKETCHAIN_H_ */
