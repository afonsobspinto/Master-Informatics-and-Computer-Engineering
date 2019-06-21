using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

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
    private float healthHungerConstant = 1f;

    [SerializeField]
    private float healthWaterQualityConstant = 2.5f;

    public static PlayerStats health;

    private CircleHealthBar healthUI;

    [SerializeField]
    public float initialEnergyValue = 100f;

    public static PlayerStats energy;

    private CircleEnergyBar energyUI;

    [Range(0f, 100f)]
    public float waterQuality = 100f;

    private CircleWaterQualityBar waterQualityUI;

    [SerializeField]
    private float minWaterQualityNeutralThreshhold = 60; // value that seperates loosing from neutral

    [SerializeField]
    private float maxWaterQualityNeutralThreshold = 80; // value that seperates neutral from gaining

    [SerializeField]
    private Camera cam = null;

    private bool isDead = false;

    private bool foundPartner = false;

    private void Start()
    {
        motor = GetComponent<PlayerMotor>();
        health = new PlayerStats(initialHealthValue);
        energy = new PlayerStats(initialEnergyValue);

        energyUI = GameObject.Find("EnergyUI").GetComponent<CircleEnergyBar>();
        energyUI.setInitial(energy.getMaxValue());

        healthUI = GameObject.Find("HealthUI").GetComponent<CircleHealthBar>();
        healthUI.setInitial(health.getMaxValue());

        waterQualityUI = GameObject.Find("WaterQualityUI").GetComponent<CircleWaterQualityBar>();
        waterQualityUI.setInitial(waterQuality);

        LoseEnergy(95f);
    }

    private void Update()
    {
        manageDeath(false);

        if (speedModifier > 1)
            changeSpeed(-0.02f);

        if (Input.GetKeyDown(KeyCode.Escape))
            SceneManager.LoadSceneAsync(1, LoadSceneMode.Additive).completed += unloadCurrentScenes;
       
        if (transform.position.y > 20)
            transform.position = new Vector3(transform.position.x, 20, transform.position.z);

        updateHealth();

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

        if (health.value < 10)
            GameObject.Find("Audio").transform.Find("LowHealth").gameObject.SetActive(true);
        else
            GameObject.Find("Audio").transform.Find("LowHealth").gameObject.SetActive(false);
    }

    private void unloadCurrentScenes(AsyncOperation obj)
    {
        int countLoaded = SceneManager.sceneCount;
        Scene[] loadedScenes = new Scene[countLoaded];

        for (int i = 0; i < countLoaded; i++)
        {
            if (SceneManager.GetSceneAt(i).buildIndex != 1 && SceneManager.GetSceneAt(i).buildIndex != 10)
                SceneManager.UnloadSceneAsync(SceneManager.GetSceneAt(i).buildIndex);
        }
    }

    private void manageDeath(bool touchedPredator)
    {
        if (!isDead && (health.getCurrentValue() <= 0 || touchedPredator) )
        {
            isDead = true;
            SceneManager.LoadSceneAsync(1, LoadSceneMode.Additive).completed += unloadCurrentScenes;
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Predator")
        {
            GameObject.Find("Audio").transform.Find("Predator").gameObject.SetActive(true);
            manageDeath(true);
        }
        else if (other.tag == "Partner" && !foundPartner)
        {
            foundPartner = true;
            SceneManager.LoadSceneAsync(10, LoadSceneMode.Additive).completed += unloadCurrentScenes;
        }
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
        energyUI.decreaseOverTime(amount);
    }

    public void updateHealth()
    {
        if (!healthUI.isIncreasing)
        {
            // formula to health loss: time * (qualityImpact * qualityConstant + hungerConstant)

            // formula to quality impact:
            //      * 0 if water quality between 60% and 80% (including 80)
            //      * 60/waterQuality if water quality bellow or equal to 60% (0 is instant kill)
            //      * waterQuality/80 if water quality greater than 80%

            float qualityImpact = 0;
            if (waterQuality <= minWaterQualityNeutralThreshhold) // loose 60% ?
            {
                qualityImpact = minWaterQualityNeutralThreshhold / waterQuality;
            }
            else if (waterQuality > maxWaterQualityNeutralThreshold) // gain 80% ?
            {
                qualityImpact = -waterQuality / maxWaterQualityNeutralThreshold;
            }
            float healthLoss = Time.deltaTime * (qualityImpact * healthWaterQualityConstant + healthHungerConstant);

            doDamageOverTime(healthLoss);
        }
    }

    public void setWaterQuality(float quality)
    {
        waterQualityUI.setInitial(quality);

        if (waterQuality > quality)
        {
            waterQualityUI.decrease(waterQuality - quality);

        }
        else if (waterQuality < quality)
        {
            waterQualityUI.increase(quality - waterQuality);
        }

        waterQuality = quality;
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
