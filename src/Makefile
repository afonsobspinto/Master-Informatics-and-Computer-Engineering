CC=gcc
CFLAGS=-I.
DEPS = vector.h, args.h, parser.h action.h signal_handlers.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

sfind: main.o parser.o args.o vector.o signal_handlers.o action.o
	gcc -o sfind main.o parser.o args.o vector.o signal_handlers.o action.o -I.