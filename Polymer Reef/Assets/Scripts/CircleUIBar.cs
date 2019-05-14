using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleUIBar : MonoBehaviour
{
    [SerializeField]
    protected Image _bar;

    [SerializeField]
    protected float _actualValue; 
    private float _lastValue = 0;

    [SerializeField]
    protected float _maxValue;

    [SerializeField]
    protected float _valueDecreaseStep;

    [SerializeField]
    protected float _valueIncreaseStep;

    private bool initialSet = false;
    // Update is called once per frame
    protected virtual void Update()
    {
        ValueChange(_actualValue, Time.deltaTime);
    }

    public void setInitial(float initialValue)
    {
        if(initialSet)
        {
            return;
        }

        _lastValue = initialValue;

        _bar.fillAmount = 100;

        initialSet = true;
    }

    void ValueChange(float actualValue, float deltaTime)
    {
        float offset = actualValue - _lastValue;
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
