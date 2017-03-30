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

using namespace std;


const string LoadingResources::GraphsInfo = "graphsInfo.txt";

LoadingResources::LoadingResources(Graph<Place>*graph): graph(graph) {
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

bool LoadingResources::string2bool(const std::string &v){
	if(!v.empty() && v == "True"){
		return true;
	}
	return false;
}

void LoadingResources::loadMap() {
	loadNodes();
	loadRoads();
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
		nnodes++;

		Place* no = new Place (id, Coord(latitude, longitude));

	}

	cout << "Read "<< nnodes << " nodes.\n";

}

void LoadingResources::loadRoads() {

	ifstream nodesInfo(graphsFiles[2]);

	if(!nodesInfo.is_open()){
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
	/*
	 * Ignoring degrees Values
	 */

	while(getline(nodesInfo, id_, ';'), getline(nodesInfo, name, ';'), getline(nodesInfo, is2wayS)){
		id=stoll(id_);

		is2way=string2bool(is2wayS);

		//cout << id << " " << is2way << endl;
		nroads++;
	}
	cout << "Read " << nroads << " roads.\n";
}
