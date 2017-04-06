/*
 * SuperMarketChain.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "SuperMarketChain.h"
#include "graphviewer.h"



SuperMarketChain::SuperMarketChain() {

	graph = new Graph<Place>;
	places = new unordered_map<long long int, Place>;
	roads = new unordered_map<long long int, Street>;

	LoadingResources(this);
	displayGraph();

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

void SuperMarketChain::displayGraph() {
	GraphViewer *gv = new GraphViewer(600,600,true);
	cout << "CreateWindow" << endl;
	gv->createWindow(600, 600);
	gv->defineVertexColor(BLUE);
	gv->defineEdgeColor(BLACK);
	for(auto kv: *places){
		gv->addNode(kv.first);
	}
	gv->rearrange();
	sleep(5);

	gv->closeWindow();
	delete(gv);
}
