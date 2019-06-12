using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Jellyfish : MonoBehaviour
{
    GameObject player;
    public float damageEnter = 20;
    public float damageStay = 0.02f;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");
        AnimateRandomly();
    }
    
    private void OnTriggerEnter(Collider c)
    {
        if (c.gameObject.tag == "Player")
        {
            //decrease health using player object
            this.player.GetComponent<PlayerController>().doDamage(this.damageEnter);
        }
    }

    private void OnTriggerStay(Collider c)
    {
        if (c.gameObject.tag == "Player")
        {
            //decrease health using player object
            this.player.GetComponent<PlayerController>().doDamage(this.damageStay);
        }
    }

    void AnimateRandomly()
    {
        GetComponent<BlendShape>().blendSpeed = Random.Range(10f, 40f);
    }
}
