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


class Place{

private:
	long long int id;
	Coord coord;
	std::vector<Transition*> transitions;

public:
	Place(long long int id, Coord coord);

	double distance(Place &place2);

	bool operator== (const Place &rhs);
	
	const Coord& getCoord() const;
	long long int getId() const;
	const std::vector<Transition*>& getTransitions() const;
	void addTransitions(Transition* transition);
};

struct placeHash{
	int operator() (const Place & p)const{

		int sum = p.getId();

		sum += (int) p.getCoord().getLatitude() +
				p.getCoord().getLongitude();

		return sum % 1009;
	}

	bool operator()(const Place &p1, const Place p2)const{
		return p1.getId() == p2.getId();
	}
};


#endif /* NODE_H_ */
