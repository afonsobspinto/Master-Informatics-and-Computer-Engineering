using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterAbility : MonoBehaviour {

    public ComputerHandler computerHandler;
    private Material material;

    void Start() {
        this.material = gameObject.GetComponent<Renderer>().material;
        StudentColorOverlay();
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.X) && name == "PlayerCiv")
            TriggerCivilAbility();
    }

    private void OnTriggerStay2D(Collider2D other) {
        if (!Input.GetKeyDown(KeyCode.X)) return;

        if (other.gameObject.CompareTag("Computer") && name == "PlayerInf") {
            TriggerInformaticsAbility();
        }
            
    }
    
    private void TriggerInformaticsAbility() {
        this.computerHandler.FlipSprite();
        GameObject[] fires = GameObject.FindGameObjectsWithTag("Fire");

        foreach (var fire in fires)
            fire.SetActive(false);  // Extinguishes every fire object on the scene.
    }

    // Probably set this ability on a timer.
    private void TriggerCivilAbility() {
        gameObject.layer = LayerMask.NameToLayer("HelmetPlayer");
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
