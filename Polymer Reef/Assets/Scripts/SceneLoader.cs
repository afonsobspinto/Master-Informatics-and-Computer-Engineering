using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneLoader : MonoBehaviour
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

    public void loadScene()
    {
        if(insidePrevious)
        {
            UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(this.sceneHandler.nextSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            Debug.Log("Load Next Scene");
        }
        else if(insideNext)
        {
            if(this.sceneHandler.sceneNoPlayer == -1)
            {
                UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(this.sceneHandler.prevSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            }
            else
            {
                UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(this.sceneHandler.sceneNoPlayer, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            }
            
            Debug.Log("Load Previous Scene");
        }
    }

    public void unloadScene()
    {
        if (insidePrevious)
        {
            UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(this.sceneHandler.nextSceneIndex);
            Resources.UnloadUnusedAssets();
            Debug.Log("Unload Next Scene");
        }
        else if (insideNext)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(this.sceneHandler.prevSceneIndex);

            //loaded scene 1 without player instead of the original scene 1 (with the player)
            if (scene.IsValid())
            {
                UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(this.sceneHandler.prevSceneIndex);
            }
            else
            {
                UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(this.sceneHandler.sceneNoPlayer);
            }

            Resources.UnloadUnusedAssets();

            //Debug.Log(transform.parent.parent.childCount);
            Debug.Log("Unload Previous Scene");
        }
    }
}
