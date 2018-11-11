package SupplyStationsSimulation.Utilities;

import java.time.LocalDateTime;

public class Timestamp {

    //todo: Make hours minutes and seconds always 2 digit
    public String getCurrentTime(){
        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        return hour + ":" + minute + ":" + second;
    }
}
