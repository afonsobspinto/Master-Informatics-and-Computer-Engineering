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

	colors = { "BLUE", "RED", "PINK", "BLACK", "WHITE", "ORANGE", "YELLOW", "GREEN", "CYAN", "GRAY", "DARK_GRAY", "LIGHT_GRAY", "MAGENTA"};


	cout << "Objects created!\n";
	LoadingResources(this);
	cout << "Resources loaded!\n";

	scc = graph->scc();
	calculateRoutes();


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

//		ostringstream oOStrStream;
//		oOStrStream << kv.first;
//
//
//		gv->setVertexLabel(kv.first, oOStrStream.str());

		if(kv.second->getLabel() == "client")
			gv->setVertexColor(kv.first, BLUE);
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


void SuperMarketChain::displaySCC() {
	GraphViewer *gv = new GraphViewer(width,heigth,false);

	gv->createWindow(width, heigth);
	gv->defineVertexColor(WHITE);
	gv->defineEdgeColor(BLACK);

	pair<int,int> geographicCoords;
	calcAveragePlaces();

	unsigned int i=0;
	for(unsigned int j = 0; j < scc.size(); j++){

		set <Place*> temp = scc.at(i);

		set<Place*>::iterator it;

		for (it = temp.begin(); it != temp.end(); it++){
			Coord tempCoord = (*it)->getCoord();
			geographicCoords = convertGeoGraphicCoord(tempCoord.getLatitude(), tempCoord.getLongitude());
			gv->addNode((*it)->getID(), geographicCoords.first, geographicCoords.second);
			gv->setVertexColor((*it)->getID(), colors[i%colors.size()]);
			gv->setVertexLabel((*it)->getID(), (*it)->getName());
		}
		i++;
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

	const int dC = 10000000;

	return make_pair(geoCoordX*dC-averagePlaces.first + width/2, averagePlaces.second-geoCoordY*dC + heigth/2);

}


void SuperMarketChain::calcAveragePlaces() {

	long double sumX=0, sumY=0;
	unsigned int count=0;

	const int dC = 10000000;

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



void SuperMarketChain::calculateRoutes() {

	for (unsigned int i = 0; i < scc.size(); i++){
		set <Place*> temp = scc.at(i);
		vector<Client*> clients = getClientsOnSet(temp);
		vector <Supermarket*> supermarkets = getSupermarketsOnSet(temp);

		if(supermarkets.size()==0)
			unreachableClients.insert(unreachableClients.end(),clients.begin(), clients.end());
		else if(clients.size()==0)
			unneededSupermarkets.insert(unneededSupermarkets.end(), supermarkets.begin(), supermarkets.end());
		else{
			int capacityAvailable;
			int capacityNeeded;
			if(capacityAvailable < capacityNeeded){
				//Add Some Clients to unreachableClients && add to vector<string> Advices(create this) this vector
			}
			else{

				graph.calcRoute();
			}

		}


	}

}

vector<Client*> SuperMarketChain::getClientsOnSet(set<Place*> sccSet) {

	vector <Client*> result;
	set<Place*>::iterator ite;

	for(ite = sccSet.begin(); ite != sccSet.end(); ite++){

		if((*ite)->getLabel()=="client"){
			Client* client = static_cast<Client*> (*ite);
			result.push_back(client);
		}
	}

	return result;
}

std::vector<Supermarket*> SuperMarketChain::getSupermarketsOnSet(
		set<Place*> sccSet) {
	vector <Supermarket*> result;
	set<Place*>::iterator ite;


	for(ite = sccSet.begin(); ite != sccSet.end(); ite++){

		if((*ite)->getLabel()=="supermarket"){
			Supermarket* supermarket = static_cast<Supermarket*> (*ite);
			result.push_back(supermarket);
		}
	}

	return result;

}

