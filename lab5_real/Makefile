COMPILER_TYPE= gnu

CC=gcc

PROG= lab5

SRCS= lab5.c vbe.c video_gr.c test5.c pixmap.c timer.c

CCFLAGS= -Wall

DPADD+= ${LIBDRIVER} ${LIBSYS}

LDADD+= -llm -ldriver -lsys

LDFLAGS+= -L .

MAN=

BINDIR?= /usr/sbin

.include <bsd.prog.mk>

.include <bsd.gcc.mk>