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

class Purchase{
private:
	Product product;
	unsigned short quantity;
	Date date;
public:
	Purchase(Product product, unsigned short quantity, Date date);
};



#endif /* PURCHASE_H_ */
