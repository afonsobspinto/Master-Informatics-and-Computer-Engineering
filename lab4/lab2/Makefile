# Makefile for lab2

COMPILER_TYPE= gnu

CC= gcc

PROG= lab2
SRCS= lab2.c timer.c 

CCFLAGS= -Wall

DPADD+= ${LIBDRIVER} ${LIBSYS}
LDADD+= -ldriver -lsys

LDFLAGS+= -L .

MAN=

.include <bsd.prog.mk>
.include <bsd.gcc.mk>