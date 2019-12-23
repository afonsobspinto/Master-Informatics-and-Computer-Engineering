package SupplyStationsSimulation.Utilities;

import java.time.LocalDateTime;

public class Timestamp {

    public String getCurrentTime(){
        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();
        String hourString = String.format("%02d" , hour);
        int minute = now.getMinute();
        String minuteString = String.format("%02d" , minute);
        int second = now.getSecond();
        String secondString = String.format("%02d" , second);
        return hourString + ":" + minuteString + ":" + secondString;
    }
}
