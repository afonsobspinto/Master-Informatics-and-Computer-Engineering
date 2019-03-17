using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerMovement : MonoBehaviour
{
    public CharacterController2D controller;
    private CharacterSwitcher charSwitchScript;
    public Animator animator;

    private float horizontalMove = 0f;
    public float runSpeed = 30f;

    private bool jump, crouch = false;

    private Rigidbody2D m_rigidbody2D;
    public bool isFrozen = false, alreadyCollided = false;
    public Vector2 frozenVelocity = new Vector2();



    void Start()
    {
        charSwitchScript = (CharacterSwitcher)FindObjectOfType(typeof(CharacterSwitcher));
        m_rigidbody2D = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        // Check whether this student is active.
        if (!name.Equals(this.charSwitchScript.GetActivePlayer()))
            return;

        horizontalMove = Input.GetAxisRaw("Horizontal") * runSpeed;
        animator.SetFloat("Speed", Mathf.Abs(horizontalMove));

        if (Input.GetButtonDown("Jump")) {
            animator.SetBool("IsJumping", true);
            jump = true;
        }

        if (Input.GetButtonDown("Crouch"))
            FallThroughPlatform();

        if (Input.GetKeyDown(KeyCode.T))
            HandlePauseAbility();
        /*
        if (Input.GetKeyDown(KeyCode.Z))
            UnPauseAndAbility();
            */

        if (Input.GetKeyDown(KeyCode.R))
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);

        // Register the object for collisions after the frame has elapsed.
        this.alreadyCollided = false;
    }

    /*
    public void UnPauseAndAbility(){
        PlayerMovement[] playerMovements = (PlayerMovement[])FindObjectsOfType(typeof(PlayerMovement));
        foreach (PlayerMovement pm in playerMovements)
        {
            if (pm.isFrozen)
            {
                CharacterAbility ability = pm.GetComponent<CharacterAbility>();
                if(ability.gameObject.name == "PlayerChe")
                {
                    pm.HandlePauseAbility();
                    ability.TriggerChemistryAbility();
                }
            }
        }
    }
    */

    public void HandlePauseAbility() {
        if (this.charSwitchScript.GetPauseCount() > 0 && !this.isFrozen) {
            m_rigidbody2D.constraints = RigidbodyConstraints2D.FreezeAll;
            this.charSwitchScript.ModifyPauseCount(-1);
            frozenVelocity = m_rigidbody2D.velocity;
        }
        else if (this.isFrozen) {
            m_rigidbody2D.constraints = RigidbodyConstraints2D.FreezeRotation;
            m_rigidbody2D.velocity = frozenVelocity;
        }
        this.isFrozen = !this.isFrozen;
    }

    public void FallThroughPlatform() {
        gameObject.layer = LayerMask.NameToLayer("Platform");
    }

    public void OnLanding() {
        animator.SetBool("IsJumping", false);
    }

    void FixedUpdate() {
        controller.Move(horizontalMove * Time.fixedDeltaTime, crouch, jump);
        jump = false; crouch = false;
    }

    void OnTriggerEnter2D(Collider2D other) {
        // Check whether another collider was already triggered in this frame.
        if (this.alreadyCollided) return;

        if (other.gameObject.CompareTag("Coin")) {
            other.gameObject.SetActive(false);
            this.charSwitchScript.ModifyPauseCount(1);
        }

        if (other.gameObject.CompareTag("Fire")) {
            Debug.Log("Entered fire, restarting level.");
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }

        if (other.gameObject.CompareTag("Door")) {
            SceneManager.LoadScene("MenuScene");
        }

        this.alreadyCollided = true;    // Register this collider.
    }

    private void OnCollisionStay2D(Collision2D other) {
        if (gameObject.layer == LayerMask.NameToLayer("HelmetPlayer"))
            return;

        if (gameObject.layer == LayerMask.NameToLayer("Platform") && other.gameObject.layer == LayerMask.NameToLayer("Player"))
            gameObject.layer = LayerMask.NameToLayer("Player");

        if (other.gameObject.layer == LayerMask.NameToLayer("Player"))
            return;
    
        if (other.gameObject.layer != LayerMask.NameToLayer("Platform"))
            gameObject.layer = LayerMask.NameToLayer("Player");
    }
}
