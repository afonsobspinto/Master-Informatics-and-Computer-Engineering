using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightControl : MonoBehaviour
{
    private GameObject energyCircle;
    private CircleEnergyBar energyBar;

    // Start is called before the first frame update
    void Start()
    {
        energyCircle = GameObject.Find("EnergyBar");
        energyBar = energyCircle.GetComponent<CircleEnergyBar>();
    }

    // Update is called once per frame
    void Update()
    {
        foreach (Transform child in transform)
        {
            Light light = child.GetComponent<Light>();
            float intens = light.intensity;
            light.intensity = energyBar._actualValue/33;
        }
    }
}
