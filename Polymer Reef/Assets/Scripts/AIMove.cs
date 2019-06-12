using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIMove : MonoBehaviour
{
    // AISpawner manager script
    private AISpawner m_AIManager;

    // Moving and Turning
    private bool m_hasTarget = false;
    private bool m_isTurning;

    // Current waypoint
    private Vector3 m_wayPoint;
    private Vector3 m_lastWaypoint = new Vector3(0f, 0f, 0f);

    // Going to use this to set the animation speed
    private Animator m_animator;
    private float m_speed;

    private Collider m_collider;

    public bool useRandomTarget;

    // Start is called before the first frame update
    void Start()
    {
        // Get the AISpawner from its parent
        m_AIManager = transform.parent.GetComponentInParent<AISpawner>();
        m_animator = GetComponent<Animator>();

        SetUpNPC();
    }

    void SetUpNPC()
    {
        // Randomly scale each NPC
        float m_scale = Random.Range(0f, 1f);
        transform.localScale += new Vector3(m_scale, m_scale, m_scale);

        if (transform.GetComponent<Collider>() != null && transform.GetComponent<Collider>().enabled == true)
            m_collider = transform.GetComponent<Collider>();
        else if (transform.GetComponentInChildren<Collider>() != null && transform.GetComponentInChildren<Collider>().enabled == true)
            m_collider = transform.GetComponentInChildren<Collider>();
    }

    // Update is called once per frame
    void Update()
    {
        // If we have not found a waypoint to move to
        // If we found a waypoint we need to move there
        if (!m_hasTarget)
            m_hasTarget = CanFindTarget();
        else
        {
            // Make sure we rotate the NPC to face its waypoint
            RotateNPC(m_wayPoint, m_speed);
            // Move the NPC in a straight line toward the waypoint
            transform.position = Vector3.MoveTowards(transform.position, m_wayPoint, m_speed * Time.deltaTime);

            // Check if collided - if yes then lose the target and look for new waypoint
            CollidedNPC();
        }

        // If NPC reaches waypoint reset target
        if (transform.position == m_wayPoint)
            m_hasTarget = false;
    }

    // Method for chaning direction if NPC collides with something
    void CollidedNPC()
    {
        RaycastHit hit;
        if(Physics.Raycast(transform.position, transform.forward, out hit, transform.localScale.z))
        {
            // If collider has hit a waypoint or registers itself ignore raycast hit
            if (hit.collider == m_collider | hit.collider.tag == "Waypoint")
                return;
            // Otherwise have a random chance that NPC will change direction
            int randomNum = Random.Range(1, 100);
            if (randomNum < 40)
                m_hasTarget = false;
        }
    }

    // Get the waypoint
    Vector3 GetWaypoint(bool isRandom)
    {
        // If isRandom is true then get a random position location
        if (isRandom)
            return m_AIManager.RandomPosition();
        // Otherwise get a random waypoint from the list of waypoint gameObjects
        else
            return m_AIManager.RandomWaypoint();
    }

    bool CanFindTarget(float speed = 2f){

        // Make sure we dont set the same waypoint twice
        if(m_lastWaypoint == m_wayPoint)
        {
            // Get a new waypoint
            m_wayPoint = GetWaypoint(true);
            return false;
        }
        else
        {
            // Set the new waypoint as the last waypoint
            m_lastWaypoint = m_wayPoint;
            // Get random speed for movement and animation
            m_speed = speed;
            m_animator.speed = m_speed;
            // Set bool to true to say we found a WP
            return true;
        }
    }

    // Rotate the NPC to face new waypoint
    void RotateNPC(Vector3 waypoint, float currentSpeed)
    {
        // Get random speed up for the turn
        float TurnSpeed = currentSpeed * Random.Range(1f, 3f);

        // Get new direction to look at for target
        Vector3 LookAt = waypoint - this.transform.position;
        transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(LookAt), TurnSpeed * Time.deltaTime);
    }

}
