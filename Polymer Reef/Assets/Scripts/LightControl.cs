using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightControl : MonoBehaviour
{
    private GameObject energyCircle;
    private PlayerController playerController;
    private bool lightOn = false;
    private FogEffect fogEffect;
    private float fogEffec_depthStart;
    private readonly float fog_shift = 25;
    private float light_intensity;

    // Start is called before the first frame update
    void Start()
    {
        energyCircle = GameObject.Find("EnergyBar");
        playerController = GameObject.Find("Player").GetComponent<PlayerController>();
        fogEffect = GameObject.FindGameObjectWithTag("Camera").GetComponent<FogEffect>();
        this.fogEffec_depthStart = fogEffect._depthStart;
        this.light_intensity = this.transform.GetChild(0).GetComponent<Light>().intensity;
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
            fogEffect._depthStart = this.fogEffec_depthStart;
        }
        else
        {
            playerController.LoseEnergy(0.1f);
            foreach (Transform child in transform)
            {
                Light light = child.GetComponent<Light>();
                light.intensity = playerController.getEnergy() * this.light_intensity / 100;
                fogEffect._depthStart = playerController.getEnergy() - this.fog_shift;
            }
        }
    }
}
