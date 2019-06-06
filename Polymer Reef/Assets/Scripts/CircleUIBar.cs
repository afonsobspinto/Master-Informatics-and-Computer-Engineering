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

    private float _lastCurrentValue = 0;

    private float _lastUpdatedValue = 0;

    private float damage = 0;
    private float damageOverTime = 0;

    [SerializeField]
    protected float _maxValue;

    [SerializeField]
    protected float _valueDecreaseStep;

    [SerializeField]
    protected float _valueIncreaseStep;

    private bool initialSet = false;

    private float valueSensitivity = 0.01f;

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

        _lastCurrentValue = initialValue;

        _lastUpdatedValue = initialValue;

        _mainBar.fillAmount = 100;

        initialSet = true;
    }

    void ValueChange(float deltaTime)
    {
        float offset = _currentValue - _lastCurrentValue;
        float direction = Mathf.Sign(offset);

        if (Mathf.Abs(offset) > valueSensitivity) // value has just changed, update main bar
        {
            boundValue(_currentValue);

            if (direction < 0) // decrease
            {
                _mainBar.fillAmount = _currentValue / _maxValue;
            }
            else //increase
            {
                _backgroundBar.fillAmount = _currentValue / _maxValue;
            }
            _lastCurrentValue = _currentValue;
        }

        offset = _currentValue - _lastUpdatedValue;
        direction = Mathf.Sign(offset);

        if (Mathf.Abs(offset) > valueSensitivity)
        {
            if (direction < 0) // decrease
            {
                _lastUpdatedValue = _lastUpdatedValue - _valueDecreaseStep * deltaTime;
            }
            else // increase
            {
                _lastUpdatedValue = _lastUpdatedValue + _valueIncreaseStep * deltaTime;
            }

            boundValue(_lastUpdatedValue);

            if (direction < 0) // decrease
            {
                _backgroundBar.fillAmount = _lastUpdatedValue / _maxValue;
            }
            else //increase
            {
                _mainBar.fillAmount = _lastUpdatedValue / _maxValue;
            }
        }
    }

    void boundValue(float value)
    {
        if (value >= _maxValue)
        {
            value = _maxValue;
        }
        else if (Mathf.Sign(value) <= 0)
        {
            value = 0;
        }
    }


    void decrease(float amount) // bars move seperately (health only)
    {
        damage += amount;
    }


    void increase(float amount) // bars move seperately
    {
        damage -= amount;
    }

    void decreaseOverTime(float amount) // both bars move simultaneously
    {
        damageOverTime += amount;

        _currentValue -= damageOverTime;

        boundValue(_currentValue);

        _mainBar.fillAmount = _currentValue / _maxValue;
        _backgroundBar.fillAmount = _currentValue / _maxValue;
    }
}