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

public:
	Transition(long long int id, long long int srcID, long long int destID);
	long long int getDestId() const;
	long long int getRoadId() const;
	long long int getSrcId() const;
};

#endif /* TRANSITION_H_ */
