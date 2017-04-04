/*
 * Purchase.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Purchase.h"

Purchase::Purchase(Product product, unsigned short quantity, Date date) :
		product(product), quantity(quantity), date(date) {
}
;

const Date Purchase::getDate() const {
	return date;
}

const Product Purchase::getProduct() const {
	return product;
}

const unsigned short Purchase::getQuantity() const {
	return quantity;
}
