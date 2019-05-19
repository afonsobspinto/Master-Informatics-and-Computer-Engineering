using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PowerUp : Collectable
{
    [FMODUnity.EventRef]
    public string selectsound;
    FMOD.Studio.EventInstance soundevent;
    private GameObject player;

    void Start()
    {
        soundevent = FMODUnity.RuntimeManager.CreateInstance(selectsound);
        soundevent.set3DAttributes(FMODUnity.RuntimeUtils.To3DAttributes(this.gameObject.GetComponent<Transform>()));
        player = GameObject.Find("Player");
    }

    public override void Interact()
    {
        PlayerController p = player.gameObject.GetComponent<PlayerController>();
        p.changeEnergy(50f);

        FMODUnity.RuntimeManager.AttachInstanceToGameObject(soundevent, GetComponent<Transform>(), GetComponent<Rigidbody>());
        PlaySound();
        Destroy(gameObject);
    }

    void PlaySound()
    {
        FMOD.Studio.PLAYBACK_STATE fmodPbState;
        soundevent.getPlaybackState(out fmodPbState);
        if(fmodPbState != FMOD.Studio.PLAYBACK_STATE.PLAYING)
            soundevent.start();
    }
}
