/*
 * Coord.h
 *
 *  Created on: Mar 30, 2017
 *      Author: afonso
 */

#ifndef COORD_H_
#define COORD_H_

#include <ostream>



constexpr auto earthRadiusKm = 6371.0;

class Coord{
private:

	/*
	 * measures in radians
	 */

	double latitude;
	double longitude;

public:
	Coord(double latitude, double longitude);

	double getLatitude() const;

	double getLongitude() const;

	/**
	 * Returns the distance between two points on the Earth.
	 * Direct translation from http://en.wikipedia.org/wiki/Haversine_formula
	 * @param coord2 second point (measures in radians)
	 * @return The distance between the two points in kilometers
	 */

	double distance(Coord &coord2);

	bool operator== (const Coord &rhs);

	friend std::ostream& operator<<(std::ostream& os, Coord& coord);

};


#endif /* COORD_H_ */
