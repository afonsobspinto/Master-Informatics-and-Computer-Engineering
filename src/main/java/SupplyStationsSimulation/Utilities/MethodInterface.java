package SupplyStationsSimulation.Utilities;

@FunctionalInterface
public interface MethodInterface {
    int averageWaitingTime(int totalGasPumps, int ticksToFuel, int waitingLine);
}
