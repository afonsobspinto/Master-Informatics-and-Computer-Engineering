using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleEnergyBar : CircleUIBar
{
    public float ActualValue { get => _actualValue; set => _actualValue = value; }

    // Start is called before the first frame update
    void Start()
    {
        _bar.fillAmount = 0;

        //TODO Get values here
        ActualValue = 0; //TODO replace value with some call to the health mechanic
        _maxValue = 100.0f; //TODO replace value with some call to the energy mechanic
        _valueDecreaseStep = 4.5f; // TODO get energy spent per second
        _valueIncreaseStep = 20.0f; // TODO get/set energy gained per second (energy mechanics)
    }
}
