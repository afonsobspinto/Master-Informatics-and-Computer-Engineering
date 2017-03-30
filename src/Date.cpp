/*
 * Date.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "Date.h"


Date::Date(unsigned char day, unsigned char month, unsigned short year): day(day), month(month), year(year){}

unsigned char Date::getDay() const {
	return day;
}

unsigned char Date::getMonth() const {
	return month;
}

unsigned short Date::getYear() const {
	return year;
}

bool Date::operator ==(const Date& rhs) {
	return (this->day == rhs.day) && (this->month == rhs.month) && (this->year == rhs.year);
}
