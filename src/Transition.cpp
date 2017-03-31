/*
 * Transition.cpp
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#include "Transition.h"

Transition::Transition(long long int id, long long int srcID,
		long long int destID): id(id), srcID(srcID), destID(destID) {
}

long long int Transition::getDestId() const {
	return destID;
}

long long int Transition::getId() const {
	return id;
}

long long int Transition::getSrcId() const {
	return srcID;
}

