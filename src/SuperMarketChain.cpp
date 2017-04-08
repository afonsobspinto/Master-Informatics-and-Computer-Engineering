/*
 * SuperMarketChain.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "SuperMarketChain.h"
#include "edgetype.h"
#include "graphviewer.h"
#include "LoadingResources.h"
#include <sstream>

using namespace std;

const int SuperMarketChain::heigth = 600;
const int SuperMarketChain::width = 800;

SuperMarketChain::SuperMarketChain() {

	graph = new Graph<Place>;
	places = new unordered_map<int, Place*>;
	roads = new unordered_map<long long int, Street*>;
	allNodes = new unordered_map<int, Place*>;

	cout << "Objects created!\n";
	LoadingResources(this);
	cout << "Resources loaded!\n";
	displayGraph();

}

unordered_map<int, Place*>* SuperMarketChain::getPlaces() {
	return places;
}

unordered_map<long long int, Street*>* SuperMarketChain::getRoads()  {
	return roads;
}

unordered_map<int, Place*>* SuperMarketChain::getAllNodes() {
	return allNodes;
}

Graph<Place>* SuperMarketChain::getGraph() const {
	return graph;
}

const std::vector<Client>& SuperMarketChain::getClients() const {
	return clients;
}

void SuperMarketChain::addClients(Client& client) {
	this->clients.push_back(client);
}

const std::vector<Supermarket>& SuperMarketChain::getSupermarkets() const {
	return supermarkets;
}

void SuperMarketChain::addSupermarkets(
		Supermarket& supermarket) {
	this->supermarkets.push_back(supermarket);
}

vector<Transition*>* SuperMarketChain::getTransitions() {
	return &transitions;
}


void SuperMarketChain::displayGraph() {
	GraphViewer *gv = new GraphViewer(width,heigth,false);

	gv->createWindow(width, heigth);
	gv->defineVertexColor(WHITE);
	gv->defineEdgeColor(BLACK);

	pair<int,int> geographicCoords;
	calcAveragePlaces();

	unsigned int i=0;
	for(auto kv: *allNodes){

		Coord tempCoord = kv.second->getCoord();
		geographicCoords = convertGeoGraphicCoord(tempCoord.getLatitude(), tempCoord.getLongitude());
		gv->addNode(kv.first, geographicCoords.first, geographicCoords.second);

		ostringstream oOStrStream;
		oOStrStream << kv.first;


		gv->setVertexLabel(kv.first, oOStrStream.str());

		if(kv.second->getLabel() == "client"){
			gv->setVertexColor(kv.first, BLUE);
			cout << "ID: " << kv.first << " pintado de azul" << endl;
		}
		else if(kv.second->getLabel()=="supermarket")
			gv->setVertexColor(kv.first, RED);

		gv->setVertexLabel(kv.first, kv.second->getName());


	}

	unsigned int idTransition = 0;
	for (auto i: transitions){
		if(i->is2Way())
			gv->addEdge(idTransition++, i->getSrcId(), i->getDestId(), EdgeType::UNDIRECTED);
		else
			gv->addEdge(idTransition++, i->getSrcId(), i->getDestId(), EdgeType::DIRECTED);

		//gv->setEdgeLabel(idTransition, roads->at(i->getRoadId())->getName());
	}

	cin.clear();
	cin.ignore(10000, '\n');
	cout << endl;
	cout << "Pressione <Enter> para continuar...";
	cin.get();

	gv->closeWindow();
	delete (gv);
}


pair<int, int> SuperMarketChain::convertGeoGraphicCoord(
		long double geoCoordX, long double geoCoordY) {

	const int dC = 1000000;

	return make_pair(geoCoordX*dC-averagePlaces.first + width/2, geoCoordY*dC-averagePlaces.second + heigth/2);

}


void SuperMarketChain::calcAveragePlaces() {

	long double sumX=0, sumY=0;
	unsigned int count=0;

	const int dC = 1000000;

	for(auto kv: *places){
		sumX+=kv.second->getCoord().getLatitude();
		sumY+=kv.second->getCoord().getLongitude();
		count++;
	}

	averagePlaces = make_pair(sumX*dC/count, sumY*dC/count);
}

void SuperMarketChain::generateShopping() {
	Date currentdate = Date();

	for(int i=0; i<clients.size(); i++){
		int number = rand() % 21;
		int product = rand() % 21;
		for(int j=0; j<number; j++){
			Purchase p = Purchase(product,number,currentdate);
			clients.at(i).addGroceries(p);
		}
	}

}

void SuperMarketChain::generateTrucks() {

	for(int i=0; i<supermarkets.size(); i++){
			int number = rand() % 10 + 1;
			Truck truck = Truck(&supermarkets.at(i));
			for(int j=0; j<number; j++){
				supermarkets.at(i).addTrucks(truck);
			}
		}
}
