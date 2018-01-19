/*
 * Purchase.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef PURCHASE_H_
#define PURCHASE_H_

#include "Product.h"
#include "Date.h"

#include <map>


class Purchase{
private:
	std::map<Product, unsigned short> purchase;
	Date date;
public:
	Purchase(Product product, unsigned short quantity, Date date);
	const Date getDate() const;
	bool operator < (const Purchase & rhs) const;
};



#endif /* PURCHASE_H_ */
