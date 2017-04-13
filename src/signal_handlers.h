#ifndef _SIGNAL_HANDLERS
#define _SIGNAL_HANDLERS

#include <sys/types.h>
#include <signal.h>
#include <stdlib.h>
#include <unistd.h>

void sigint_handler(int signo);


#endif
