using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIManagement : MonoBehaviour
{

    bool hasPlayerPassed = false;

    private void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Player")
        {
            hasPlayerPassed = true;
            for(int i =0; i < transform.parent.childCount; i++) {
                if (transform.parent.GetChild(i).gameObject.tag == "FishGroup")
                    transform.parent.GetChild(i).gameObject.SetActive(true);
            }
        }
    }

    public bool HasPlayerPassed()
    {
        return hasPlayerPassed;
    }
}
