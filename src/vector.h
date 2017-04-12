/*
 * vector.h
 *
 *  Created on: Apr 12, 2017
 *      Author: afonso
 */

#ifndef VECTOR_H_
#define VECTOR_H_

typedef struct vector {
    void **items;
    int capacity;
    int total;
} vector;

void vector_init(vector *);
int vector_size(vector *);
static void vector_resize(vector *, int);
void vector_add(vector *, void *);
void vector_set(vector *, int, void *);
void *vector_get(vector *, int);
void vector_delete(vector *, int);
void vector_free(vector *);


#endif /* VECTOR_H_ */
