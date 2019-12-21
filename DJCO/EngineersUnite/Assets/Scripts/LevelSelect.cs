using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class LevelSelect : MonoBehaviour
{
    // Runs Level Scenes
    public void PlayLevelScene()
    {
        string levelNumberText = this.gameObject.GetComponentInChildren<Text>().text;
        string sceneText = "Level " + levelNumberText;
        SceneManager.LoadScene(sceneText);
    }
}
