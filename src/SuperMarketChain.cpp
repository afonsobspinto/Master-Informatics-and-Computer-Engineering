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

	LoadingResources(this);

	scc = graph->scc();

	calculateRoutes();
	generateShopping();


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

	for(unsigned int i=0; i<clients.size(); i++){
		int number = rand() % 21;
		int product = rand() % 21;
		for(int j=0; j<number; j++){
			Purchase p = Purchase(product,number,currentdate);
			clients.at(i).addGroceries(p);
		}
	}

}

void SuperMarketChain::generateTrucks() {

	for(unsigned int i=0; i<supermarkets.size(); i++){
			int number = rand() % 10 + 1;
			Truck truck = Truck(&supermarkets.at(i));
			for(int j=0; j<number; j++){
				supermarkets.at(i).addTrucks(truck);
			}
		}
}

int SuperMarketChain::getTotalShopping(vector<Place*> clients) {
	int res;
	for (unsigned int i = 0; i<clients.size(); i++){
		res += clients.at(i)->getGroceries().size();
	}
	return res;
}

int SuperMarketChain::getTotalCapacity() {
	int res;
	for (unsigned int i = 0; i<supermarkets.size(); i++){
		res += supermarkets.at(i).getCapacity();
	}
	return res;
}

void SuperMarketChain::calculateRoutes() {

	for (unsigned int i = 0; i < scc.size(); i++){
		set <Place*> temp = scc.at(i);
		vector<Place*> clients = getClientsOnSet(temp);
		vector <Supermarket*> supermarkets = getSupermarketsOnSet(temp);

		if(supermarkets.size()==0)
			unreachableClients.insert(unreachableClients.end(),clients.begin(), clients.end());
		//Acrescentar aos Advices esta info
		else if(clients.size()==0)
			unneededSupermarkets.insert(unneededSupermarkets.end(), supermarkets.begin(), supermarkets.end());
		//Acrescentar aos Advices esta info
		else{
			int capacityAvailable = getTotalCapacity();
			int capacityNeeded = getTotalShopping(clients);
			if(capacityAvailable < capacityNeeded){
				//Add Some Clients to unreachableClients && add to vector<string> Advices(create this) this vector
				while(capacityAvailable < capacityNeeded){
					capacityNeeded -= clients.at(clients.size()-1)->getGroceries().size();
					unreachableClients.push_back(clients.at(clients.size()-1));
					clients.pop_back();
				}
			}
			else{

				graph->calcRoute(temp, &clients).size();
				//Para cada supermercado
				// Para Cada camião:
					 //camião.route = graph.calcRoute(temp, &clients);
			}
		}
	}

	cout << unreachableClients.size() << endl;
	cout << unneededSupermarkets.size() << endl;

}

//Study Routes
//Ler todos os Supermercados
//Para cada Supermercado ler todos os trucks
//Para cada truck ler a Rota e mostrar de forma friendly


//DisplayRoutes
//GraphViewerCenas
//Se o Nó estiver na Rota de algum truck desenhar Laranja e as transições desse nó para outro qql a verde


vector<Place*> SuperMarketChain::getClientsOnSet(set<Place*> sccSet) {

	vector <Place*> result;
	set<Place*>::iterator ite;

	for(ite = sccSet.begin(); ite != sccSet.end(); ite++){

		if((*ite)->getLabel()=="client"){
			Place* client = (*ite);
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

