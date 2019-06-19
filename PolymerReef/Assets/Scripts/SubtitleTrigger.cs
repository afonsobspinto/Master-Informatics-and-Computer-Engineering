using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SubtitleTrigger : MonoBehaviour
{
    public bool passed = false;

    private void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Player")
            passed = true;
    }
}
