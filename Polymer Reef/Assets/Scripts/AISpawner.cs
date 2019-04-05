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

    // Create array from new class
    [Header("AI Group Settings")]
    public AIObjects[] AIObject = new AIObjects[5];

    // Start is called before the first frame update
    void Start()
    {
        GetWaypoints();
        RandomiseGroups();
        CreateAIGroups();
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
        Transform[] wpList = transform.GetComponentsInChildren<Transform>();

        for (int i = 0; i < wpList.Length; i++)
        {
            if (wpList[i].tag == "Waypoint")
                Waypoints.Add(wpList[i]);
        }
    }
}
