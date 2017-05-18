/*
 * Street.h
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#ifndef STREET_H_
#define STREET_H_

#include <string>



class Street {
private:
	long long int id;
	std::string name;
	bool twoWay;

public:
	Street(long long int id, std::string name, bool twoWay);
	long long int getId() const;
	bool is2Way() const;
	const std::string& getName() const;
};


#endif /* STREET_H_ */
