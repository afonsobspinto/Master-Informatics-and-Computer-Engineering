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
    public string ranOutOf = "None";
    private int[] subDurations;
    public bool subtitleEnabled = false;
    public bool subtitlePassed = false;
    private PlayerController playerController;
    public GameObject passedTrigger = null;

    // Start is called before the first frame update
    void Start()
    {
        text = this.gameObject.GetComponent<Text>();
        playerController = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>();
    }

    private void Update()
    {
        if (subtitleEnabled)
        {
            if (ranOutOf == "None" && passedTrigger == null)
            {
                StartCoroutine(Sequence());
            }
            else if (ranOutOf == "Energy" && playerController.getEnergy() == 0 && passedTrigger == null)
            {
                StartCoroutine(Sequence());
            } else if (passedTrigger != null)
            {
                if (passedTrigger.GetComponent<AIManagement>().HasPlayerPassed())
                    StartCoroutine(Sequence());
            }
        }
        if (Input.GetKeyDown(keycode) && subtitlePassed)
        {
            gameObject.SetActive(false);
            subtitleEnabled = false;
        }
    }

    IEnumerator Sequence()
    {
        yield return new WaitForSeconds(1);
        text.text = subtitle;
        subtitlePassed = true;
        yield return new WaitForSeconds(duration);
        text.text = "";
        gameObject.SetActive(false);
        subtitleEnabled = false;
    }
}
