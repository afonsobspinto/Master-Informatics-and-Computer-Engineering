using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleHealthBar : CircleUIBar
{
   // Start is called before the first frame update
    void Start()
    {
        _bar.fillAmount = 0;

        //TODO Get values here
        _actualValue = 100.0f; //TODO replace value with some call to the health mechanic
        _maxValue = 100.0f; //TODO replace value with some call to the health mechanic
        _valueDecreaseStep = 4.5f; // TODO get health spent per second
        _valueIncreaseStep = 20.0f; // TODO get/set health gained per second
    }
}
