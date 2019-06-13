using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FallScript : MonoBehaviour
{
    public float fallSpeed = 10.0f;      //How fast should the object fall
    public float height = 1.0f;      //How height should the object stay

    // Update is called once per frame
    void Update()
    {
        if(transform.position[1] > height)
            transform.Translate(Vector3.down * fallSpeed * Time.deltaTime, Space.World);
    }
}
