using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ManageMusic : MonoBehaviour
{
    private GameObject player;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.Find("Player");
    }

    private void OnTriggerEnter(Collider other)
    {
        if(other.tag == "Player")
        {
            GameObject.Find("NormalMusic").SetActive(false);
            player.transform.Find("PredatorMusic").gameObject.SetActive(true);
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.tag == "Player")
        {
            GameObject.Find("PredatorMusic").SetActive(false);
            player.transform.Find("NormalMusic").gameObject.SetActive(true);
        }
    }
}
