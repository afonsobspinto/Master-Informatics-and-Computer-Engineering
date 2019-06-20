using UnityEngine;
using UnityEngine.Video;

public class ManageCutscenes : MonoBehaviour
{
    private VideoPlayer videoPlayer;
    private bool pressed = false, last = false;

    public int mainMenuIndex = 1;

    void Start()
    {
        videoPlayer = gameObject.GetComponent<VideoPlayer>();
        videoPlayer.loopPointReached += LoadScene;

        last = gameObject.tag == "LastCutscene";
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
        UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(mainMenuIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive).completed += OnMenuLoaded;
    }

    private void OnMenuLoaded(AsyncOperation obj)
    {
        UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(UnityEngine.SceneManagement.SceneManager.GetActiveScene());

        if (last)
        {
            GameObject.Find("Screens").transform.Find("CreditsScreen").gameObject.SetActive(true);
            GameObject.Find("ForegroundFadeOut").transform.Find("Animator1").gameObject.SetActive(false);
        }
    }
}
