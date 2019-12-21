using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CircleUIBar : MonoBehaviour
{
    [SerializeField]
    protected Image _mainBar;

    [SerializeField]
    protected Image _backgroundBar;

    [SerializeField]
    protected float _currentValue;

    private float _lastValue = 0;

    private float _mainBarAmount = 0;

    private float _backBarAmount = 0;

    public bool isIncreasing = false;

    [SerializeField]
    protected float _maxValue;

    [SerializeField]
    protected float _valueDecreaseStep;

    [SerializeField]
    protected float _valueIncreaseStep;

    private bool initialSet = false;

    protected float valueSensitivity = 0.01f;

    // Update is called once per frame
    protected virtual void Update()
    {
        ValueChange(Time.deltaTime);

    }

    public void setInitial(float initialValue)
    {
        if (initialSet)
        {
            return;
        }
        _currentValue = initialValue;
        _lastValue = initialValue;
        _mainBarAmount = initialValue;
        _backBarAmount = initialValue;

        _mainBar.fillAmount = 1;
        _backgroundBar.fillAmount = 1;

        initialSet = true;
    }

    void ValueChange(float deltaTime)
    {
        float offset = _currentValue - _mainBarAmount;
        float direction = Mathf.Sign(offset);

        if (Mathf.Abs(offset) > valueSensitivity)
        {
            //update main bar
            if (direction < 0) // decrease
            {
                _mainBarAmount -= _valueDecreaseStep * deltaTime;
            }
            else // increase
            {
                _mainBarAmount += _valueIncreaseStep * deltaTime;
            }

            _mainBarAmount = boundValue(_mainBarAmount);
            _mainBar.fillAmount = _mainBarAmount / _maxValue;
        } else
        {
            _mainBarAmount = _currentValue;
        }

        offset = _currentValue - _backBarAmount;
        direction = Mathf.Sign(offset);

        if (Mathf.Abs(offset) > valueSensitivity)
        {
            //update back bar
            if (direction < 0) // decrease
            {
                _backBarAmount -= _valueDecreaseStep * deltaTime;
            }
            else // increase
            {
                _backBarAmount += _valueIncreaseStep * deltaTime;
            }

            _backBarAmount = boundValue(_backBarAmount);
            _backgroundBar.fillAmount = _backBarAmount / _maxValue;
        }
        else
        {
            _backBarAmount = _currentValue;
        }

        if (isIncreasing && _mainBarAmount == _currentValue)
        {
            isIncreasing = false;
        }
    }

    float boundValue(float value)
    {
        if (value >= _maxValue)
        {
            value = _maxValue;
        }
        else if (Mathf.Sign(value) <= 0)
        {
            value = 0;
        }

        return value;
    }


    public void decrease(float amount) // bars move seperately
    {
        _currentValue -= amount;

        _currentValue = boundValue(_currentValue);

        // main Bar moves to target
        _mainBarAmount = _currentValue;
        _mainBar.fillAmount = _mainBarAmount / _maxValue;
    }


    public void increase(float amount) // bars move seperately
    {
        _currentValue += amount;
        _currentValue = boundValue(_currentValue);

        // back bar moves to target
        _backBarAmount = _currentValue;
        _backgroundBar.fillAmount = _backBarAmount / _maxValue;

        isIncreasing = true;
    }

    public void decreaseOverTime(float amount) // both bars move simultaneously
    {
        _currentValue -= amount;

        _currentValue = boundValue(_currentValue);
        _backBarAmount = _currentValue;
        _mainBarAmount = _currentValue;
        if (!isIncreasing)
        {
            _mainBar.fillAmount = _mainBarAmount / _maxValue;
        }
        _backgroundBar.fillAmount = _backBarAmount / _maxValue;
    }
}