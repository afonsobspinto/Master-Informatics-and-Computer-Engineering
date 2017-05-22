/*
 * Product.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Product.h"

Product::Product(int id): id(id) {
}

const int Product::getId() const {
	return id;
}


bool Product::operator ==(const Product& rhs) const {
	return (this->id == rhs.id);
}

bool Product::operator <(const Product& rhs) const {
	return this->id < rhs.id;
}
