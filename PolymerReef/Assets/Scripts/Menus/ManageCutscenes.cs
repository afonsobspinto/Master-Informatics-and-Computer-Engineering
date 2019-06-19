using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class ManageCutscenes : MonoBehaviour
{
    private VideoPlayer videoPlayer; 

    void Start()
    {
        videoPlayer = gameObject.GetComponent<VideoPlayer>();
        videoPlayer.loopPointReached += LoadScene;
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
