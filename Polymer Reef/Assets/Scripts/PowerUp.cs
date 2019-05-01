using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PowerUp : Collectable
{
    [FMODUnity.EventRef]
    public string selectsound;
    FMOD.Studio.EventInstance soundevent;

    void Start()
    {
        soundevent = FMODUnity.RuntimeManager.CreateInstance(selectsound);
    }

    public override void Interact()
    {
        Debug.Log("Interaction detected\nPlease implement interact method");
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
