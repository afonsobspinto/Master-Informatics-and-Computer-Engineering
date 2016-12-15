COMPILER_TYPE = gnu

CC = gcc

PROG = ChessProject
SRCS = ChessProject.c
SRCS += vbe.c video_gr.c utilities.c timer.c bitmap.c mouse.c menu.c kbd.c

CCFLAGS= -Wall -O3

DPADD += ${LIBDRIVER} ${LIBSYS}
LDADD += -llm -ldriver -lsys

LDFLAGS += -L.

MAN=
BINDIR? = /usr/sbin

.include <bsd.prog.mk>
.include <bsd.gcc.mk>