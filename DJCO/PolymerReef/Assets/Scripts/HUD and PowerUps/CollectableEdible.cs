using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CollectableEdible : Collectable
{
    public enum edibleType { food, plastic }

    [SerializeField]
    private edibleType type = edibleType.plastic;

    [SerializeField]
    private float amount = 0;

    public override void Interact()
    {
        PlayerController controller = player.GetComponent<PlayerController>();

        if (type == edibleType.plastic)
        {
            controller.doDamage(amount);
        }
        else
        {
            controller.gainHealth(amount);
        }

        base.Interact();
    }
}
