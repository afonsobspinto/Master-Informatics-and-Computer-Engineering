/*
 * Coord.cpp
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#include "math.h"
#include "Coord.h"

Coord::Coord(double latitude, double longitude): latitude(latitude), longitude(longitude)
{}

double Coord::getLatitude() const {
	return latitude;
}

double Coord::getLongitude() const {
	return longitude;
}

double Coord::distance(Coord &coord2) {

	double u, v;

	u = sin((coord2.latitude-this->latitude)/2);
	v = sin((coord2.longitude-this->longitude)/2);

	return 2.0 * earthRadiusKm * asin(sqrt(u*u+cos(this->latitude)* cos(coord2.latitude) * v * v));
}

bool Coord::operator ==(const Coord& rhs) {
	return (this->latitude == rhs.latitude) &&
			(this->longitude == rhs.longitude);
}

std::ostream& operator <<(std::ostream& os, Coord & coord) {
	os << "[" << coord.getLatitude() << ", " << coord.getLongitude() << "]";
}
