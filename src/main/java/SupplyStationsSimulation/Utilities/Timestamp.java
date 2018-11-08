package SupplyStationsSimulation.Utilities;

import java.time.LocalDateTime;

public class Timestamp {

    public String getCurrentTime(){
        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        return hour + ":" + minute + ":" + second;
    }
}
