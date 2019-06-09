using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneLoader : MonoBehaviour
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

    public void loadScene()
    {
        if(insidePrevious)
        {
            UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(nextSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            Debug.Log("Load Next Scene");
        }
        else if(insideNext)
        {
            if(sceneNoPlayer == -1)
            {
                UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(prevSceneIndex, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            }
            else
            {
                UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(sceneNoPlayer, UnityEngine.SceneManagement.LoadSceneMode.Additive);
            }
            
            Debug.Log("Load Previous Scene");
        }
    }

    public void unloadScene()
    {
        if (insidePrevious)
        {
            UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(nextSceneIndex);
            Resources.UnloadUnusedAssets();
            Debug.Log("Unload Next Scene");
        }
        else if (insideNext)
        {
            UnityEngine.SceneManagement.Scene scene = UnityEngine.SceneManagement.SceneManager.GetSceneByBuildIndex(prevSceneIndex);

            //loaded scene 1 without player instead of the original scene 1 (with the player)
            if (scene.IsValid())
            {
                UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(prevSceneIndex);
            }
            else
            {
                UnityEngine.SceneManagement.SceneManager.UnloadSceneAsync(sceneNoPlayer);
            }

            Resources.UnloadUnusedAssets();
            Debug.Log("Unload Previous Scene");
        }
    }
}
