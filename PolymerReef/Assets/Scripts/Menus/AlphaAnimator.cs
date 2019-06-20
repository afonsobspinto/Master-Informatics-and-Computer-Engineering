using System;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
public class AlphaAnimator : MonoBehaviour
{
    public enum TransitionType
    {
        Logarithmic,
        Linear,
        Exponential,
        SineWave,
    }

    private float time;

    private Color alphamask = new Color(0.0f, 0.0f, 0.0f, 0.0f);
    private Action<float> transition;

    [Header("Transition target")]
    public Graphic target;
    public bool isFirstTransition = false;

    [Header("Transition type")]
    public TransitionType type = TransitionType.Linear;
    public bool loop = false;

    [Header("Transition parameters")]
    [Min(0.0f)]
    public float transitionSpeed = 1.0f;
    [Range(0.0f, 1.0f)]
    public float transitionMin = 0.0f;
    [Range(0.0f, 1.0f)]
    public float transitionMax = 1.0f;
    public bool reverse = false;

    public UnityEvent onTransitionStart;
    public UnityEvent onTransitionLoop;
    public UnityEvent onTransitionEnd; // End won't be executed if loop == true

    private void Awake()
    {
        if (target)
        {
            switch (type)
            {
                case TransitionType.Logarithmic:
                    transition = UpdateLogarithmic;
                    break;
                case TransitionType.Linear:
                    transition = UpdateLinear;
                    break;
                case TransitionType.Exponential:
                    transition = UpdateExponential;
                    break;
                case TransitionType.SineWave:
                    transition = UpdateSineWave;
                    break;
            }

            if (isFirstTransition)
            {
                transition(0.0f);

                target.color = new Color(target.color.r, target.color.g, target.color.b, alphamask.a);
            }
        }
    }

    private void Start()
    {
        if (enabled = target)
        {
            alphamask.a = target.color.a;

            onTransitionStart.Invoke();
        }
    }

    // Update is called once per frame
    private void Update()
    {
        if (!loop && Input.GetKey(KeyCode.Space))
        {
            time = 1.0f;
        }

        time += Time.deltaTime * transitionSpeed;

        target.color -= alphamask;

        transition(time);

        target.color += alphamask;

        if (time >= 1.0f)
        {
            if (enabled = loop)
            {
                time -= 1.0f;

                onTransitionLoop.Invoke();
            }
            else
            {
                onTransitionEnd.Invoke();
            }
        }
    }

    private void UpdateLogarithmic(float deltaTime)
    {
        deltaTime = Mathf.Clamp(deltaTime, transitionMin, transitionMax);

        if (deltaTime == transitionMin)
        {
            time = transitionMin;
        }
        if (deltaTime == transitionMax)
        {
            time = 1.0f;
        }

        deltaTime = reverse ? 1.0f - deltaTime : deltaTime;
        
        alphamask.a = Mathf.Log(1024.0f * deltaTime, 2.0f) / 10.0f;
    }
    private void UpdateLinear(float deltaTime)
    {
        deltaTime = Mathf.Clamp(deltaTime, transitionMin, transitionMax);

        if (deltaTime == transitionMin)
        {
            time = transitionMin;
        }
        if (deltaTime == transitionMax)
        {
            time = 1.0f;
        }

        deltaTime = reverse ? 1.0f - deltaTime : deltaTime;

        alphamask.a = deltaTime;
    }
    private void UpdateExponential(float deltaTime)
    {
        deltaTime = Mathf.Clamp(deltaTime, transitionMin, transitionMax);

        if (deltaTime == transitionMin)
        {
            time = transitionMin;
        }
        if (deltaTime == transitionMax)
        {
            time = 1.0f;
        }

        deltaTime = reverse ? 1.0f - deltaTime : deltaTime;

        alphamask.a = Mathf.Pow(2.0f, 10.0f * deltaTime) / 1024.0f;
    }
    private void UpdateSineWave(float deltaTime)
    {
        deltaTime = reverse ? -deltaTime : deltaTime;

        alphamask.a = ((Mathf.Sin(2.0f * Mathf.PI * deltaTime) + 1.0f) / 2.0f) * (transitionMax - transitionMin) + transitionMin;
    }
}
