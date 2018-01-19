/*
 * request.h
 *
 *  Created on: May 12, 2017
 *      Author: afonso
 */

#ifndef REQUEST_H_
#define REQUEST_H_

static int ID = 0;

typedef struct {
    unsigned int id;
    char gender;
    unsigned int duration;
    unsigned int rejections;

} Request;

void generate(Request* r, int usageTime){

	r->id = ++ID;
	r->gender =  (rand() % 2) ? 'M' : 'F';
	r->duration = rand() % usageTime + 1;
	r->rejections = 0;

}


#endif /* REQUEST_H_ */
