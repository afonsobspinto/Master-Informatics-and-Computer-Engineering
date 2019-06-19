using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AudioSettings : MonoBehaviour
{
    private Slider slider;

    // Start is called before the first frame update
    void Start()
    {
        slider = GetComponent<Slider>();
    }

    // Update is called once per frame
    void Update()
    {
        string masterBusString = "Bus:/";
        FMOD.Studio.Bus masterBus;

        masterBus = FMODUnity.RuntimeManager.GetBus(masterBusString);
        masterBus.setVolume(slider.value);
    }
}
