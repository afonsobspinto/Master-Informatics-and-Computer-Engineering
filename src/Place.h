/*
 * Place.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef PLACE_H_
#define PLACE_H_

#include "Coord.h"
#include "Transition.h"
#include <vector>
#include <string>


class Place{

private:
	long long int id;
	Coord coord;
	std::vector<Transition*> transitions;

public:
	Place(long long int id, Coord coord);

	long long int getID() const;
	const Coord& getCoord() const;
	const std::vector<Transition*>& getTransitions() const;
	void addTransitions(Transition* transition);
	double getDistance(Place* place2);

	bool operator== (const Place &rhs);

};



#endif /* NODE_H_ */
