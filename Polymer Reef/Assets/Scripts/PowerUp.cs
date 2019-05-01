using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PowerUp : Collectable
{
    public override void Interact()
    {
        Debug.Log("Interaction detected\nPlease implement interact method");
        Destroy(gameObject);
    }
}
