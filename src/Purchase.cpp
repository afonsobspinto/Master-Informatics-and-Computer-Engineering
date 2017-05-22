/*
 * Purchase.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Purchase.h"

using namespace std;

Purchase::Purchase(Product product, unsigned short quantity, Date date) : date(date) {
	purchase.insert(make_pair(product,quantity));
};

const Date Purchase::getDate() const {
	return date;
}


bool Purchase::operator <(const Purchase& rhs) const {
	return this->date < rhs.date;
}
