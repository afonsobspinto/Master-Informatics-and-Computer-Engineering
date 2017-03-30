/*
 * LoadingResources.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "LoadingResources.h"
#include "Node.h"
#include <fstream>
#include <iostream>

using namespace std;


const string LoadingResources::GraphsInfo = "graphsInfo.txt";

LoadingResources::LoadingResources() {
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

		Node (id, Coord(latitude, longitude));
	}


}
