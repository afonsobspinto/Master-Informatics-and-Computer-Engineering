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
    private float initialHealthDecreaseOverTime = 0f;

    public static PlayerStats health;

    [SerializeField]
    private CircleHealthBar healthUI;

    [SerializeField]
    private float initialEnergyValue = 100f;

    [SerializeField]
    private float initialEnergyDecreaseOverTime = 5f;

    public static PlayerStats energy;

    [SerializeField]
    private CircleEnergyBar energyUI;

    [SerializeField]
    private Camera cam;


    private void Start()
    {
        motor = GetComponent<PlayerMotor>();
        health = new PlayerStats(this.initialHealthValue, this.initialHealthDecreaseOverTime);
        energy = new PlayerStats(this.initialEnergyValue, this.initialEnergyDecreaseOverTime);

        energyUI.setInitial(energy.getMaxValue());
        healthUI.setInitial(health.getMaxValue());
    }

    private void Update()
    {
        updateEnergy();


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

    public void gainHealth(float amount)
    {
       PlayerController.health.increaseValue(amount);
        healthUI.increase(amount);
    }

    public void doDamage(float amount)
    {
        PlayerController.health.decreaseValue(amount);
        healthUI.decrease(amount);
    }

    public void doDamageOverTime(float amount)
    {
        PlayerController.health.decreaseValue(amount);
        healthUI.decreaseOverTime(amount);
    }

    public void changeMaxHealth(float amount)
    {
        PlayerController.health.changeMaxValue(amount);
    }

    public void increaseEnergy(float amount)
    {
        PlayerController.energy.increaseValue(amount);
        energyUI.increase(amount);
    }

    public void LoseEnergy(float amount)
    {
        PlayerController.energy.decreaseValue(amount);
        energyUI.decrease(amount);
    }

    public void updateEnergy()
    {
        if (!energyUI.isIncreasing)
        {
            float energyDelta = PlayerController.energy.getUpdateLoss();
            PlayerController.energy.updateValue(energyDelta);
            //energyUI.decreaseOverTime(energyDelta);

        }
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
