from enum import Enum


class SwitchState(Enum):
	# Remain for logic
    TO_EXPLORER = 0
    REMAIN_EXPLORER = 1
    TO_TARGET = 2
    REMAIN_TARGET = 3
    TO_CANDY = 4
    REMAIN_CANDY = 5
    # Remain for infrared
    REMAIN_INFRARED = 6
    TO_INFRARED_BOTH = 7
    TO_INFRARED_LEFT = 8
    TO_INFRARED_RIGHT = 9
    REMAIN_ULTRASOUND = 10
    TO_ULTRASOUND_BOTH = 11
    TO_ULTRASOUND_LEFT = 12
    TO_ULTRASOUND_RIGHT = 13
