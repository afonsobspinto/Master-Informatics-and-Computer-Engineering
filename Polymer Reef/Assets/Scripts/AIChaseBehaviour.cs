using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIChaseBehaviour : MonoBehaviour
{
    [Header("AI Chase Parameters")]
    public float maxLinearVelocity = 5.0f; // TODO adjust defaults
    public float maxAngularVelocity = 1.0f;
    public float idleRange = 20.0f;
    public float idleCooldown = 5.0f; // IDEA maybe make this a range of random numbers as well?

    // TODO these may not be needed as class variables
    private Vector3 direction = Vector3.zero;
    private Quaternion rotation = Quaternion.identity;

    // These may be adjusted on each update according to alert level
    private float velocity = 0.0f;
    private float acceleration = 0.1f;

    // TODO DEBUGGING ONLY: remove SerializeField once merged with 21
    [SerializeField]
    private bool isChasing = false;

    private Vector3 idlePosition = Vector3.zero;
    private float idleWait = 0.0f;

    [SerializeField]
    private float idleVelocityAdjust = 4.0f;

    // Cached objects
    private GameObject player;
    private Rigidbody body;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindWithTag("Player"); // TODO Doubt we'll need to change this too much, but reminder to make it better anyways (maybe save Rigidbody as well?)
        body = GetComponent<Rigidbody>();

        idlePosition = body.position;
        idleWait = 0.0f;
    }

    // Run every physics iteration
    void FixedUpdate()
    {
        if (isChasing)
        {
            Chase();
        }
        else
        {
            Wander();
        }

        UpdateTransform();
    }

    public void StartChasing()
    {
        isChasing = true;
    }
    public void StopChasing()
    {
        isChasing = false;

        // Reset wandering related variables
        idlePosition = body.position;
        idleWait = 0.0f;
    }

    private void Chase()
    {
//        velocity = Mathf.Clamp(velocity + acceleration * Time.fixedDeltaTime, 0.0f, maxLinearVelocity);
        velocity = maxLinearVelocity;
        direction = (player.transform.position - body.position).normalized;
        rotation = Quaternion.LookRotation(direction, Vector3.up);
    }

    private void Wander()
    {
        if (IsNearlyEqual(idlePosition, body.position)) // TODO Maybe this should be set relative to a fixed point, to avoid wandering too far from the place...
        {
            velocity = 0.0f;

            Vector3 radius = Vector3.one * idleRange / 2.0f;
            Vector3 minPosition = body.position - radius;
            Vector3 maxPosition = body.position + radius;

            idlePosition = new Vector3(
                Random.Range(minPosition.x, maxPosition.x),
                Random.Range(minPosition.y, maxPosition.y),
                Random.Range(minPosition.z, maxPosition.z)
                );
            idleWait = idleCooldown;

            Debug.Log("Idle position: " + idlePosition);
        }
        else if (idleWait > 0.0f)
        {
            idleWait -= Time.fixedDeltaTime;

            Debug.Log("Idle wait: " + idleWait);
        }
        else
        {
            Vector3 distance = idlePosition - body.position;
            // TODO adjust velocity to avoid going around in circles when near the idlePosition
            /* Per the formula:
             * Log10(x * 10^k + 1) / k
             * where ideally k >= 3.59954783142872...
             */
            velocity = maxLinearVelocity * Mathf.Log10(Mathf.Pow(10.0f, idleVelocityAdjust) * (distance.magnitude / idleRange) + 1.0f) / idleVelocityAdjust; // Slower movement when wandering
            direction = distance.normalized;
            rotation = Quaternion.LookRotation(direction, Vector3.up); // Not sure if this up vector will always suffice

            Debug.Log("AI velocity: " + velocity + "AI movement direction: " + direction + "AI body rotation: " + rotation.eulerAngles);
        }
    }

    private void UpdateTransform()
    {
        Quaternion deltaRotation = Quaternion.Slerp(body.rotation, rotation, Time.fixedDeltaTime);
        Vector3 deltaDirection = (deltaRotation * Vector3.forward).normalized;
        
        body.MoveRotation(deltaRotation);
        body.MovePosition(body.position + deltaDirection * (velocity * Time.fixedDeltaTime));
    }

    private static bool IsNearlyEqual(Vector3 a, Vector3 b, float Tolerance = 1e-4f)
    {
        return Vector3.SqrMagnitude(a - b) < Tolerance;
    }
}
