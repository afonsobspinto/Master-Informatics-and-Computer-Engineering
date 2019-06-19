using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SubtitleHandler : MonoBehaviour
{
    private int current = 0;

    // Start is called before the first frame update
    void Start()
    {
        transform.GetChild(current).GetComponent<Subtitles>().subtitleEnabled = true;
    }

    // Update is called once per frame
    void Update()
    {
        if(current < transform.childCount)
        {
            if (!transform.GetChild(current).GetComponent<Subtitles>().subtitleEnabled)
            {
                current++;
                if(current < transform.childCount)
                    transform.GetChild(current).GetComponent<Subtitles>().subtitleEnabled = true;
            }
        }
    }
}
