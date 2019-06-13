using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PlayerMotor : MonoBehaviour
{
    [SerializeField]
    private Camera cam;

    private Vector3 velocity = Vector3.zero;
    private Vector3 rotation = Vector3.zero;
    private Vector3 cameraRotation = Vector3.zero;
    private readonly float[] angleRotations = new float[] { 0.0f, 50.0f, 330.0f, 380.0f };
    private Rigidbody rb;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
     // Get a movement vector
    public void Move(Vector3 _velocity)
    {
        velocity = _velocity;
    }

    // Get a rotational vector
    public void Rotate(Vector3 _rotation)
    {
        rotation = _rotation;
    }

    // Get a rotational vector for the camera
    public void RotateCamera(Vector3 _cameraRotation)
    {
        cameraRotation = _cameraRotation;
    }

    // Run every physics iteration
    private void FixedUpdate()
    {
        PerformMovement();
        PerformRotation();
    }

    // Perform movement based on velocity variable
    void PerformMovement()
    {
        if (velocity != Vector3.zero)
            rb.MovePosition(rb.position + velocity * Time.fixedDeltaTime);
    }

    // Perform rotation
    void PerformRotation()
    {
        rb.MoveRotation(rb.rotation * Quaternion.Euler(rotation));
        if (cam != null) { 
            cam.transform.Rotate(-cameraRotation);
            if(!isWithin(cam.transform.localEulerAngles.x, angleRotations[0], angleRotations[1]) &&
                !isWithin(cam.transform.localEulerAngles.x, angleRotations[2], angleRotations[3])){
                cam.transform.Rotate(cameraRotation);
            }
        }

    }

    public static bool isWithin(float value, float minimum, float maximum)
    {
        return value >= minimum && value <= maximum;
    }
}
