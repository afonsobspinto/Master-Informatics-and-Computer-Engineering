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
        }
        else if (insideNext)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(this.sceneHandler.nextSceneIndex);
            
            //UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(environment, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);

            sceneHandlerActivation(true);
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
    }
}
