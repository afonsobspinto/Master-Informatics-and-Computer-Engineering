CC=gcc
CFLAGS=-I.
DEPS = defs.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

sfind: main.o parser.o 
	gcc -o sfind main.o parser.o -I.