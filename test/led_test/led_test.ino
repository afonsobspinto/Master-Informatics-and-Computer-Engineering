#include <ros.h>
#include <turtlebot3_msgs/SensorState.h>
#include <OLLO.h>



#define infrared_bottom_right 1
#define infrared_bottom_left 2
#define ultrasone_bottom 4
#define ultrasone_top_5

OLLO IROLLO;
ros::NodeHandle nh;
turtlebot3_msgs::SensorState cliff_msg;
ros::Publisher pub_cliff("cliff", &cliff_msg);

void setup()
{
  nh.initNode();
  nh.advertise(pub_cliff);
  
  IROLLO.begin(2, IR_SENSOR);//IR Module must be connected at port 2.
}

void loop()
{
  
  cliff_msg.cliff = IROLLO.read(2, IR_SENSOR);
  pub_cliff.publish(&cliff_msg);
    
  delay(10);
  nh.spinOnce();
}
