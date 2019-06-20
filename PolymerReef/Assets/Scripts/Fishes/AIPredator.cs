using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIPredator : MonoBehaviour
{
    [Header("AI Predator Parameters")]
    public float linearVelocity = 5.0f;
    public float angularVelocity = 90.0f; //in Degrees
    public float wanderDistance = 10.0f;
    public float idleTime = 5.0f;
    public float viewRadius = 6f;
    public float viewAngle = 90f;

    public LayerMask obstacleMask;
    public bool debugNeverSeePlayer = false;

    private bool wasChasing = true;

    private Vector3 direction = Vector3.zero;
    private Quaternion rotation = Quaternion.identity;

    private Vector3 idlePosition = Vector3.zero;
    private Vector3 wanderPosition = Vector3.zero;
    private float idleWait = 0.0f;

    // Cached objects
    private GameObject player;
    private Rigidbody body;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindWithTag("Player"); 
        body = GetComponent<Rigidbody>();
    }

    // Run every physics iteration
    void FixedUpdate()
    {
        bool shouldChase = CanSeePlayer() && !debugNeverSeePlayer;
        if (shouldChase != wasChasing)
        {
            wanderPosition = idlePosition = body.position;
            wasChasing = shouldChase;
        }

        float deltaTime = shouldChase ? Chase() : Wander();
        UpdateTransform(deltaTime);
    }

    private float Chase()
    {
        direction = (player.transform.position - body.position).normalized;
        rotation = Quaternion.LookRotation(direction);

        return Time.fixedDeltaTime;
    }

    private float Wander()
    {
        if (IsNearlyEqual(wanderPosition, body.position, 5.0f))
        {
            Vector3 radius = Vector3.one * wanderDistance;
            Vector3 minPosition = idlePosition - radius;
            Vector3 maxPosition = idlePosition + radius;

            wanderPosition.Set(
                Random.Range(minPosition.x, maxPosition.x),
                idlePosition.y,
                Random.Range(minPosition.z, maxPosition.z)
                );

            idleWait = idleTime;

            return 0.0f;
        }
        else if (idleWait > 0.0f)
        {
            idleWait -= Time.fixedDeltaTime;

            return 0.0f;
        }
        else
        {
            direction = (wanderPosition - body.position).normalized;
            rotation = Quaternion.LookRotation(direction);

            return Time.fixedDeltaTime;
        }
    }

    private void UpdateTransform(float deltaTime)
    {
        //Debug.Log("AI movement direction: " + direction + "AI body rotation: " + rotation.eulerAngles);

        float rotationTime = Quaternion.Angle(body.rotation, rotation) / angularVelocity;
        if (Mathf.Approximately(rotationTime, 0.0f))
        {
            rotationTime = 1.0f;
        }
        
        Quaternion deltaRotation = Quaternion.Slerp(body.rotation, rotation, deltaTime / rotationTime);
        Vector3 deltaDirection = (deltaRotation * Vector3.forward).normalized;
        
        body.MoveRotation(deltaRotation);
        body.MovePosition(body.position + deltaDirection * (linearVelocity * deltaTime));
    }

    private bool CanSeePlayer()
    {
        float distance = Vector3.Distance(player.transform.position, transform.position);

        if (distance <= viewRadius)
        {
            Vector3 dirToPlayer = (player.transform.position - transform.position).normalized;

            if (Vector3.Angle(transform.forward, dirToPlayer) <= viewAngle / 2)
            {
                if (!Physics.Raycast(transform.position, dirToPlayer, distance, obstacleMask))
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
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, transform.right, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, -transform.right, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, transform.up, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));
        Gizmos.DrawLine(transform.position, transform.position + (Vector3.RotateTowards(transform.forward, -transform.up, Mathf.Deg2Rad * viewAngle / 2, 0).normalized * viewRadius));

        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, viewRadius);
    }

    private static bool IsNearlyEqual(Vector3 a, Vector3 b, float Tolerance = 1e-4f)
    {
        return Vector3.SqrMagnitude(a - b) < Tolerance;
    }

}
