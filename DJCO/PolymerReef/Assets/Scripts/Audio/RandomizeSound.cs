using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RandomizeSound : MonoBehaviour
{
    private IEnumerator coroutine;
    [Header("Select time range")]
    public float lowerValue = 10f;
    public float upperValue = 20f;

    void Start()
    {
        coroutine = PlaySound(Random.Range(lowerValue, upperValue));
        StartCoroutine(coroutine);
    }

    private IEnumerator PlaySound(float waitTime)
    {
        while (true)
        {
            yield return new WaitForSeconds(waitTime);
            GameObject.Find("Audio").transform.Find("Axolotl").gameObject.SetActive(true);
            yield return new WaitForSeconds(3);
            GameObject.Find("Audio").transform.Find("Axolotl").gameObject.SetActive(false);
        }
    }
}
