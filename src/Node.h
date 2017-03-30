/*
 * Node.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef NODE_H_
#define NODE_H_

#include "Coord.h"

class Node{

private:
	long long int id;
	Coord coord;

public:
	Node(long long int id, Coord coord);

	double distance(Node &node2);

	bool operator== (const Node &rhs);


};



#endif /* NODE_H_ */
