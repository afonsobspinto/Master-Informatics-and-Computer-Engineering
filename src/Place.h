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
#include "Purchase.h"


class Place{

private:
	long long int id;
	Coord coord;
	std::vector<Transition*> transitions;
	std::string label;

public:
	Place(long long int id, Coord coord);

	long long int getID() const;
	const Coord& getCoord() const;
	const virtual std::string getName() const;
	const std::vector<Transition*>& getTransitions() const;
	void addTransitions(Transition* transition);
	double getDistance(Place* place2);
	const std::vector<Purchase>& getGroceries() const;

	bool operator== (const Place &rhs) const;
	bool operator < (const Place& rhs) const;
	const std::string& getLabel() const;
	void setLabel(const std::string& label);
};



#endif /* NODE_H_ */
