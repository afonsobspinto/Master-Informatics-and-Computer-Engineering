using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FallScript : MonoBehaviour
{
    public float fallSpeed = 3.0f;      //How fast should the object fall
    public float height = 1.0f;      //How height should the object stay
    private bool hasFalled = false;
    private bool close = false;
    Vector3 playerPos, trashPos;

    private void Start()
    {
        Vector3 origPlayerPos = GameObject.Find("Player").transform.position;
        playerPos = new Vector3(origPlayerPos.x, 0, origPlayerPos.z);
        trashPos = new Vector3(gameObject.transform.position.x, 0, gameObject.transform.position.z);
    }
    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(playerPos, trashPos) < 30f)
        {
            close = true;
        }
        if (transform.position[1] > height && close)
        {
            transform.Translate(Vector3.down * fallSpeed * Time.deltaTime, Space.World);
        }
        if(!hasFalled && !(transform.position[1] > height))
        {
            hasFalled = true;
            GameObject.Find("Audio").transform.Find("Garbage").gameObject.SetActive(true);
            GameObject.Find("Audio").transform.Find("Garbage").gameObject.SetActive(false);
        }
    }
}
