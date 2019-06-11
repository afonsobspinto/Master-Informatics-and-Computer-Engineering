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
        GameObject player = GameObject.FindGameObjectWithTag("Player");

        if (insidePrevious)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(this.sceneHandler.prevSceneIndex);

            //UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(player, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);
            Debug.Log("Move Objects to Previous Scene");
        }
        else if (insideNext)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(this.sceneHandler.nextSceneIndex);
            
            //UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(player, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);
            Debug.Log("Move Objects to Next Scene");
        }
    }
}
