using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FallScript : MonoBehaviour
{
    public float fallSpeed = 3.0f;      //How fast should the object fall
    public float height = 1.0f;      //How height should the object stay
    [FMODUnity.EventRef]
    public string selectSound;
    FMOD.Studio.EventInstance soundevent;
    private bool hasFalled = false;

    void Start()
    {
        soundevent = FMODUnity.RuntimeManager.CreateInstance(selectSound);
        soundevent.set3DAttributes(FMODUnity.RuntimeUtils.To3DAttributes(this.gameObject.GetComponent<Transform>()));
    }

    // Update is called once per frame
    void Update()
    {
        if(transform.position[1] > height)
            transform.Translate(Vector3.down * fallSpeed * Time.deltaTime, Space.World);
        if(!hasFalled && !(transform.position[1] > height))
        {
            hasFalled = true;
            FMOD.Studio.PLAYBACK_STATE fmodPbState;
            soundevent.getPlaybackState(out fmodPbState);
            if (fmodPbState != FMOD.Studio.PLAYBACK_STATE.PLAYING)
            {
                soundevent.start();
            }
        }
    }
}
