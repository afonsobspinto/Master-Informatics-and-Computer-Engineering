CC=gcc
CFLAGS=-I.
DEPS = vector.h, args.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

sfind: main.o parser.o args.o vector.o
	gcc -o sfind main.o parser.o args.o vector.o -I.