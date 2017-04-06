/*
 * SuperMarketChain.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "SuperMarketChain.h"
#include "edgetype.h"
#include "graphviewer.h"



SuperMarketChain::SuperMarketChain() {

	graph = new Graph<Place>;
	places = new unordered_map<long long int, Place*>;
	roads = new unordered_map<long long int, Street>;

	LoadingResources(this);
	displayGraph();

}

std::unordered_map<long long int, Place*>* SuperMarketChain::getPlaces() {
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

std::vector<Transition*>* SuperMarketChain::getTransitions() {
	return &transitions;
}


void SuperMarketChain::displayGraph() {

	GraphViewer *gv = new GraphViewer(800,600, false);
	gv->createWindow(800, 600);
	gv->defineVertexColor(RED);
	gv->defineEdgeColor(BLACK);

	int dC=100000;

	int averageX, averageY;

	{
		long double sumX=0, sumY=0;
		unsigned int count=0;

		for(auto kv: *places){

				sumX+=kv.second->getCoord().getLatitude();
				sumY+=kv.second->getCoord().getLongitude();
				count++;

		}

		averageX=sumX*dC/count;
		averageY=sumY*dC/count;

		cout << "x: " << averageX << endl << "y: " << averageY << endl;
	}

	for(auto kv: *places){
		gv->defineVertexColor(BLUE);


		gv->addNode(kv.first, kv.second->getCoord().getLatitude()*dC-averageX, kv.second->getCoord().getLongitude()*dC-averageY);
		cout << kv.first << ":		" << kv.second->getCoord().getLatitude()*dC-averageX <<"; "<< kv.second->getCoord().getLongitude()*dC-averageY << endl;
		//gv->
	}

	gv->defineVertexColor(BLUE);

	/*for(auto kv: *supermarkets){
		gv->addNode(kv.first);
	}*/

	unsigned int idTransition = 0;
	for (auto i: transitions){
		if(i->is2Way())
			gv->addEdge(idTransition++, i->getSrcId(), i->getDestId(), EdgeType::UNDIRECTED);
		else
			gv->addEdge(idTransition++, i->getSrcId(), i->getDestId(), EdgeType::DIRECTED);
	}

	//gv->addEdge(800, 429200553, 25504170, EdgeType::UNDIRECTED);

	gv->rearrange();

	cin.clear();
	cin.ignore(10000, '\n');
	cout << endl;
	cout << "Pressione <Enter> para continuar...";
	cin.get();

	gv->closeWindow();
	delete (gv);
}
