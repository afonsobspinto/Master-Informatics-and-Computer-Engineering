using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class ManageCutscenes : MonoBehaviour
{
    private VideoPlayer videoPlayer;
    private bool pressed = false;

    void Start()
    {
        videoPlayer = gameObject.GetComponent<VideoPlayer>();
        videoPlayer.loopPointReached += LoadScene;
    }

    private void Update()
    {
        if (!pressed && Input.GetKeyDown(KeyCode.Escape))
        {
            LoadScene(videoPlayer);
            pressed = true;
        }
    }

    void LoadScene(VideoPlayer vp)
    {
        UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(1, UnityEngine.SceneManagement.LoadSceneMode.Additive).completed += OnMenuLoaded; ;
    }

    private void OnMenuLoaded(AsyncOperation obj)
    {
        UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(0);
    }
 
}
