using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerStats
{
    public float value = 0;
    private float maxValue = 0;
    private float valueLossStep = 0;

    public PlayerStats(float initialValue, float valueLossStep)
    {
        this.value = initialValue;
        this.maxValue = initialValue;
        this.valueLossStep = valueLossStep;
        Debug.Log("Create " + initialValue + " for value and for step " + valueLossStep);
    }


    public void Update()
    {
        float deltaTime = Time.deltaTime;
        float value = this.value;

        value = value - this.valueLossStep * deltaTime;

        if (value <= 0.0f)
        {
            value = 0.0f;
        }

        this.value = value;

    }

    public void changeCurrentValue(float amount)
    {
        float value = this.value;

        value = value + amount;

        if (value > this.maxValue)
        {
            value = this.maxValue;
        } else if (value < 0.0f)
        {
            value = 0.0f;
        }

        this.value = value;
    }

    public float getCurrentValue()
    {
        return this.value;
    }

    public float getMaxValue()
    {
        return this.maxValue;
    }

    public void changeMaxValue(float amount)
    {
        this.maxValue += amount;
    }
}
