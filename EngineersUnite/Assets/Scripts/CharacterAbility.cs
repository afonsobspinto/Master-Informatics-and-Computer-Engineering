using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterAbility : MonoBehaviour {

    private Material material;

    void Start() {
        this.material = gameObject.GetComponent<Renderer>().material;
        StudentColorOverlay();
    }

    void Update() {
        
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
