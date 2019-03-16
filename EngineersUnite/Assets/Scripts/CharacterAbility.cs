using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterAbility : MonoBehaviour {

    public ComputerHandler computerHandler;
    private Material material;
    public float explosion_rate = 10f;
    public float current_radius = 10f;
    public float explosion = 20f;

    bool exploded = false;
    Vector3 explosionPos;
    Collider2D[] colliders;

    public CharacterSwitcher switchScript;

    void Start() {
        this.switchScript = (CharacterSwitcher) FindObjectOfType(typeof(CharacterSwitcher));
        this.material = gameObject.GetComponent<Renderer>().material;
        StudentColorOverlay();
        explosionPos = transform.position;
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.X) && name == "PlayerCiv" && this.switchScript.GetActivePlayer() == "PlayerCiv")
            StartCoroutine(TriggerCivilAbility());

        if (Input.GetKeyDown(KeyCode.X) && name == "PlayerChe" && this.switchScript.GetActivePlayer() == "PlayerChe")
            TriggerChemistryAbility();
    }

    private void OnTriggerStay2D(Collider2D other) {
        if (!Input.GetKeyDown(KeyCode.X)) return;

        if (other.gameObject.CompareTag("Computer") && name == "PlayerInf" && this.switchScript.GetActivePlayer() == "PlayerInf") {
            TriggerInformaticsAbility();
        }
            
    }
    
    private void TriggerInformaticsAbility() {
        this.computerHandler.FlipSprite();
        GameObject[] fires = GameObject.FindGameObjectsWithTag("Fire");

        foreach (var fire in fires)
            fire.SetActive(false);  // Extinguishes every fire object on the scene.
    }

    private IEnumerator TriggerCivilAbility(){
        gameObject.layer = LayerMask.NameToLayer("HelmetPlayer");
        yield return new WaitForSeconds(3);
        gameObject.layer = LayerMask.NameToLayer("Player");
    }

    public void TriggerChemistryAbility() {
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
        }
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
