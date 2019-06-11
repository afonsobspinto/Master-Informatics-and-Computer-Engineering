using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Subtitles : MonoBehaviour
{
    private Text text;

    [Header("Type the start time, the subtitles and then a duration for each one")]
    public int startTime = 0;
    public string[] subtitles = new string[3];
    public int[] durations;

    // Start is called before the first frame update
    void Start()
    {
        durations = new int[subtitles.Length];
        text = this.gameObject.GetComponent<Text>();
        StartCoroutine(Sequence());
    }

    void OnValidate()
    {
        if (subtitles.Length != durations.Length)
            System.Array.Resize(ref durations, subtitles.Length);
    }

    IEnumerator Sequence()
    {
        yield return new WaitForSeconds(startTime);
        for (int i=0; i < subtitles.Length; i++)
        {
            yield return new WaitForSeconds(durations[i]);
            text.text = subtitles[i];
            yield return new WaitForSeconds(1);
            text.text = "";
        }
    }
}
