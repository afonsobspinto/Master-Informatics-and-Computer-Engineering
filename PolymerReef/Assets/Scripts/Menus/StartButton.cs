using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StartButton : MenuButton
{
    [Header("System Scenes indexes")]
    public int handlerSceneIndex = 1;
    public int initialSceneIndex = 3;

    [Header("Player Scene index")]
    public int playerSceneIndex = 2;

    private int mainMenuIndex = 1;
    private int systemScenesLoaded = 0;

    private PlayerController player;

    private void Start()
    {
        mainMenuIndex = UnityEngine.SceneManagement.SceneManager.GetActiveScene().buildIndex;
    }

    public override void OnPressed()
    {
        UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(handlerSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive).completed += OnSystemScenesLoaded;
        UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(playerSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive).completed += OnSystemScenesLoaded;
    }

    private void OnSystemScenesLoaded(AsyncOperation obj)
    {
        ++systemScenesLoaded;

        if (systemScenesLoaded == 2)
        {
            player = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>();
            switch (initialSceneIndex)
            {
                case 4: // Scene 1
                    break;
                case 5: // Scene 2
                    player.transform.position = new Vector3(290, 3.2f, 32);
                    player.transform.Rotate(new Vector3(player.transform.rotation.x, 180.0f, player.transform.rotation.z));
                    break;
                case 6: // Scene 3
                    player.transform.position = new Vector3(510, 3.2f, 228);
                    player.transform.Rotate(new Vector3(player.transform.rotation.x, 187.7f, player.transform.rotation.z));
                    break;
                case 7: // Scene 4
                    player.transform.position = new Vector3(383, 19, 604);
                    player.transform.Rotate(new Vector3(player.transform.rotation.x, 75, player.transform.rotation.z));
                    break;
                case 8: // Scene 5
                    player.transform.position = new Vector3(160, 5, 465);
                    break;
                case 9: // Scene 6
                    player.transform.position = new Vector3(-223, 5f, 400);
                    break;
                default:
                    break;
            }
            if (initialSceneIndex != 4)
                UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(initialSceneIndex - 1, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(initialSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive).completed += OnSceneLoaded;
        }
    }

    private void OnSceneLoaded(AsyncOperation obj)
    {
        UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(1);
        if (initialSceneIndex != 4)
        {
            player.increaseEnergy(75);
            GameObject.Find("SubtitlesLevel1").SetActive(false);
            string sceneHandlersNext = "SceneHandler" + (initialSceneIndex-3) + (initialSceneIndex-2);
            string sceneHandlersPrevious = "SceneHandler" + (initialSceneIndex - 4) + (initialSceneIndex - 3);
            GameObject.Find("SceneHandlers").transform.Find(sceneHandlersNext).gameObject.SetActive(true);
            GameObject.Find("SceneHandlers").transform.Find(sceneHandlersPrevious).gameObject.SetActive(true);
        }
        string subtitlesLevel = "SubtitlesLevel" + (initialSceneIndex - 3);
        GameObject.Find("Subtitles").transform.Find(subtitlesLevel).gameObject.SetActive(true);
    }
}
