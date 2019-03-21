using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterAbility : MonoBehaviour {

    public ComputerHandler computerHandler;
    private Material material;
    private Animator animator;
    public float explosion_rate = 10f;
    public float current_radius = 10f;
    public float explosion = 20f;

    public bool exploded = false;

    Vector3 explosionPos;
    Collider2D[] colliders;

    private CharacterSwitcher switchScript;
    private GameObject[] indicators;
    private GameObject explosionObj;
    private bool[] isAbilityAvailable;

    private AudioSource audioSource;
    public AudioClip hacking, chemical, helmet, fire;

    void Start() {
        this.audioSource = this.GetComponent<AudioSource>();
        this.switchScript = (CharacterSwitcher) FindObjectOfType(typeof(CharacterSwitcher));
        this.material = gameObject.GetComponent<Renderer>().material;
        
        this.indicators = new GameObject[] {GameObject.Find("IndicatorInf"), GameObject.Find("IndicatorChe"), GameObject.Find("IndicatorCiv")};
        this.isAbilityAvailable = new bool[] { true, true, true };

        StudentColorOverlay();
        explosionPos = transform.position;
        explosionObj = this.gameObject.transform.GetChild(3).gameObject;
        this.animator = explosionObj.gameObject.GetComponent<Animator>();
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.X) && name == "PlayerCiv" && this.switchScript.GetActivePlayer() == "PlayerCiv")
            StartCoroutine(TriggerCivilAbility());

        if (Input.GetKeyDown(KeyCode.X) && name == "PlayerChe" && this.switchScript.GetActivePlayer() == "PlayerChe" && !this.gameObject.GetComponent<PlayerMovement>().isFrozen)
        {
            TriggerChemistryAbility();
        }
    }

    private IEnumerator StartExplosion()
    {
        animator.SetBool("Power", true);
        yield return new WaitForSeconds(1);
        animator.SetBool("Power", false);
    }

    private void OnTriggerStay2D(Collider2D other) {
        if (!Input.GetKeyDown(KeyCode.X)) return;

        if (other.gameObject.CompareTag("Computer") && name == "PlayerInf" && this.switchScript.GetActivePlayer() == "PlayerInf") {
            TriggerInformaticsAbility();
        }
            
    }

    private void DimIndicator(GameObject indicator, int index) {
        indicator.GetComponent<Renderer>().material.SetColor("_Color", Color.gray);
        this.isAbilityAvailable[index] = false;
    }
    
    private void TriggerInformaticsAbility() {
        if (!this.isAbilityAvailable[0]) return;
        this.audioSource.PlayOneShot(this.hacking);

        this.computerHandler.FlipSprite();
        GameObject[] fires = GameObject.FindGameObjectsWithTag("Fire");

        foreach (var fire in fires)
            fire.SetActive(false);  // Extinguishes every fire object on the scene.
        
        DimIndicator(this.indicators[0], 0);   // Show ability has been consumed.

        this.audioSource.PlayOneShot(this.fire);
    }

    private IEnumerator TriggerCivilAbility(){
        if (!this.isAbilityAvailable[2]) yield break;

        this.audioSource.PlayOneShot(this.helmet);
        GameObject helmet = this.transform.Find("Helmet").gameObject;
        helmet.SetActive(true);
        DimIndicator(this.indicators[2], 2);   // Show ability has been consumed.
        
        yield return new WaitForSeconds(3);
        helmet.SetActive(false);
    }

    public void TriggerChemistryAbility() {
        if (!this.isAbilityAvailable[1]) return;

        this.audioSource.PlayOneShot(this.chemical);

        if (!gameObject.GetComponent<PlayerMovement>().isFrozen && exploded == false) {
            var colliders = Physics2D.OverlapCircleAll(explosionPos, current_radius, 1 << LayerMask.NameToLayer("Player"));
            for (var i = 0; i < colliders.Length; i++)
            {
                Vector2 target = colliders[i].gameObject.transform.position;
                Vector2 pos = gameObject.transform.position;
                Vector2 distance = target - pos;
                Vector2 direction;
                if(distance.magnitude == 0)
                {
                    direction = explosion * new Vector2(0, -1);
                }
                else
                {
                    direction = explosion * (distance / distance.magnitude) / distance.magnitude;
                }

                colliders[i].gameObject.GetComponent<Rigidbody2D>().AddForce(new Vector2(direction.x * 8f, direction.y * 8f));
            }
            exploded = true;

            DimIndicator(this.indicators[1], 1);   // Show ability has been consumed.
        }

        StartCoroutine(StartExplosion());
    }

    private void StudentColorOverlay() {
        if (name == "PlayerInf") 
            this.material.SetColor("_Color", Color.red);
        else if (name == "PlayerChe")
            this.material.SetColor("_Color", Color.yellow);
        else if (name == "PlayerCiv")
            this.material.SetColor("_Color", Color.green);
    }

}
