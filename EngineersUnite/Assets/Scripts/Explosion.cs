using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Explosion : MonoBehaviour
{
    public float explosion_rate = 10f;
    public float current_radius = 10f;
    public float explosion = 20f;

    bool exploded = false;
    Vector3 explosionPos;
    Collider2D[] colliders;

    // Start is called before the first frame update
    void Start()
    {
        explosionPos = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.E))
        {
            Debug.Log("Explode");
            var colliders = Physics2D.OverlapCircleAll(explosionPos, current_radius, 1 << LayerMask.NameToLayer("Player"));
            for (var i = 0; i < colliders.Length; i++)
            {
                Vector2 target = colliders[i].gameObject.transform.position;
                Vector2 pos = gameObject.transform.position;

                Vector2 direction = explosion * (target - pos); 
                Debug.Log(colliders[i].name);
                colliders[i].gameObject.GetComponent<Rigidbody2D>().AddForce(new Vector2(direction.x * 8f, direction.y * 8f));
            }
            exploded = true;
        }
    }
}

    