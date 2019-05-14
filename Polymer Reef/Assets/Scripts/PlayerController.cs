using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(PlayerMotor))]
public class PlayerController : MonoBehaviour
{
    [SerializeField]
    private float speed = 5f;

    [SerializeField]
    private float lookSensitivity = 3f;

    private PlayerMotor motor;

    [SerializeField]
    private float initialHealthValue = 100f;

    [SerializeField]
    private float initialHealthLossStep = 5f;

    public static PlayerStats health;

    [SerializeField]
    private float initialEnergyValue = 100f;

    [SerializeField]
    private float initialEnergyLossStep = 5f;

    public static PlayerStats energy;
    


    private void Start()
    {
        motor = GetComponent<PlayerMotor>();
        health = new PlayerStats(this.initialHealthValue, this.initialHealthLossStep);
        energy = new PlayerStats(this.initialEnergyValue, this.initialEnergyLossStep);
    }

    private void Update()
    {
        PlayerController.health.Update();
        PlayerController.energy.Update();


        // Calculate movement velocity as a 3D vector
        float _xMov = Input.GetAxisRaw("Horizontal");
        float _zMov = Input.GetAxisRaw("Vertical");

        Vector3 _movHorizontal = transform.right * _xMov;
        Vector3 _movVertical = transform.forward * _zMov;

        // Final movement vector
        Vector3 _velocity = (_movHorizontal + _movVertical).normalized * speed;

        // Apply movement
        motor.Move(_velocity);

        // Calculate rotation as a 3D vector (turning around)
        float _yRot = Input.GetAxisRaw("Mouse X");

        Vector3 _rotation = new Vector3(0f, _yRot, 0f) * lookSensitivity;

        // Apply rotation
        motor.Rotate(_rotation);

        // Calculate camera rotation as a 3D vector (turning around)
        float _xRot = Input.GetAxisRaw("Mouse Y");

        Vector3 _cameraRotation = new Vector3(_xRot, 0f, 0f) * lookSensitivity;

        // Apply rotation
        motor.RotateCamera(_cameraRotation);
    }
}
