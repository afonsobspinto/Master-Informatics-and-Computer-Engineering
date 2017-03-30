/*
 * SuperMarketChain.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "SuperMarketChain.h"

SuperMarketChain::SuperMarketChain() {

	graph = new Graph<Place>;

	LoadingResources loading = LoadingResources(graph);

}

