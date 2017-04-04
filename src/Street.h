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
	bool is2Way;

public:
	Street(long long int id, std::string name, bool twoWay);
	long long int getId() const;
	bool isIs2Way() const;
	const std::string& getName() const;
};

struct streetHash{
	int operator() (const Street & s)const{

		int sum = s.getId();

		for(auto i=0; i<s.getName().size(); i++)
			sum+=(int) s.getName().at(i);

		return sum % 1009;
	}

	bool operator()(const Street &p1, const Street p2)const{
		return p1.getId() == p2.getId();
	}
};

#endif /* STREET_H_ */
