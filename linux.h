/*
 * linux.h
 *
 *  Created on: 18/11/2016
 *      Author: afonso
 */

#ifdef __unix__                    /* __unix__ is usually defined by compilers targeting Unix systems */

	#ifndef LINUX_H_
	#define LINUX_H_
	#include <termios.h>
	#include <unistd.h>
	#include <stdio.h>

	/* reads from keypress, doesn't echo */
	int getch() {
		int ch;
		struct termios t_old, t_new;

		tcgetattr(STDIN_FILENO, &t_old);
		t_new = t_old;
		t_new.c_lflag &= ~(ICANON | ECHO);
		tcsetattr(STDIN_FILENO, TCSANOW, &t_new);

		ch = getchar();

		tcsetattr(STDIN_FILENO, TCSANOW, &t_old);
		return ch;
	}

	#endif /* LINUX_H_ */

#endif
