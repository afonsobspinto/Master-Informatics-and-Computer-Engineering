using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Predator : MonoBehaviour
{
    public float viewRadius = 1f;
    public float viewAngle = 180f;

    public LayerMask obstacleMask;

    public GameObject player;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (CanSeePlayer())
        {
            Debug.Log("I can see you!");
        }
        
    }

    private bool CanSeePlayer()
    {
        float distance = Vector3.Distance(player.transform.position, transform.position);

        if (distance <= viewRadius)
        {
            Vector3 dirToPlayer = (player.transform.position - transform.position).normalized;

            if(Vector3.Angle(transform.forward, dirToPlayer) <= viewAngle / 2)
            {
                if(!Physics.Raycast(transform.position, dirToPlayer, distance, obstacleMask))
                {
                    return true;
                }
            }
        }

        return false;
    }

    void OnDrawGizmos()
    {
        // Draw a yellow sphere at the transform's position
        Gizmos.color = Color.red;
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, transform.right, Mathf.Deg2Rad*viewAngle/2, 0).normalized * viewRadius));
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, -transform.right, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, transform.up, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, -transform.up, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));

        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, viewRadius);
    }
}
