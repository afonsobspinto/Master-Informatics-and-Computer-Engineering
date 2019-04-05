using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

public class AISpawner : MonoBehaviour
{
    // Waypoints for the fishes to go
    public List<Transform> Waypoints = new List<Transform>();

    // Linq List
    public Transform[] WaypointsLinq;

    // Start is called before the first frame update
    void Start()
    {
        GetWaypoints();
        GetWaypointsLinq();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void GetWaypointsLinq()
    {
        WaypointsLinq = transform.GetComponentsInChildren<Transform>().Where(c => c.gameObject.tag == "Waypoint").ToArray();
    }

    void GetWaypoints()
    {
        Transform[] wpList = transform.GetComponentsInChildren<Transform>();

        for (int i = 0; i < wpList.Length; i++)
        {
            if (wpList[i].tag == "Waypoint")
                Waypoints.Add(wpList[i]);
        }
    }
}
