using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleUIBar : MonoBehaviour
{
    public Image _bar;

    public float _actualValue; 
    private float _lastValue = 0;

    public float _maxValue; 

    public float _valueDecreaseStep; 

    public float _valueIncreaseStep; 

    // Update is called once per frame
    void Update()
    {
        ValueChange(_actualValue, Time.deltaTime);
    }

    void ValueChange(float energyValue, float deltaTime)
    {
        float offset = energyValue - _lastValue;
        float direction = Mathf.Sign(offset);

        if (Mathf.Abs(offset) > 0.0001f)
        {

            // recharge is faster than discharge
            if (direction < 0)
            {
                _lastValue = _lastValue - _valueDecreaseStep * deltaTime;
            }
            else // direction > 0
            {
                _lastValue = _lastValue + _valueIncreaseStep * deltaTime;
            }

            if (_lastValue >= _maxValue)
            {
                _lastValue = _maxValue;
            } else if(Mathf.Sign(_lastValue) <= 0)
            {
                _lastValue = 0;
            }

            _bar.fillAmount = _lastValue / _maxValue;
        }
    }
}
