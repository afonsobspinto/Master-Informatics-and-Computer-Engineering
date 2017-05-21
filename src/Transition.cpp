/*
 * Transition.cpp
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#include "Transition.h"

Transition::Transition(long long int roadID, long long int srcID,
		long long int destID, double weigth, bool twoWay, std::string roadName):
		roadID(roadID), srcID(srcID), destID(destID), weigth(weigth), twoWay(twoWay), roadName(roadName) {

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

bool Transition::is2Way() const {
	return twoWay;
}

std::string Transition::getRoadName() const {
	return roadName;
}
