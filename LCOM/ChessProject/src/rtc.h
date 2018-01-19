#pragma once

/** @defgroup rtc rtc
 * @{
 *
 * Functions for using rtc
 */

#include <minix/drivers.h>
#include "utilities.h"

#define RTC_ADDR_REG	0x70
#define RTC_DATA_REG	0x71

#define SEC_ADDR		    0
#define MIN_ADDR		    2
#define HOUR_ADDR		    4
#define DAY_WEEK_ADDR	    6
#define DAY_MONTH_ADDR	    7
#define MONTH_ADDR		    8
#define YEAR_ADDR		    9

#define RTC_REG_A      		10
#define RTC_REG_B      		11
#define RTC_REG_C      		12
#define RTC_REG_D      		13

#define RTC_UIP				BIT(7)
#define RTC_INFO			0x04

enum week { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY };

typedef struct {
	unsigned long week_day;
	unsigned long month_day;
	unsigned long month;
	unsigned long year;
} date_info_t;

typedef struct {
	unsigned long seconds;
	unsigned long minutes;
	unsigned long hours;
} time_info_t;

void rtc_enable();

void rtc_disable();

void wait_valid_rtc(void);

int rtc_get_time(time_info_t *time);

int rtc_get_date(date_info_t *date);

unsigned long bcd2binary(unsigned long num);


