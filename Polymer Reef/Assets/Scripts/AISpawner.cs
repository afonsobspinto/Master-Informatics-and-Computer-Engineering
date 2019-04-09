using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

[System.Serializable]
public class AIObjects
{
    public string AIGroupName { get { return m_aiGroupName; } }
    public GameObject objectPrefab { get { return m_prefab; } }
    public int maxAI { get { return m_maxAI; } }
    public int spawnRate { get { return m_spawnRate; } }
    public int spawnAmount { get { return m_maxSpawnAmount; } }
    public bool randomizeStats { get { return m_randomizeStats; } }
    public bool enableSpawner { get { return m_enableSpawner; } }

    [Header("AI Group Stats")]
    // Name of the Group
    [SerializeField]
    private string m_aiGroupName;
    [SerializeField]
    private GameObject m_prefab;
    // Max number of AI in a group
    [SerializeField]
    [Range(0f, 30f)]
    private int m_maxAI;
    // How frequent the AI will be spawn
    [SerializeField]
    [Range(0f, 20f)]
    private int m_spawnRate;
    // Max number of AI being spawn each time
    [SerializeField]
    [Range(0f, 10f)]
    private int m_maxSpawnAmount;
    // Random values for each variable
    [SerializeField]
    private bool m_randomizeStats;
    // Enable spawner
    [SerializeField]
    private bool m_enableSpawner;


    public AIObjects(string Name, GameObject Prefab, int MaxAI, int SpawnRate, int SpawnAmount, bool RandomiseStats)
    {
        this.m_aiGroupName = Name;
        this.m_prefab = Prefab;
        this.m_maxAI = MaxAI;
        this.m_spawnRate = SpawnRate;
        this.m_maxSpawnAmount = SpawnAmount;
        this.m_randomizeStats = RandomiseStats;
    }

    public void setValues(int MaxAI, int SpawnRate, int SpawnAmount)
    {
        this.m_maxAI = MaxAI;
        this.m_spawnRate = SpawnRate;
        this.m_maxSpawnAmount = SpawnAmount;
    }

}

public class AISpawner : MonoBehaviour
{
    // Waypoints for the fishes to go
    public List<Transform> Waypoints = new List<Transform>();

    public float spawnTimer { get { return m_SpawnTimer;  } }
    public Vector3 spawnArea { get { return m_SpawnArea;  } }

    [Header("Global Stats")]
    [Range(0f, 600f)]
    // How often the spawner is used
    [SerializeField]
    private float m_SpawnTimer;
    [SerializeField]
    private Color m_SpawnColor = new Color(1.000f, 0.000f, 0.000f, 0.300f);
    [SerializeField]
    private Vector3 m_SpawnArea = new Vector3(20f, 10f, 20f);

    // Create array from new class
    [Header("AI Group Settings")]
    public AIObjects[] AIObject = new AIObjects[5];

    // Start is called before the first frame update
    void Start()
    {
        GetWaypoints();
        RandomiseGroups();
        CreateAIGroups();
        InvokeRepeating("SpawnNPC", 0.5f, spawnTimer);
    }

    void SpawnNPC()
    {
        // Loop through all the AI groups
        for(int i = 0; i < AIObject.Count(); i++)
        {
            // Check to make sure spawner is enabled
            if (AIObject[i].enableSpawner && AIObject[i].objectPrefab != null)
            {
                // Make sure that AI group doesnt have max NPCs 
                GameObject tempGroup = GameObject.Find(AIObject[i].AIGroupName);
                if(tempGroup.GetComponentInChildren<Transform>().childCount < AIObject[i].maxAI)
                {
                    // Spawn random number of NPCs from 0 to Max Spawn Amount
                    for(int j = 0; j < Random.Range(0, AIObject[i].spawnAmount); j++)
                    {
                        // Get random rotation
                        Quaternion randomRotation = Quaternion.Euler(Random.Range(-20, 20), Random.Range(0, 360), 0);
                        // Create spawned gameObject
                        GameObject tempSpawn;
                        tempSpawn = Instantiate(AIObject[i].objectPrefab, RandomPosition(), randomRotation);
                        // Put spawned NPC as child of group
                        tempSpawn.transform.parent = tempGroup.transform;
                        // Add the AIMove script and class to the new NPC
                        tempSpawn.AddComponent<AIMove>();
                    }
                }
            }
        }
    }

    // Public method for Random Position within the Spawn Area
    public Vector3 RandomPosition()
    {
        // Get a random position within our Spawn Area
        Vector3 randomPosition = new Vector3(
            Random.Range(-spawnArea.x, spawnArea.x),
            Random.Range(-spawnArea.y, spawnArea.y),
            Random.Range(-spawnArea.z, spawnArea.z)
            );

        randomPosition = transform.TransformPoint(randomPosition * .5f);
        return randomPosition;
    }

    // Public method for getting a Random Waypoint
    public Vector3 RandomWaypoint()
    {
        int randomWP = Random.Range(0, (Waypoints.Count - 1));
        Vector3 randomWaypoint = Waypoints[randomWP].transform.position;
        return randomWaypoint;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    // Method for putting random values in the AI Group settings
    void RandomiseGroups()
    {
        // randomise
        for (int i = 0; i < AIObject.Count(); i++)
        {
            if (AIObject[i].randomizeStats)
            {
                AIObject[i].setValues(Random.Range(1, 30), Random.Range(1, 20), Random.Range(1, 10));
            }
        }
    }

    // Method for creating the empty world object groups
    void CreateAIGroups()
    {
        for(int i = 0; i < AIObject.Count(); i++)
        {
             // Empty Game Object to keep our AI in
            GameObject m_AIGroupSpawn;
   
            // Create a new game object
            m_AIGroupSpawn = new GameObject(AIObject[i].AIGroupName);
            m_AIGroupSpawn.transform.parent = this.gameObject.transform;
        }
    }

    void GetWaypoints()
    {
        // Look through nested children
        Transform[] wpList = transform.GetComponentsInChildren<Transform>();

        for (int i = 0; i < wpList.Length; i++)
        {
            if (wpList[i].tag == "Waypoint")
                Waypoints.Add(wpList[i]);
        }
    }

    // Show the gizmos in colour
    void OnDrawGizmosSelected()
    {
        Gizmos.color = m_SpawnColor;
        Gizmos.DrawCube(transform.position, spawnArea);
        
    }
}
