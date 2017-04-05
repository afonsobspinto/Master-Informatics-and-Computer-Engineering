/*
 * Transition.h
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#ifndef TRANSITION_H_
#define TRANSITION_H_

class Transition {
private:
	long long int roadID;
	long long int srcID;
	long long int destID;
	double weigth;

public:
	Transition(long long int id, long long int srcID, long long int destID, double weigth);
	long long int getDestId() const;
	long long int getRoadId() const;
	long long int getSrcId() const;
	double getWeigth() const;
};

#endif /* TRANSITION_H_ */
