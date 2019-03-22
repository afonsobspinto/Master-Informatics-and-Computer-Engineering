using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MainMenu : MonoBehaviour
{
    void Start() {
        if (SceneManager.GetActiveScene().name.StartsWith("Level")) {
            GameObject.Find("LevelCount").GetComponent<Text>().text = SceneManager.GetActiveScene().name;
            GameObject.Find("DeathCount").GetComponent<Text>().text = GameObject.Find("UITracker").GetComponent<DontDestroy>().getDeathCount();
        }
    }

    // Runs Menu Scene
    public void PlayMenuScene()
    {
        SceneManager.LoadScene("MenuScene");
    }

    // Runs Main Scene
    public void PlayMainScene()
    {
       SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    // Runs Informatic Scene
    public void PlayInfScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 2);
    }

    // Runs Main Scene
    public void PlayChemScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 3);
    }

    // Runs Main Scene
    public void PlayCivilScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 4);
    }

    // Quits the app
    public void QuitGame()
    {
        Debug.Log("User has exited the game");
        Application.Quit();
    }
}
