/*
 * Transition.cpp
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#include "Transition.h"

Transition::Transition(long long int roadID, long long int srcID,
		long long int destID, double weigth):
		roadID(roadID), srcID(srcID), destID(destID), weigth(weigth) {
}

long long int Transition::getDestId() const {
	return destID;
}

long long int Transition::getRoadId() const {
	return roadID;
}

double Transition::getWeigth() const {
	return weigth;
}

long long int Transition::getSrcId() const {
	return srcID;
}

