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

template<typename Base, typename T>
inline bool instanceof(const T*) {
    return std::is_base_of<Base, T>::value;
}

void SuperMarketChain::displayGraph() {

	GraphViewer *gv = new GraphViewer(800,600, false);
	gv->createWindow(800, 600);
	gv->defineVertexColor(RED);
	gv->defineEdgeColor(BLACK);

	for(auto kv: *places){
		if(instanceof<Supermarket>(kv.second)){
			gv->defineVertexColor(RED);
		}else
			gv->defineVertexColor(BLUE);

		gv->addNode(kv.first, kv.second->getCoord().getLatitude()*1000, kv.second->getCoord().getLongitude()*1000);
		cout << kv.first << ":		" << kv.second->getCoord().getLatitude() <<"; "<< kv.second->getCoord().getLongitude() << endl;
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

	gv->addEdge(800, 429200553, 25504170, EdgeType::UNDIRECTED);

	gv->rearrange();

	cin.clear();
	cin.ignore(10000, '\n');
	cout << endl;
	cout << "Pressione <Enter> para continuar...";
	cin.get();

	gv->closeWindow();
	delete (gv);
}
