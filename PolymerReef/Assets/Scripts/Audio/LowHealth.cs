using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LowHealth : MonoBehaviour
{
    [FMODUnity.EventRef]
    public string selectSound;
    FMOD.Studio.EventInstance soundevent;
    private IEnumerator coroutine;
    private float waitTime = 1f;
    public bool lowHealth = false;

    void Start()
    {
        soundevent = FMODUnity.RuntimeManager.CreateInstance(selectSound);
        soundevent.set3DAttributes(FMODUnity.RuntimeUtils.To3DAttributes(this.gameObject.GetComponent<Transform>()));
        coroutine = PlaySound();
        StartCoroutine(coroutine);
    }

    private IEnumerator PlaySound()
    {
        while (true)
        {
            if (lowHealth)
            {
                yield return new WaitForSeconds(waitTime);
                FMOD.Studio.PLAYBACK_STATE fmodPbState;
                soundevent.getPlaybackState(out fmodPbState);
                if (fmodPbState != FMOD.Studio.PLAYBACK_STATE.PLAYING)
                {
                    soundevent.start();
                }
            }
            else
                yield return new WaitForSeconds(waitTime);
        }
    }
}
