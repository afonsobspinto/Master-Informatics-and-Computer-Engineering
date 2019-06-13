using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveVertically : MonoBehaviour
{
    public float speed = 3f;
    public float lowerValue = 10f;
    public float higherValue = 20f;

    private bool movement = true;

    // Update is called once per frame
    void Update()
    {
        float yPos = transform.position.y;
        if (yPos > higherValue)
            movement = true;
        else if (yPos < lowerValue)
            movement = false;

        if (movement)
            transform.Translate(Vector3.down * Random.Range(speed -1, speed+1) * Time.deltaTime, Space.World);
        else
            transform.Translate(Vector3.up * Random.Range(speed - 1, speed + 1) * Time.deltaTime, Space.World);

    }
}
