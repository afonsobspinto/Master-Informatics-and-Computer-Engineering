using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneLoader : MonoBehaviour
{
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
            Debug.Log("Load Next Scene");
        }
        else if(insideNext)
        {
            Debug.Log("Load Previous Scene");
        }
    }

    public void unloadScene()
    {
        if (insidePrevious)
        {
            Debug.Log("Unload Next Scene");
        }
        else if (insideNext)
        {
            Debug.Log("Unload Previous Scene");
        }
    }
}
