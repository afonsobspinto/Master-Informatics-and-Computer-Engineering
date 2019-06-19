using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RandomizeSound : MonoBehaviour
{
    [FMODUnity.EventRef]
    public string selectSound;
    FMOD.Studio.EventInstance soundevent;
    private IEnumerator coroutine;
    [Header("Select time range")]
    public float lowerValue = 10f;
    public float upperValue = 20f;

    void Start()
    {
        soundevent = FMODUnity.RuntimeManager.CreateInstance(selectSound);
        soundevent.set3DAttributes(FMODUnity.RuntimeUtils.To3DAttributes(this.gameObject.GetComponent<Transform>()));
        coroutine = PlaySound(Random.Range(lowerValue, upperValue));
        StartCoroutine(coroutine);
    }

    private IEnumerator PlaySound(float waitTime)
    {
        while (true)
        {
            yield return new WaitForSeconds(waitTime);
            FMOD.Studio.PLAYBACK_STATE fmodPbState;
            soundevent.getPlaybackState(out fmodPbState);
            if (fmodPbState != FMOD.Studio.PLAYBACK_STATE.PLAYING)
            {
                soundevent.start();
            }
        }
    }
}
