#include <minix/syslib.h>
#include <minix/drivers.h>

int timer_set_square(unsigned long timer, unsigned long freq) {

	unsigned char st;
	unsigned long sel;

	timer_get_conf(timer, &st);  // Gets timer configuration

	st = 0x0F & st; //Get the last four significant bits

	unsigned long div = TIMER_FREQ/freq; // getting div from clock/div relation
	unsigned long div_shift = div >> 8; // shift 8

	if (timer == 0){
		sel = (TIMER_SEL0 | TIMER_LSB_MSB | st); // select TIMER_0 with LSB followed by MSB activated

		sys_outb(TIMER_CTRL, st); // send information to register control

		sys_outb(TIMER_0, div); //send first information to TIMER_0

		sys_outb(TIMER_0, div_shift); //send second information to TIMER_0

		return 0;
	}
	else if (timer == 1){
		sel = (TIMER_SEL1 | TIMER_LSB_MSB | st);

		sys_outb(TIMER_CTRL, st);

		sys_outb(TIMER_1, div);

		sys_outb(TIMER_1, div_shift);

		return 0;
	}
	else if (timer == 2){
		sel = (TIMER_SEL2 | TIMER_LSB_MSB | st);

		sys_outb(TIMER_CTRL, st);

		sys_outb(TIMER_2, div);

		sys_outb(TIMER_2, div_shift);

		return 0;
	}

	return -1;
}

int timer_subscribe_int(void ) {

	return 1;
}

int timer_unsubscribe_int() {

	return 1;
}

void timer_int_handler() {

}

int timer_get_conf(unsigned long timer, unsigned char *st) {

	unsigned char command = 0b11100000;

	switch (timer){

		case 0:
			command = command | BIT(2); // Set the command to timer 0
			break;

		case 1:
			command = command | BIT(3); // Set the command to timer 1
			break;

		case 2:
			command = command | BIT(4); // Set the command to timer 2
			break;
	}

	sys_outb(TIMER_CTRL, command) // Ask the timer status to register control

	switch (timer){

			case 0:
				sys_inb(TIMER_0, st) // Saves timer 0 info in st address
				return 0;

			case 1:
				sys_inb(TIMER_1, st) // Saves timer 1 info in st address
				return 0;

			case 2:
				sys_inb(TIMER_2, st) // Saves timer 2 info in st address
				return 0;
		}

	return 1;
}


int timer_display_conf(unsigned char conf) {

		if (conf | BIT(0) == BIT(0))
			printf("BCD (4 decades)");
		else
			printf("Binary (16 bits)");

		if ((conf | BIT(1) != BIT(1)) &&
			(conf | BIT(2) != BIT(2)) &&
			(conf | BIT(3) != BIT(3)))
		    printf("Operating Mode: 0");

		if ((conf | BIT(1) != BIT(1)) &&
			(conf | BIT(2) != BIT(2)) &&
			(conf | BIT(3) == BIT(3)))
		    printf("Operating Mode: 1");

		if ((conf | BIT(1) != BIT(1)) &&
			(conf | BIT(2) == BIT(2)) &&
			(conf | BIT(3) != BIT(3)))
		    printf("Operating Mode: 2");

		if ((conf | BIT(1) == BIT(1)) &&
			(conf | BIT(2) == BIT(2)) &&
			(conf | BIT(3) != BIT(3)))
		    printf("Operating Mode: 2");

		if ((conf | BIT(1) != BIT(1)) &&
			(conf | BIT(2) == BIT(2)) &&
			(conf | BIT(3) == BIT(3)))
		    printf("Operating Mode: 3");

		if ((conf | BIT(1) == BIT(1)) &&
			(conf | BIT(2) == BIT(2)) &&
			(conf | BIT(3) == BIT(3)))
		    printf("Operating Mode: 3");

		if ((conf | BIT(1) == BIT(1)) &&
			(conf | BIT(2) != BIT(2)) &&
			(conf | BIT(3) != BIT(3)))
		    printf("Operating Mode: 4");

		if ((conf | BIT(1) == BIT(1)) &&
			(conf | BIT(2) != BIT(2)) &&
			(conf | BIT(3) == BIT(3)))
		    printf("Operating Mode: 5");

		if ((conf | TIMER_LSB != TIMER_LSB) &&
			(conf | TIMER_MSB == TIMER_MSB))
			printf("Type of Access: LSB");

		if ((conf | TIMER_LSB == TIMER_LSB) &&
			(conf | TIMER_MSB != TIMER_MSB))
			printf("Type of Access: MSB");

		if ((conf | TIMER_LSB == TIMER_LSB) &&
			(conf | TIMER_MSB == TIMER_MSB))
			printf("Type of Access: LSB followed by MSB");

		printf("Null Count: %d", conf | TIMER_SEL1);

		printf("Output: %d", conf | TIMER_SEL2);

	return 0;
}

int timer_test_square(unsigned long freq) {

	timer_set_square(TIMER_0, freq);

	return 0;
}

int timer_test_int(unsigned long time) {

	return 1;
}

int timer_test_config(unsigned long timer) {

	unsigned char st;

	timer_get_conf(timer, &st);
	timer_display_conf(st);

	return 0;
}
