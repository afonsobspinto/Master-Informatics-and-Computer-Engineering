/*
 * Place.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef PLACE_H_
#define PLACE_H_

#include "Coord.h"

class Place{

private:
	long long int id;
	Coord coord;

public:
	Place(long long int id, Coord coord);

	double distance(Place &place2);

	bool operator== (const Place &rhs);


};



#endif /* NODE_H_ */
