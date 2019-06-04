using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Subtitles : MonoBehaviour
{
    private Text text;

    // Start is called before the first frame update
    void Start()
    {
        text = this.gameObject.GetComponent<Text>();
        StartCoroutine(Sequence());
    }

    IEnumerator Sequence()
    {
        yield return new WaitForSeconds(1);
        text.text = "It looks very dark here, you should find some energy to increase your lights!";
        yield return new WaitForSeconds(4);
        text.text = "";
        yield return new WaitForSeconds(1);
        text.text = "Find them scattered around the area...";
        yield return new WaitForSeconds(3);
        text.text = "";
        yield return new WaitForSeconds(2);
        this.gameObject.GetComponent<Text>().fontStyle = FontStyle.BoldAndItalic;
        text.text = "\"Where are my parents...\"";
        yield return new WaitForSeconds(3);
        text.text = "";
    }
}
