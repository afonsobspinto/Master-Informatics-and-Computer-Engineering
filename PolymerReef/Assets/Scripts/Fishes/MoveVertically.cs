using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveVertically : MonoBehaviour
{
    public float speed = 3f;
    public float lowerValue = 10f;
    public float higherValue = 20f;

    private bool movement = true;

    private void Start()
    {
        movement = (Random.value > 0.5f);
    }

    // Update is called once per frame
    void Update()
    {
        float yPos = transform.position.y;
        if (yPos > higherValue)
            movement = true;
        else if (yPos < lowerValue)
            movement = false;

        if (movement)
            transform.Translate(Vector3.down * 1.5f*Random.Range(speed -2, speed+2) * Time.deltaTime, Space.World);
        else
            transform.Translate(Vector3.up * 1.5f*Random.Range(speed - 2, speed + 2) * Time.deltaTime, Space.World);

    }
}
