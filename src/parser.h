/*
 * parser.h
 *
 *  Created on: Apr 12, 2017
 *      Author: afonso
 */

#ifndef PARSER_H_
#define PARSER_H_

#include <stdbool.h>

void parser(const char *path, const struct Args* args, vector* files);
bool isValidFile(const struct stat* statBuf, const struct Args* args);


#endif /* PARSER_H_ */
