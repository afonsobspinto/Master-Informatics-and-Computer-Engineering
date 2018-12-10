package SupplyStationsSimulation;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Behaviours.Drivers.AdventurousDriverBehaviour;
import SupplyStationsSimulation.Behaviours.Drivers.CollaborativeDriverBehaviour;
import SupplyStationsSimulation.Behaviours.SupplyStations.SupplyStationsDynamicBehaviour;
import SupplyStationsSimulation.Behaviours.SupplyStations.SupplyStationsStaticBehaviour;
import SupplyStationsSimulation.Statistics.Statistics;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Locations.RandomPositionsGenerator;
import jade.core.Profile;
import jade.core.ProfileImpl;
import jade.wrapper.StaleProxyException;
import sajas.core.Runtime;
import sajas.sim.repast3.Repast3Launcher;
import sajas.wrapper.ContainerController;
import uchicago.src.sim.engine.Schedule;
import uchicago.src.sim.engine.SimInit;
import uchicago.src.sim.gui.DisplaySurface;
import uchicago.src.sim.gui.Object2DDisplay;

import java.awt.*;
import java.util.*;
import java.util.List;


public class Launcher extends Repast3Launcher {

    //todo: add log flag

    private static int COLLABORATIVE_DRIVERS;
    private static int ADVENTUROUS_DRIVERS;
    private static int STATIC_SUPPLY_STATIONS;
    private static int DYNAMIC_SUPPLY_STATIONS;
    private static int WIDTH = 200, HEIGHT = 200;
    private Statistics statistics;

    private ContainerController mainContainer;
    private DisplaySurface dsurf;
    private List<DriverAgent> adventurousDrivers, collaborativeDrivers;
    private DrawableMap drawableMap;

    @Override
    public void begin() {
        super.begin();
        buildAndScheduleDisplay();

    }

    private static void chooseParams(){
        Scanner reader = new Scanner(System.in);
        System.out.println("Welcome to a Supply Station Simulation!");
        System.out.println("How many collaborative drivers do you want to add to the map?");
        COLLABORATIVE_DRIVERS = reader.nextInt();
        System.out.println("How many adventurous drivers do you want to add to the map?");
        ADVENTUROUS_DRIVERS = reader.nextInt();
        System.out.println("How many static supply stations do you want to add to the map?");
        STATIC_SUPPLY_STATIONS = reader.nextInt();
        System.out.println("How many dynamic supply stations do you want to add to the map?");
        DYNAMIC_SUPPLY_STATIONS = reader.nextInt();
        System.out.println("All set! Hit start on the Repast Gui to start the simulation.");
    }

    private void buildAndScheduleDisplay() {
        if (dsurf != null) dsurf.dispose();

        dsurf = new DisplaySurface(this, "DrawableMap");
        registerDisplaySurface("DrawableMap", dsurf);
        Object2DDisplay display = new Object2DDisplay(drawableMap.getSpace());
        dsurf.addDisplayableProbeable(display, "Grid Display");
        addSimEventListener(dsurf);
        dsurf.display();


        getSchedule().scheduleActionAtInterval(1, dsurf, "updateDisplay", Schedule.LAST);
    }

    @Override
    protected void launchJADE() {
        Runtime rt = Runtime.instance();
        Profile p1 = new ProfileImpl();
        mainContainer = rt.createMainContainer(p1);

        try {
            launchAgents();
            this.statistics = new Statistics();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private void launchAgents() {
        new Random(System.currentTimeMillis());

        collaborativeDrivers = new ArrayList<>();
        adventurousDrivers = new ArrayList<>();
        drawableMap = new DrawableMap(WIDTH, HEIGHT);
        launchDrivers();

    }

    private void launchDrivers() {
        LinkedList<Position> positions = new RandomPositionsGenerator(ADVENTUROUS_DRIVERS * 2 + COLLABORATIVE_DRIVERS * 2 + STATIC_SUPPLY_STATIONS + DYNAMIC_SUPPLY_STATIONS, WIDTH, HEIGHT).getPositions();

        try {
            for (int i = 0; i < ADVENTUROUS_DRIVERS; i++) {
                String nickname = "Adventurous" + i;
                DriverAgent adventurousDriverAgent = new DriverAgent(nickname, Color.RED, positions.pop(), positions.pop(), drawableMap);
                adventurousDriverAgent.addBehaviour(new AdventurousDriverBehaviour(adventurousDriverAgent));
                mainContainer.acceptNewAgent(nickname, adventurousDriverAgent).start();
                drawableMap.addAgent(adventurousDriverAgent);
            }

            for (int i = 0; i < COLLABORATIVE_DRIVERS; i++) {
                String nickname = "Collaborative" + i;
                DriverAgent collaborativeDriverAgent = new DriverAgent(nickname, Color.CYAN, positions.pop(), positions.pop(), drawableMap);
                collaborativeDriverAgent.addBehaviour(new CollaborativeDriverBehaviour(collaborativeDriverAgent));
                mainContainer.acceptNewAgent(nickname, collaborativeDriverAgent).start();
                drawableMap.addAgent(collaborativeDriverAgent);
            }

            for (int i = 0; i < STATIC_SUPPLY_STATIONS; i++) {
                String nickname = "StaticSupplyStation" + i;
                SupplyStationAgent supplyStationAgent = new SupplyStationAgent(nickname, Color.GREEN, positions.pop());
                supplyStationAgent.addBehaviour(new SupplyStationsStaticBehaviour(supplyStationAgent));
                mainContainer.acceptNewAgent(nickname, supplyStationAgent).start();
                drawableMap.addAgent(supplyStationAgent);
            }

            for (int i = 0; i < DYNAMIC_SUPPLY_STATIONS; i++) {
                String nickname = "DynamicSupplyStation" + i;
                SupplyStationAgent supplyStationAgent = new SupplyStationAgent(nickname, Color.YELLOW, positions.pop());
                supplyStationAgent.addBehaviour(new SupplyStationsDynamicBehaviour(supplyStationAgent));
                mainContainer.acceptNewAgent(nickname, supplyStationAgent).start();
                drawableMap.addAgent(supplyStationAgent);
            }


            for (DrawableAgent agent : drawableMap.getAgentList()) {
                if (agent.getType() == Type.DRIVER) {
                    ((DriverAgent) agent).calculateInitialPath();
                }
            }


        } catch (StaleProxyException e) {
            e.printStackTrace();
        }

    }


    @Override
    public String[] getInitParam() {
        return new String[0];
    }

    @Override
    public String getName() {
        return "SSS - Supply Station Simulation";
    }

    /**
     * Launching Repast3
     *
     * @param args
     */
    public static void main(String[] args) {
        chooseParams();
        SimInit init = new SimInit();
        init.loadModel(new Launcher(), null, false);
    }

    public Statistics getStatistics() {
        return statistics;
    }
}
