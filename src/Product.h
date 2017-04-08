/*
 * Product.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef PRODUCT_H_
#define PRODUCT_H_

class Product {
private:
	int id;

public:
	Product(int id);
	const int getId() const;

	bool operator == (const Product& rhs) const;
	bool operator < (const Product& rhs) const;
};

#endif /* PRODUCT_H_ */
