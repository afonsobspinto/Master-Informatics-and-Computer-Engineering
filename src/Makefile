CC=gcc
CFLAGS=-I.
DEPS = args.h parser.h action.h signal_handlers.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

sfind: main.o parser.o args.o signal_handlers.o action.o
	gcc -o sfind main.o parser.o args.o signal_handlers.o action.o -I.