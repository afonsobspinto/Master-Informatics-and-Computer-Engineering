using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Jellyfish : MonoBehaviour
{
    public GameObject player = null;
    public float damage = 2;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnTriggerEnter(Collider c)
    {
        if (c.gameObject == this.player)
        {
            Debug.Log("Touching Player");
            //decrease health using player object
            this.player.GetComponent<PlayerController>().changeHealth(-this.damage);
        }
    }
}