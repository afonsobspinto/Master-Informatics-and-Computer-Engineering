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

	graph = new Graph<Place*>;
	places = new unordered_map<int, Place*>;
	roads = new unordered_map<long long int, Street*>;
	allNodes = new unordered_map<int, Place*>;

	colors = { "BLUE", "RED", "PINK", "BLACK", "WHITE", "ORANGE", "YELLOW", "GREEN", "CYAN", "GRAY", "DARK_GRAY", "LIGHT_GRAY", "MAGENTA"};

	LoadingResources(this);

	scc = graph->scc();

	generateShopping();
	generateTrucks();
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

Graph<Place*>* SuperMarketChain::getGraph() const {
	return graph;
}

const std::vector<Client*>& SuperMarketChain::getClients() const {
	return clients;
}

void SuperMarketChain::addClients(Client* client) {
	this->clients.push_back(client);
}

std::vector<Supermarket*>* SuperMarketChain::getSupermarkets() {
	return &supermarkets;
}

void SuperMarketChain::addSupermarkets(
		Supermarket* supermarket) {
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
			clients.at(i)->addGroceries(p);
		}
	}


}

void SuperMarketChain::generateTrucks() {

	for(unsigned int i=0; i<supermarkets.size(); i++){
			int number = rand() % 10 + 1;
			for(int j=0; j<number; j++){
				supermarkets.at(i)->addTrucks();
			}
		}
}

int SuperMarketChain::getTotalShopping(vector<Client*> clients) {
	int res = 0;
	for (unsigned int i = 0; i<clients.size(); i++){

		res += clients.at(i)->getGroceries().size();
	}
	return res;

}

int SuperMarketChain::getTotalCapacity() {
	int res;
	for (unsigned int i = 0; i<supermarkets.size(); i++){
		res += supermarkets.at(i)->getCapacity();
	}
	return res;
}

void SuperMarketChain::calculateRoutes() {


	for (unsigned int i = 0; i < scc.size(); i++){
		set <Place*> temp = scc.at(i);

		vector<Client*> clients = getClientsOnSet(temp);
		vector<Place*> clients2 = getClientsOnSet2(temp);
		vector <Supermarket*> supermarkets = getSupermarketsOnSet(temp);

		if(supermarkets.size()==0){
			unreachableClients.insert(unreachableClients.end(),clients.begin(), clients.end());
		}
		else if(clients.size()==0)
			unneededSupermarkets.insert(unneededSupermarkets.end(), supermarkets.begin(), supermarkets.end());


		else{
			int capacityAvailable = getTotalCapacity();
			int capacityNeeded = getTotalShopping(clients);


			if(capacityAvailable < capacityNeeded){
				while(capacityAvailable < capacityNeeded){
					capacityNeeded -= clients.at(clients.size()-1)->getGroceries().size();
					unreachableClients.push_back(clients.at(clients.size()-1));
					clients.pop_back();
				}
			}



			for(unsigned int j = 0; j < supermarkets.size(); j++){
				Supermarket* supermarket = supermarkets.at(j);

				for (unsigned int k = 0; k < supermarket->getTrucks()->size(); k++){
					Truck* truck = supermarket->getTrucks()->at(k);
					vector<Place*> route = graph->calcRoute(temp, &clients2, supermarkets.at(j));
					truck->setRoute(route);
				}
			}
		}
	}
}


void SuperMarketChain::studyRoutes() {
	string tempN;
	for (int i=0; i<supermarkets.size(); i++){
		double numberofroutes = 0;
		double totaldistance = 0.0, totaltime = 0.0;
		cout << i+1 << ". " << supermarkets.at(i)->getName() << ":" << endl;
		for (int j=0; j<supermarkets.at(i)->getTrucks()->size(); j++){
			if(supermarkets.at(i)->getTrucks()->at(j)->getRoute().size() > 0){
				cout << "Routes of Truck " << supermarkets.at(i)->getTrucks()->at(j)->getId() << ":" << endl;
				for (int k=0; k<supermarkets.at(i)->getTrucks()->at(j)->getRoute().size(); k++){
					if(k != supermarkets.at(i)->getTrucks()->at(j)->getRoute().size()-1) {

						std::vector<Place*> routes = supermarkets.at(i)->getTrucks()->at(j)->getRoute();
						numberofroutes++;
						totaldistance += routes.at(k)->getDistance(routes.at(k+1));
						totaltime += routes.at(k)->getTime(routes.at(k+1));
						if(routes.at(k)->getName()!=routes.at(k+1)->getName())
						{
							if(routes.at(k+1)->getName()=="\t\t\t"){
								tempN=routes.at(k)->getName();
								continue;
							}else if(routes.at(k)->getName()=="\t\t\t"){
								cout << k+1 << ". From " << tempN << " to " << routes.at(k+1)->getName();
							}else{
								cout << k+1 << ". From " << routes.at(k)->getName() << " to " << tempN;
							}
							cout <<	" with distance " << routes.at(k)->getDistance(routes.at(k+1)) <<
									" and time " << routes.at(k)->getTime(routes.at(k+1)) << " hours" << endl;
						}
					}
				}
			}
		}
		if (totaldistance == 0.0){
			cout << endl;
			cout << "No Routes in this SuperMarket" << endl;
			cout << endl;
		}
		else{
			cout << endl;
			cout << "Average Distance: " << totaldistance/numberofroutes << endl;
			cout << "Average Time:" << totaltime/numberofroutes << " hours" << endl;
			cout << endl;
		}
	}
}


void SuperMarketChain::displayRoutes() {
	GraphViewer *gv = new GraphViewer(width,heigth,false);

	gv->createWindow(width, heigth);
	gv->defineVertexColor(WHITE);
	gv->defineEdgeColor(BLACK);

	pair<int,int> geographicCoords;
	calcAveragePlaces();

	set<Place*> tempNodes;
	set<Transition*> tempTransitions;

	unsigned int idTransition = 0;

	for (unsigned int i = 0; i < supermarkets.size(); i++){
		Supermarket* super = supermarkets.at(i);
		for (unsigned int j = 0; j < super->getTrucks()->size(); j++){
			Truck* truck = super->getTrucks()->at(j);
			for (unsigned int k = 0; k < truck->getRoute().size(); k++){
				Place* node = truck->getRoute().at(k);
				geographicCoords = convertGeoGraphicCoord(node->getCoord().getLatitude(), node->getCoord().getLongitude());
				gv->addNode( node->getID(), geographicCoords.first, geographicCoords.second);
				if(node->getLabel() == "client")
					gv->setVertexColor(node->getID(), ORANGE);
				else if(node->getLabel() == "supermarket")
					gv->setVertexColor(node->getID(), YELLOW);
				gv->setVertexLabel(node->getID(),node->getName());
				tempNodes.insert(node);
				if(k != truck->getRoute().size()-1){
					gv->addEdge(idTransition++, node->getID(), truck->getRoute().at(k+1)->getID(), EdgeType::UNDIRECTED);
					gv->setEdgeColor(idTransition, GREEN);
					Transition* tempt = new Transition(idTransition, node->getID(), truck->getRoute().at(k+1)->getID(), node->getDistance(truck->getRoute().at(k+1)), false );
					tempTransitions.insert(tempt);
				}
			}
		}
	}

	for(auto kv: *allNodes){

		Coord tempCoord = kv.second->getCoord();
		geographicCoords = convertGeoGraphicCoord(tempCoord.getLatitude(), tempCoord.getLongitude());
		gv->addNode(kv.first, geographicCoords.first, geographicCoords.second);


		if(tempNodes.find(kv.second) == tempNodes.end()){

			if(kv.second->getLabel() == "client")
				gv->setVertexColor(kv.first, BLUE);
			else if(kv.second->getLabel()=="supermarket")
				gv->setVertexColor(kv.first, RED);

			gv->setVertexLabel(kv.first, kv.second->getName());

		}
	}

	for (auto i: transitions){

		if(!checkSet(tempTransitions, i)){

		if(i->is2Way())
			gv->addEdge(idTransition++, i->getSrcId(), i->getDestId(), EdgeType::UNDIRECTED);
		else
			gv->addEdge(idTransition++, i->getSrcId(), i->getDestId(), EdgeType::DIRECTED);

		//gv->setEdgeLabel(idTransition, roads->at(i->getRoadId())->getName());
		}
	}

	cin.clear();
	cin.ignore(10000, '\n');
	cin.get();

	gv->closeWindow();
	delete (gv);
}

vector<Client*> SuperMarketChain::getClientsOnSet(set<Place*> sccSet) {

	vector <Client*> result;
	set<Place*>::iterator ite;

	for(ite = sccSet.begin(); ite != sccSet.end(); ite++){

		if((*ite)->getLabel()=="client"){
			for(unsigned int i=0;i<clients.size();i++){
				if(clients[i]->getID()==(*ite)->getID()){
					result.push_back(clients[i]);
					break;
				}
			}
		}
	}

	return result;
}

vector<Place*> SuperMarketChain::getClientsOnSet2(set<Place*> sccSet) {

	vector <Place*> result;
	set<Place*>::iterator ite;

	for(ite = sccSet.begin(); ite != sccSet.end(); ite++){

		if((*ite)->getLabel()=="client"){
			result.push_back(*ite);
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
			for(unsigned int i=0;i<supermarkets.size();i++){
				if(supermarkets[i]->getID()==(*ite)->getID()){
					result.push_back(supermarkets[i]);
					break;
				}
			}

		}
	}

	return result;

}

const std::vector<Place*>& SuperMarketChain::getUnneededSupermarkets() {
	return unneededSupermarkets;
}

const std::vector<Place*>& SuperMarketChain::getUnreachableClients() {
	return unreachableClients;
}

bool SuperMarketChain::checkSet(set<Transition*> set, Transition* t) {

	 for (std::set<Transition*>::iterator it=set.begin(); it!=set.end(); ++it){
		Transition* temp = *it;
	    if(t->getDestId() == temp->getDestId() && t->getSrcId() == temp->getSrcId())
	    	return true;
	}
	return false;
}
