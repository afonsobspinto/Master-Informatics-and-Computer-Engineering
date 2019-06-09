using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneObjectsHandler : MonoBehaviour
{
    public int sceneNoPlayer = -1;
    public int prevSceneIndex;
    public int nextSceneIndex;

    private bool insidePrevious = false;
    private bool insideNext = false;

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
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(prevSceneIndex);

            //loaded scene 1 without player instead of the original scene 1 (with the player)
            if(!scene.IsValid())
            {
                scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(sceneNoPlayer);
            }

            UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(player, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);
            Debug.Log("Move Objects to Previous Scene");
        }
        else if (insideNext)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(nextSceneIndex);
            
            UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(player, scene);
            UnityEngine.SceneManagement.SceneManager.SetActiveScene(scene);
            Debug.Log("Move Objects to Next Scene");
        }
    }
}
