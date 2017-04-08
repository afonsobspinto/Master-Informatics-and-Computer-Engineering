/*
 * Date.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef DATE_H_
#define DATE_H_

#include <string>

class Date {

private:
	unsigned char day;
	unsigned char month;
	unsigned short year;

	static const std::string currentDateTime();

public:

	Date();
	Date(unsigned char day, unsigned char month, unsigned short year);

	unsigned char getDay() const;
	unsigned char getMonth() const;
	unsigned short getYear() const;

	bool operator == (const Date & rhs) const;
	bool operator < (const Date & rhs) const;




};

#endif /* DATE_H_ */
