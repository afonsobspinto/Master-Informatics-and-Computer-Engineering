using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CollectableEdible : Collectable
{
    public enum edibleType { food, plastic }

    [SerializeField]
    private edibleType type;

    [SerializeField]
    private float amount;

    public override void Interact()
    {
        int sign = 1;

        if (type == edibleType.plastic)
        {
            sign = -1;
        }

        PlayerController controller = player.GetComponent<PlayerController>();
        controller.changeHealth(amount * sign);
        base.Interact();
    }
}
