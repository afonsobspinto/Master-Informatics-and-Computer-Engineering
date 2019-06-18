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
    public bool subtitleEnabled = false;
    public bool subtitlePassed = false;
    public GameObject passedTrigger = null;
    public int level = 0;

    private PlayerController playerController;
    private int[] subDurations;
    private bool playerInRightLevel = false;
    private float xPos, zPos = 0;
    private int playerOnLevel = 0;

    // Start is called before the first frame update
    void Start()
    {
        text = this.gameObject.GetComponent<Text>();
        playerController = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>();
    }

    private void Update()
    {
        xPos = playerController.transform.position.x;
        zPos = playerController.transform.position.z;
        if (xPos < 290 && zPos < 230)
            playerOnLevel = 1;
        else if (xPos >= 290 && zPos < 230)
            playerOnLevel = 2;
        else if (xPos >= 400 && zPos >= 230 && zPos < 400)
            playerOnLevel = 3;
        else if (xPos < 400 && zPos >= 230)
            playerOnLevel = 4;
        else if (xPos < 100 && zPos >= 230)
            playerOnLevel = 5;
        else
            playerOnLevel = 6;

        if (playerOnLevel == level)
            playerInRightLevel = true;

        if (subtitleEnabled && playerInRightLevel)
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
