using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PowerUp : Collectable
{
    [FMODUnity.EventRef]
    private Light directionalLight;
    private new GameObject camera;

    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");

        directionalLight = GameObject.Find("light_sun").GetComponent<Light>();
        camera = GameObject.Find("Camera");
    }

    public override void Interact()
    {
        PlayerController p = player.gameObject.GetComponent<PlayerController>();
        if (this.gameObject.tag == "Energy")
            p.increaseEnergy(25f);
        else if (this.gameObject.tag == "Health")
            p.gainHealth(50f);
        else if (this.gameObject.tag == "Food")
            p.gainHealth(25f);
        else if (this.gameObject.tag == "Speed")
            p.changeSpeed(1.5f);
        else if (this.gameObject.tag == "Trash")
            p.doDamage(25f);
        else if (this.gameObject.tag == "Particle"){
            p.increaseEnergy(50f);    
            directionalLight.color = Color.white;
            directionalLight.intensity = 0.5f;
        }
        
        Destroy(gameObject);
    }
}
