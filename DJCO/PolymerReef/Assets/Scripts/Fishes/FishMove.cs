using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FishMove : MonoBehaviour
{
    public GameObject[] waypoints;
    int current = 0;
    float rotSpeed;
    public float speed;
    float wPradius = 1;

    private AIManagement aIManagement;

    // Start is called before the first frame update
    void Start()
    {
        AnimateRandomly();
        aIManagement = GameObject.FindWithTag("FishTrigger").GetComponent<AIManagement>();
    }

    // Update is called once per frame
    void Update()
    {
        if (aIManagement.HasPlayerPassed())
        {
            if (Vector3.Distance(waypoints[current].transform.position, transform.position) < wPradius)
            {
                current++;
                if (current == waypoints.Length)
                {
                    Destroy(gameObject);
                    return;
                }
                else if (current >= waypoints.Length)
                    current = 0;
            }
            RotateNPC(waypoints[current].transform.position, speed);
            transform.position = Vector3.MoveTowards(transform.position, waypoints[current].transform.position, Time.deltaTime * Random.Range(speed - 2, speed + 2));
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

    void AnimateRandomly()
    {
        Animator anim = GetComponent<Animator>();
        AnimatorStateInfo state = anim.GetCurrentAnimatorStateInfo(0);
        anim.Play(state.fullPathHash, -1, Random.Range(0f, state.length));
    }
}
