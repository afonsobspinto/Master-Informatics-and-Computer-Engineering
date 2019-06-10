using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Subtitles : MonoBehaviour
{
    private Text text;

    [Header("Subtitles")]
    public string[] subtitles = new string[3];

    // Start is called before the first frame update
    void Start()
    {
        text = this.gameObject.GetComponent<Text>();
        StartCoroutine(Sequence());
    }

    IEnumerator Sequence()
    {
        for(int i=0; i < subtitles.Length; i++)
        {
            yield return new WaitForSeconds(1);
            text.text = subtitles[i];
            yield return new WaitForSeconds(4);
            text.text = "";
        }
    }
}
