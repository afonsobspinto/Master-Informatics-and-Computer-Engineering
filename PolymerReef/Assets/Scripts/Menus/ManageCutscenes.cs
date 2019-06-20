using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class ManageCutscenes : MonoBehaviour
{
    private VideoPlayer videoPlayer;
    private bool pressed = false, last = false;

    void Start()
    {
        videoPlayer = gameObject.GetComponent<VideoPlayer>();
        videoPlayer.loopPointReached += LoadScene;
        if (gameObject.tag == "LastCutscene")
            last = true;
    }

    private void Update()
    {
        if (!pressed && Input.GetKeyDown(KeyCode.Space))
        {
            LoadScene(videoPlayer);
            pressed = true;
        }
    }

    void LoadScene(VideoPlayer vp)
    {
        UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(1, UnityEngine.SceneManagement.LoadSceneMode.Additive).completed += OnMenuLoaded;
    }

    private void OnMenuLoaded(AsyncOperation obj)
    {
        if(!last)
            UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(0);
        if(last)
        {
            UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(10);
            GameObject.Find("Screens").transform.Find("CreditsScreen").gameObject.SetActive(true);
            GameObject.Find("MainScreen").SetActive(false);
        }
    }
 
}
