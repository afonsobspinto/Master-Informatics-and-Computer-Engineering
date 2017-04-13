#ifndef _ACTION
#define _ACTION

#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <wait.h>
#include "vector.h"
#include "args.h"

void performAction(const struct Args* args, vector *files);

#endif
