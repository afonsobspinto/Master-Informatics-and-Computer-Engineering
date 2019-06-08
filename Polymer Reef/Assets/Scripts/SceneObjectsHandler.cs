using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneObjectsHandler : MonoBehaviour
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

    public void changeActiveScene()
    {
        if (insidePrevious)
        {
            Debug.Log("Move Objects to Previous Scene");
        }
        else if (insideNext)
        {
            Debug.Log("Move Objects to Next Scene");
        }
    }
}
