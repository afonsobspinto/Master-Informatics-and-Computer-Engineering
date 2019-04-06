using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CircleWaterQualityBar : CircleUIBar
{
    // Start is called before the first frame update
    void Start()
    {
        _bar.fillAmount = 0;

        //TODO Get values here
        _actualValue = 0; //TODO replace value with some call to the water quality mechanic
        _maxValue = 100.0f; //TODO replace value with some call to the water quality mechanic
        _valueDecreaseStep = 4.5f; // TODO get water quality spent per second
        _valueIncreaseStep = 20.0f; // TODO get/set water quality gained per second
    }
}
