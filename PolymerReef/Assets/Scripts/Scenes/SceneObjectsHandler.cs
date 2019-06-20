using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneObjectsHandler : MonoBehaviour
{
    private bool insidePrevious = false;
    private bool insideNext = false;

    private SceneHandler sceneHandler;

    // Start is called before the first frame update
    void Start()
    {
        this.sceneHandler = this.transform.parent.gameObject.GetComponent<SceneHandler>();
    }

    public void setInsidePrevious(bool value)
    {
        this.insidePrevious = value;
    }

    public void setInsideNext(bool value)
    {
        this.insideNext = value;
    }

    public void changeActiveScene()
    {
        //GameObject environment = GameObject.FindGameObjectWithTag("Environment");

        if (insidePrevious)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(this.sceneHandler.prevSceneIndex);

            //UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(environment, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);

            sceneHandlerActivation(false);

            GameObject.Find("Camera").GetComponent<FogEffect>()._depthDistance = 63.3f;

        }
        else if (insideNext)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(this.sceneHandler.nextSceneIndex);
            
            //UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(environment, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);

            sceneHandlerActivation(true);

            // This should be generic but
            if (this.sceneHandler.nextSceneIndex == 9)
            {
                GameObject.Find("Camera").GetComponent<FogEffect>()._depthDistance = 300;
            }

        }
    }

    private void sceneHandlerActivation(bool activateNext)
    {
        Transform parent = this.transform.parent.parent;

        for (int i = 0; i < parent.childCount; i++)
        {
            if (parent.GetChild(i) == this.transform.parent)
            {
                if (i + 1 < parent.childCount)
                {
                    parent.GetChild(i + 1).gameObject.SetActive(activateNext);
                }

                if (i - 1 >= 0)
                {
                    parent.GetChild(i - 1).gameObject.SetActive(!activateNext);
                }
            }
        }

        if(activateNext)
        {
            string subtitlesLevelNext = "SubtitlesLevel" + (this.sceneHandler.nextSceneIndex - 3);
            int diff = this.sceneHandler.nextSceneIndex - this.sceneHandler.prevSceneIndex;
            string subtitlesLevelPrevious = "SubtitlesLevel" + (this.sceneHandler.nextSceneIndex - 3 - diff);
            GameObject.Find("Subtitles").transform.Find(subtitlesLevelNext).gameObject.SetActive(true);
            GameObject.Find("Subtitles").transform.Find(subtitlesLevelPrevious).gameObject.SetActive(false);
        }
    }
}
