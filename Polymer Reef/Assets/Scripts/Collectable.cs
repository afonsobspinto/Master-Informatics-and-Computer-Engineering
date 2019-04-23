using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Collectable : MonoBehaviour
{
    private bool hasInteracted = false;
    public GameObject player = null;

    private void OnTriggerEnter(Collider c)
    {
        if (!hasInteracted)
        {
            hasInteracted = true;
            Interact();
        }
    }

    public virtual void Interact()
    {
        Debug.Log("Interacting with " + transform.name + " and deleting it from the scene");
        Destroy(gameObject);
    }
}
