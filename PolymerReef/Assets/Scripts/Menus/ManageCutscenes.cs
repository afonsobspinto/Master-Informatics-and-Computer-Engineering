using UnityEngine;
using UnityEngine.Video;
using UnityEngine.UI;

public class ManageCutscenes : MonoBehaviour
{
    private VideoPlayer videoPlayer;
    private bool pressed = false, last = false;

    public int mainMenuIndex = 1;
    public bool subtitlesOn = true;
    public float musicSlider = 0.5f;

    void Start()
    {
        videoPlayer = gameObject.GetComponent<VideoPlayer>();
        videoPlayer.loopPointReached += LoadScene;

        last = gameObject.tag == "LastCutscene";
        GameObject.Find("Audio Source").GetComponent<AudioSource>().volume = musicSlider;
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

        GameObject.Find("Screens").transform.Find("SettingsScreen").transform.Find("SetSubtitles").transform.Find("SubtitlesToggle").gameObject.GetComponent<Toggle>().isOn = subtitlesOn;
        GameObject.Find("Screens").transform.Find("SettingsScreen").transform.Find("Music").transform.Find("Slider").gameObject.GetComponent<Slider>().value = musicSlider;

        if (last)
        {
            GameObject.Find("Screens").transform.Find("CreditsScreen").gameObject.SetActive(true);
            GameObject.Find("ForegroundFadeOut").transform.Find("Animator1").gameObject.SetActive(false);
        }
    }
}
