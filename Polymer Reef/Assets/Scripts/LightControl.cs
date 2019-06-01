using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightControl : MonoBehaviour
{
    private GameObject energyCircle;
    private PlayerController playerController;
    private bool lightOn = true;
    private FogEffect fogEffect;

    // Start is called before the first frame update
    void Start()
    {
        energyCircle = GameObject.Find("EnergyBar");
        playerController = GameObject.Find("Player").GetComponent<PlayerController>();
        fogEffect = GameObject.FindGameObjectWithTag("Camera").GetComponent<FogEffect>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.L))
        {
            lightOn = !lightOn;
            foreach (Transform child in transform)
            {
                Light light = child.GetComponent<Light>();
                light.enabled = lightOn;
            }
        }

        if (!lightOn)
        {
            fogEffect._depthStart = -25f;
        }
        else
        {
            foreach (Transform child in transform)
            {
                Debug.Log("energy " + playerController.getEnergy());
                Light light = child.GetComponent<Light>();
                float intens = light.intensity;
                light.intensity = playerController.getEnergy() / 33;
                fogEffect._depthStart = playerController.getEnergy() - 25;
            }
        }
    }
}
