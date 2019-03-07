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
        
    }

    private void OnTriggerStay2D(Collider2D other) {
        if (!Input.GetKeyDown(KeyCode.X)) return;

        if (other.gameObject.CompareTag("Computer") && name == "Player (1)") {
            TriggerInformaticsAbility();
        }
            
    }

    private void TriggerInformaticsAbility() {
        this.computerHandler.FlipSprite();
        GameObject[] fires = GameObject.FindGameObjectsWithTag("Fire");

        foreach (var fire in fires)
            fire.SetActive(false);  // Extinguishes every fire object on the scene.
    }

    private void StudentColorOverlay() {
        if (name == "Player (1)") 
            this.material.SetColor("_Color", Color.cyan);
        else if (name == "Player (2)")
            this.material.SetColor("_Color", Color.red);
        else if (name == "Player (3)")
            this.material.SetColor("_Color", Color.yellow);
    }

}
