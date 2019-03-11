using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TubeHandler : MonoBehaviour
{

    public Animator animator;
    public PhysicsMaterial2D bouncyMaterial;
    private BoxCollider2D boxCollider2D;

    public void Start()
    {
        boxCollider2D = GetComponent<BoxCollider2D>();
    }

    public void Update()
    {
        if (Input.GetKeyDown(KeyCode.P))
        {
                animator.SetBool("IsPowerOn", true);
                TriggerChemistryAbility();
    
        }
    }

    private void TriggerChemistryAbility()
    {
        boxCollider2D.sharedMaterial = bouncyMaterial;
    }

}
