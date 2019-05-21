using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleEnergyBar : CircleUIBar
{
    private PlayerController playerController;

    // Start is called before the first frame update
    void Start()
    {
        _bar.fillAmount = 0;

        /*playerController = GameObject.Find("Player").GetComponent<PlayerController>();
        _actualValue = playerController.getEnergy();
        _maxValue = playerController.getEnergyMax();
        _valueDecreaseStep = 4.5f;  //this step is merely visual, doesn't relate to step in player stats
        _valueIncreaseStep = 20.0f; //this step is merely visual, doesn't relate to step in player stats

        setInitial(_maxValue);*/
    }

    protected override void Update()
    {
        /*_actualValue = playerController.getEnergy();
        _maxValue = playerController.getEnergyMax();
        base.Update();*/
    }
}
