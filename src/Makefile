CC=gcc
CFLAGS=-I.
DEPS = args.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

sfind: main.o parser.o args.o
	gcc -o sfind main.o parser.o args.o -I.