using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneTrigger : MonoBehaviour
{
    public bool isPrevious;
    public bool isCenter;
    public bool isNext;

    private SceneLoader sceneLoader;

    // Start is called before the first frame update
    void Start()
    {
        this.sceneLoader = this.transform.parent.gameObject.GetComponent<SceneLoader>();
    }

    private void OnTriggerEnter(Collider c)
    {
        if (isPrevious)
        {
            this.sceneLoader.setInsidePrevious(true);
        }
        else if(isCenter)
        {
            this.sceneLoader.loadScene();
        }
        else if(isNext)
        {
            this.sceneLoader.setInsideNext(true);
        }
    }

    private void OnTriggerExit(Collider c)
    {
        if (isPrevious)
        {
            this.sceneLoader.setInsidePrevious(false);
        }
        else if (isCenter)
        {
            this.sceneLoader.unloadScene();
        }
        else if (isNext)
        {
            this.sceneLoader.setInsideNext(false);
        }
    }
}
