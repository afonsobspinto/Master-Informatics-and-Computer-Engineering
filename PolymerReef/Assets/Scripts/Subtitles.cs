using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Subtitles : MonoBehaviour
{
    private Text text;

    public int startTime = 0;
    public string subtitle = "";
    public int duration = 5;
    public KeyCode keycode = KeyCode.E;
    private int[] subDurations;
    public bool subtitleEnabled = false;

    // Start is called before the first frame update
    void Start()
    {
        text = this.gameObject.GetComponent<Text>();
    }

    private void Update()
    {
        if (subtitleEnabled)
        {
            subtitleEnabled = false;
            Debug.Log("n " + gameObject.name);
            StartCoroutine(Sequence());
        }
        if (Input.GetKeyDown(keycode))
        {
            subtitleEnabled = true;
            Debug.Log("n " + gameObject.name);
            gameObject.SetActive(!gameObject.activeSelf);
        }
    }

    IEnumerator Sequence()
    {
            Debug.Log("n " + gameObject.name);
            yield return new WaitForSeconds(1);
            text.text = subtitle;
            yield return new WaitForSeconds(duration);
            text.text = "";
    }
}
