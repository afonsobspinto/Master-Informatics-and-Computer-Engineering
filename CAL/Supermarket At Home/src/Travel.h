/*
 * Travel.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */


#ifndef TRAVEL_H_
#define TRAVEL_H_

#include "Place.h"

class Travel{
private:
	Place* begin;
	Place* end;

	double distance;
	double time;
public:
	Travel(Place* begin, Place* end, unsigned char averageSpeed);
	const Place* getBegin() const;
	double getDistance() const;
	const Place* getEnd() const;
	double getTime() const;
};




#endif /* TRAVEL_H_ */
