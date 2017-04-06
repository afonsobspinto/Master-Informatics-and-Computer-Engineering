/*
 * Travel.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */


#include "Travel.h"

Travel::Travel(Place* begin, Place* end, unsigned char averageSpeed): begin(begin), end(end) {
	this->distance = begin->getDistance(end);
	this->time = distance/averageSpeed;
}

const Place* Travel::getBegin() const {
	return begin;
}

double Travel::getDistance() const {
	return distance;
}

const Place* Travel::getEnd() const {
	return end;
}

double Travel::getTime() const {
	return time;
}
