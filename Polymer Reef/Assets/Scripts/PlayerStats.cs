﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerStats
{
    public float value = 0;
    private float maxValue = 0;
    private float decreaseOverTime = 0;

    public PlayerStats(float initialValue, float decreaseOverTime)
    {
        this.value = initialValue;
        this.maxValue = initialValue;
        this.decreaseOverTime = decreaseOverTime;
    }


    public void Update()
    {
        float deltaTime = Time.deltaTime;
        float value = this.value;

        value = value - this.decreaseOverTime * deltaTime;

        if (value <= 0.0f)
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

    public void decreaseValue(float amount)
    {
        float nextValue = this.value - amount;

        this.value = valueIsBound(nextValue);
    }

    public void increaseValue(float amount)
    {
        float nextValue = this.value + amount;

        this.value = valueIsBound(nextValue);
    }


    private float valueIsBound(float value)
    {
        if (value > this.maxValue)
        {
            value = this.maxValue;
        }
        else if (value < 0.0f)
        {
            value = 0.0f;
        }

        return value;
    }
}
