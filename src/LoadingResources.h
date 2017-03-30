/*
 * LoadingResources.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef LOADINGRESOURCES_H_
#define LOADINGRESOURCES_H_

#include <string>
#include <vector>

class LoadingResources {

	static const std::string GraphsInfo;
	std::vector<std::string> graphsFiles;

	unsigned int nnodes=0;
	unsigned int nroads=0;

public:
	LoadingResources();

	bool string2bool(const std::string &a);

	void loadMap();

	void loadNodes();

	void loadRoads();
};

#endif /* LOADINGRESOURCES_H_ */
