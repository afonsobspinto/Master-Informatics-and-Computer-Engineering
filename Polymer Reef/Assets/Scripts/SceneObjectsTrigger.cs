using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneObjectsTrigger : MonoBehaviour
{
    public bool isPrevious;
    public bool isCenter;
    public bool isNext;

    private SceneObjectsHandler sceneObjectsHandler;

    // Start is called before the first frame update
    void Start()
    {
        this.sceneObjectsHandler = this.transform.parent.gameObject.GetComponent<SceneObjectsHandler>();
    }

    private void OnTriggerEnter(Collider c)
    {
        if (isPrevious)
        {
            this.sceneObjectsHandler.setInsidePrevious(true);
        }
        else if (isNext)
        {
            this.sceneObjectsHandler.setInsideNext(true);
        }
    }

    private void OnTriggerExit(Collider c)
    {
        if (isPrevious)
        {
            this.sceneObjectsHandler.setInsidePrevious(false);
        }
        else if (isCenter)
        {
            this.sceneObjectsHandler.changeActiveScene();
        }
        else if (isNext)
        {
            this.sceneObjectsHandler.setInsideNext(false);
        }
    }
}
