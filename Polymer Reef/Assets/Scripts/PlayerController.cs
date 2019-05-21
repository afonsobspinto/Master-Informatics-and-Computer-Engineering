using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(PlayerMotor))]
public class PlayerController : MonoBehaviour
{
    [SerializeField]
    private float speed = 5f;

    [SerializeField]
    private float speedModifier = 1f;

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

    [SerializeField]
    private Camera cam;


    private void Start()
    {
        motor = GetComponent<PlayerMotor>();
        health = new PlayerStats(this.initialHealthValue, this.initialHealthLossStep);
        energy = new PlayerStats(this.initialEnergyValue, this.initialEnergyLossStep);
    }

    private void Update()
    {
        //PlayerController.health.Update();
        PlayerController.energy.Update();


        // Calculate movement velocity as a 3D vector
        float _xMov = Input.GetAxisRaw("Horizontal");
        float _zMov = Input.GetAxisRaw("Vertical");

        Vector3 _movHorizontal = transform.right * _xMov;

        // Final movement vector
        Vector3 _velocity = (cam.transform.forward * _zMov + _movHorizontal).normalized * speed * speedModifier;

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

    void increaseSpeedModifier(float amount)
    {
        this.speedModifier += amount;
    }

    public float getHealth()
    {
        return health.getCurrentValue();
    }

    public float getHealthMax()
    {
        return health.getMaxValue();
    }

    public float getEnergy()
    {
        return energy.getCurrentValue();
    }

    public float getEnergyMax()
    {
        return energy.getMaxValue();
    }


    public void changeHealth(float amount)
    {
        PlayerController.health.changeCurrentValue(amount);
    }

    public void changeMaxHealth(float amount)
    {
        PlayerController.health.changeMaxValue(amount);
    }

    public void changeEnergy(float amount)
    {
        PlayerController.energy.changeCurrentValue(amount);
    }

    public void changeMaxEnergy(float amount)
    {
        PlayerController.energy.changeMaxValue(amount);
    }

    public void changeSpeed(float amount)
    {
        this.speedModifier += amount;
    }
}
