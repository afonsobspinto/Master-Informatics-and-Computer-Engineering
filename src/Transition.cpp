/*
 * Transition.cpp
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#include "Transition.h"

Transition::Transition(long long int roadID, long long int srcID,
		long long int destID): roadID(roadID), srcID(srcID), destID(destID) {
}

long long int Transition::getDestId() const {
	return destID;
}

long long int Transition::getRoadId() const {
	return roadID;
}

long long int Transition::getSrcId() const {
	return srcID;
}

