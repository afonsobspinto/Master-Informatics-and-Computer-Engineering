using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleEnergyBar : CircleUIBar
{
    // Start is called before the first frame update
    void Start()
    {
        _bar.fillAmount = 0;

        _actualValue = PlayerController.energy.getCurrentValue();
        _maxValue = PlayerController.energy.getMaxValue();
        _valueDecreaseStep = 4.5f;  //this step is merely visual, doesn't relate to step in player stats
        _valueIncreaseStep = 20.0f; //this step is merely visual, doesn't relate to step in player stats

        setInitial(_maxValue);
    }

    protected override void Update()
    {
        _actualValue = PlayerController.energy.getCurrentValue();
        _maxValue = PlayerController.energy.getMaxValue();
        base.Update();
    }
}
