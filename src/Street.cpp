/*
 * Street.cpp
 *
 *  Created on: Mar 31, 2017
 *      Author: afonso
 */

#include "Street.h"

using namespace std;

Street::Street(long long int id, string name, bool twoWay):id(id), name(name), is2Way(twoWay) {
}


long long int Street::getId() const {
	return id;
}

bool Street::isIs2Way() const {
	return is2Way;
}

const std::string& Street::getName() const {
	return name;
}

