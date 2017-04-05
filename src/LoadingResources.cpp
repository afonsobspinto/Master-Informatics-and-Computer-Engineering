/*
 * LoadingResources.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "LoadingResources.h"
#include <fstream>
#include <iostream>
#include "Place.h"
#include "Street.h"
#include "Graph.h"

using namespace std;


const string LoadingResources::GraphsInfo = "graphsInfo.txt";

LoadingResources::LoadingResources(SuperMarketChain* superMarketChain): superMarketChain(superMarketChain) {
	ifstream graphsInfo(GraphsInfo);

	if(!graphsInfo.is_open()){
		cerr << "Unable to open file " << GraphsInfo << endl;
		exit(1);
	}

	unsigned int nGraphs;
	string temp;

	graphsInfo >> nGraphs;

	for(unsigned int i = 0; i < nGraphs; i++){
		graphsInfo >> temp;
		graphsFiles.push_back(temp);
	}

	loadMap();

}



void LoadingResources::loadMap() {
	loadNodes();
	loadRoads();
	loadGeom();
}

void LoadingResources::loadNodes() {

	ifstream nodesInfo(graphsFiles[1]);

	if(!nodesInfo.is_open()){
			cerr << "Unable to open file " << GraphsInfo << endl;
			exit(1);
		}

	long long id;
	double latitude;
	double longitude;
	char sep;

	/*
	 * Ignoring degrees Values
	 */

	while(nodesInfo >> id >> sep >>
			latitude >> sep >> longitude >> sep >>
			latitude >> sep >> longitude){

		Place place(id, Coord(latitude, longitude));

		//superMarketChain->getPlaces()->insert(p);
		superMarketChain->getGraph()->addVertex(place);

		nnodes++;
	}

	cout << "Read "<< nnodes << " nodes.\n";

}

void LoadingResources::loadRoads() {

	ifstream roadsInfo(graphsFiles[2]);

	if(!roadsInfo.is_open()){
			cerr << "Unable to open file " << GraphsInfo << endl;
			exit(1);
		}

	long long id;
	string name;
	bool is2way;
	string id_;
	char sep;
	string line;
	string is2wayS;


	while(getline(roadsInfo, id_, ';'), getline(roadsInfo, name, ';'), getline(roadsInfo, is2wayS)){

		id=stoll(id_);
		is2way=string2bool(is2wayS);

		Street street(id,name,is2way);

		superMarketChain->getRoads()->insert(make_pair(id, street));

		nroads++;
	}
	cout << "Read " << nroads << " roads.\n";
}

void LoadingResources::loadGeom() {

	ifstream geomInfo(graphsFiles[0]);

	if(!geomInfo.is_open()){
			cerr << "Unable to open file " << GraphsInfo << endl;
			exit(1);
		}

	long long int road_id, node1_id, node2_id;
	char sep;

	while(geomInfo >> road_id >> sep >>
			node1_id >> sep >> node2_id >> sep){
		Transition transition(road_id, node1_id, node2_id);

		ngeoms++;
	}

	cout << "Read " << ngeoms << " geoms.\n";
}



bool LoadingResources::string2bool(const std::string &v){
	if(!v.empty() && v == "True"){
		return true;
	}
	return false;
}

