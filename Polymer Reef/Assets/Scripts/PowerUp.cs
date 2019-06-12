using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PowerUp : Collectable
{
    [FMODUnity.EventRef]
    //public string selectsound;
    //FMOD.Studio.EventInstance soundevent;
    private Light directionalLight;
    private new GameObject camera;

    void Start()
    {
        //soundevent = FMODUnity.RuntimeManager.CreateInstance(selectsound);
        //soundevent.set3DAttributes(FMODUnity.RuntimeUtils.To3DAttributes(this.gameObject.GetComponent<Transform>()));
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
        {
            p.gainHealth(25f);
            p.increaseEnergy(25f);
        }
        else if (this.gameObject.tag == "Speed")
            p.changeSpeed(1.5f);
        else if (this.gameObject.tag == "Trash")
            p.doDamage(25f);
        else if (this.gameObject.tag == "Particle"){
            p.increaseEnergy(50f);    
            directionalLight.color = Color.white;
            directionalLight.intensity = 0.5f;
            //camera.GetComponent<FogEffect>()._fogColor = Color.blue;
            //camera.GetComponent<FogEffect>()._depthStart = 30f;
            //camera.GetComponent<FogEffect>()._depthDistance = 450f;
        }

        //FMODUnity.RuntimeManager.AttachInstanceToGameObject(soundevent, GetComponent<Transform>(), GetComponent<Rigidbody>());
        //PlaySound();
        Destroy(gameObject);
    }

   /* void PlaySound()
    {
        FMOD.Studio.PLAYBACK_STATE fmodPbState;
        soundevent.getPlaybackState(out fmodPbState);
        if(fmodPbState != FMOD.Studio.PLAYBACK_STATE.PLAYING)
            soundevent.start();
    }*/
}
