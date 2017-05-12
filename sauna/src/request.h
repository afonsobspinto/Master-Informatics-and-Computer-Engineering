/*
 * request.h
 *
 *  Created on: May 12, 2017
 *      Author: afonso
 */

#ifndef REQUEST_H_
#define REQUEST_H_

typedef struct {
    unsigned int id;
    char gender;
    unsigned int duration;
    unsigned int rejections;

} Request;

void generate(Request* r){
	printf("Boas");

}


#endif /* REQUEST_H_ */
