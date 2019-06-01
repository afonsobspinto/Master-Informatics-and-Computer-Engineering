using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerSound : MonoBehaviour
{
    [FMODUnity.EventRef]
    public string selectsound;
    bool playerInWater;

    void Start()
    {
        InvokeRepeating("PlaySound", 0, 1f);
    }

    void Update()
    {
        if (this.gameObject.GetComponent<Transform>().position.y < 150)
            playerInWater = true;
        else 
            playerInWater = false;

    }

    void PlaySound()
    {
        if (playerInWater)
        {
            //FMODUnity.RuntimeManager.PlayOneShotAttached(selectsound, this.gameObject);
            playerInWater = false;
        }
    }

    private void OnDisable()
    {
        playerInWater = false;
    }
}
