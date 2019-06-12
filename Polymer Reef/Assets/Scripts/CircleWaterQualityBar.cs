using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CircleWaterQualityBar : CircleUIBar
{
    // Start is called before the first frame update
    void Start()
    {
        //_mainBar.fillAmount = 0;

        _valueDecreaseStep = 4.5f; // TODO get water quality spent per second
        _valueIncreaseStep = 20.0f; // TODO get/set water quality gained per second
        valueSensitivity = 0.1f;
    }
}
