using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Interactable : MonoBehaviour
{
    public float interactRadius = 1f;
    public Transform player = null;
    private bool hasInteracted = false;


    // Start is called before the first frame update
    private void Start()
    {
        
    }

    // Update is called once per frame
    private void Update()
    {
        if (!hasInteracted)
        {
            float distance = Vector3.Distance(transform.position, player.position);

            if(distance <= interactRadius)
            {
                hasInteracted = true;
                Interact();
            }
        }
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, interactRadius);
    }

    public virtual void Interact()
    {
        Debug.Log("Interacting with " + transform.name + " and deleting it from the scene");
        Destroy(gameObject);
    }
}
