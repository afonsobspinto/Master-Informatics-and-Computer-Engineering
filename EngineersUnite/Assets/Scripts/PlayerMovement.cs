using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour 
{
    public CharacterController2D controller;
    public Animator animator;

    float horizontalMove = 0f;
    public float runSpeed = 30f;

    bool jump, crouch = false;

    private CharacterSwitcher charSwitchScript;

    void Start() 
    {
        charSwitchScript = (CharacterSwitcher) FindObjectOfType(typeof(CharacterSwitcher));
    }

    void Update() 
    {  
        // Check whether this student is active.
        if (!name.Equals(this.charSwitchScript.getActiveCharacter()))
            return;

        horizontalMove = Input.GetAxisRaw("Horizontal") * runSpeed;
        animator.SetFloat("Speed", Mathf.Abs(horizontalMove));

        if (Input.GetButtonDown("Jump")) 
        {
            animator.SetBool("IsJumping", true);
            jump = true;
        }

        if (Input.GetButtonDown("Crouch"))
            crouch = true;
        else if (Input.GetButtonUp("Crouch"))
            crouch = false;
    }

    public void OnLanding() 
    {
        animator.SetBool("IsJumping", false);
    }

    void FixedUpdate() 
    {
        controller.Move(horizontalMove * Time.fixedDeltaTime, crouch, jump);
        jump = false; crouch = false;
    }

    void OnTriggerEnter2D(Collider2D other) 
    {
        if (other.gameObject.CompareTag("Coin")) 
        {
            other.gameObject.SetActive(false);
        }
    }
}
