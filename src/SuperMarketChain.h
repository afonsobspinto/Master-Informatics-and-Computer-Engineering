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
	Graph<Place*>* graph;
	std::vector<Supermarket*> supermarkets;
	std::vector<Client*> clients;
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
	std::vector<Place*> getClientsOnSet2(set<Place*> sccSet);
	std::vector<Supermarket*> getSupermarketsOnSet(set<Place*> sccSet);
	std::vector<Place*> unreachableClients;
	std::vector<Place*> unneededSupermarkets;
	int getTotalShopping(vector<Client*> clients);
	int getTotalCapacity();


public:
	SuperMarketChain();
	Graph<Place*>* getGraph() const;
	std::unordered_map<int, Place*>* getPlaces();
	std::unordered_map<long long int, Street*>* getRoads();
	std::unordered_map<int, Place*>* getAllNodes();
	void displayGraph();
	void displaySCC();
	void displayRoutes();
	std::vector<Transition*>* getTransitions();
	std::vector<Supermarket*>* getSupermarkets();
	const std::vector<Client*>& getClients() const;
	void addClients(Client* client);
	void addSupermarkets(Supermarket* supermarket);
	void generateShopping();
	void generateTrucks();
	void calculateRoutes();
	void studyRoutes();
	const std::vector<Place*>& getUnneededSupermarkets();
	const std::vector<Place*>& getUnreachableClients();
};

#endif /* SUPERMARKETCHAIN_H_ */
