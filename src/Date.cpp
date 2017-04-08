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

bool Date::operator ==(const Date& rhs) const {
	return (this->day == rhs.day) && (this->month == rhs.month) && (this->year == rhs.year);
}

bool Date::operator <(const Date& rhs) const {
	if (this->year<rhs.year)
		return true;
	if(this->year>rhs.year)
		return false;
	if(this->month < rhs.month)
		return true;
	if(this->month > rhs.month)
		return false;
	if(this-> day < rhs.day)
		return true;
	return false;
}

const std::string Date::currentDateTime() {
    time_t     now = time(0);
    struct tm  tstruct;
    char       buf[80];
    tstruct = *localtime(&now);
    strftime(buf, sizeof(buf), "%d/%m/%Y", &tstruct);

    return buf;
}
