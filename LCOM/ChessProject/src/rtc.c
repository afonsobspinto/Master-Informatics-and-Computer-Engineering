
#include "rtc.h"


void rtc_enable() {
	asm("sti");
}

void rtc_disable() {
	asm("cli");
}

void wait_valid_rtc(void) {
	unsigned long regA = 0;
	do {
		//rtc_disable();
		sys_outb(RTC_ADDR_REG, RTC_REG_A);
		sys_inb(RTC_DATA_REG, &regA);
		//rtc_enable();
	} while ( regA & RTC_UIP);
}

int rtc_get_time(time_info_t *time){
	unsigned long data;
	unsigned long seconds;
	unsigned long minutes;
	unsigned long hours;

	wait_valid_rtc(); // Seconds

	if(sys_outb(RTC_ADDR_REG, SEC_ADDR))
		return 1;
	if(sys_inb(RTC_DATA_REG, &seconds))
		return 1;

	wait_valid_rtc(); // Minutes

	if(sys_outb(RTC_ADDR_REG, MIN_ADDR))
		return 1;
	if(sys_inb(RTC_DATA_REG, &minutes))
		return 1;

	wait_valid_rtc(); // Hours

	if (sys_outb(RTC_ADDR_REG, HOUR_ADDR))
		return 1;
	if (sys_inb(RTC_DATA_REG, &hours))
		return 1;

	if(sys_outb(RTC_ADDR_REG, RTC_REG_B))
		return 1;
	if(sys_inb(RTC_DATA_REG, &data))
		return 1;

	if( !(data & RTC_INFO) )
	{
		seconds = bcd2binary(seconds);
		minutes = bcd2binary(minutes);
		hours = bcd2binary(hours);
	}

	time->seconds = seconds;
	time->minutes = minutes;
	time->hours = hours;

	return 0;
}

int rtc_get_date(date_info_t *date){
	unsigned long data;
	unsigned long week_day;
	unsigned long month_day;
	unsigned long month;
	unsigned long year;


	if(sys_outb(RTC_ADDR_REG, DAY_WEEK_ADDR))
		return 1;
	if(sys_inb(RTC_DATA_REG, &week_day))
		return 1;

	if(sys_outb(RTC_ADDR_REG, DAY_MONTH_ADDR))
		return 1;
	if(sys_inb(RTC_DATA_REG, &month_day))
		return 1;

	if (sys_outb(RTC_ADDR_REG, MONTH_ADDR))
		return 1;
	if (sys_inb(RTC_DATA_REG, &month))
		return 1;

	if (sys_outb(RTC_ADDR_REG, YEAR_ADDR))
		return 1;
	if (sys_inb(RTC_DATA_REG, &year))
		return 1;

	if(sys_outb(RTC_ADDR_REG, RTC_REG_B))
		return 1;
	if(sys_inb(RTC_DATA_REG, &data))
		return 1;

	if( !(data & RTC_INFO) )
	{
		week_day = bcd2binary(week_day);
		month_day = bcd2binary(month_day);
		month = bcd2binary(month);
		year = bcd2binary(year);
	}

	date->week_day = week_day;
	date->month_day = month_day;
	date->month = month;
	date->year = year;

	return 0;
}

unsigned long bcd2binary(unsigned long num){
	return ((num >> 4) * 10) + (num & 0x0F);
}
