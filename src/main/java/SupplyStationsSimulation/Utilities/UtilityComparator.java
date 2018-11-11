package SupplyStationsSimulation.Utilities;

import java.util.Comparator;

public class UtilityComparator implements Comparator<UtilityFactor> {

    @Override
    public int compare(UtilityFactor o1, UtilityFactor o2) {
        return Double.compare(o1.getUtility(), o2.getUtility());
    }
}
