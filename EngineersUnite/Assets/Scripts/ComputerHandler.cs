using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ComputerHandler : MonoBehaviour {
    
    public Sprite PendingSprite, CompletedSprite;
    private bool completed = false;

    public void FlipSprite() {
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();

        if (completed) spriteRenderer.sprite = this.CompletedSprite;
        else spriteRenderer.sprite = this.PendingSprite;

        completed = !completed;
    }

}
