using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaterQuality : MonoBehaviour
{

    public Vector3 borderArea { get { return m_BorderArea; } }

    [SerializeField]
    private Color m_SpawnColor = new Color(0.000f, 0.000f, 0.000f, 0.000f);
    [SerializeField]
    private Vector3 m_BorderArea = new Vector3(1f, 1f, 1f);

    private BoxCollider boxCollider;

    [Range(0f, 100f)]
    [SerializeField]
    private float quality = 0; // between 0% and 100%

    // Start is called before the first frame update
    void Start()
    {
        boxCollider = this.gameObject.GetComponent<BoxCollider>();
    }

    // Update is called once per frame
    void Update()
    {
        boxCollider.size = m_BorderArea;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.name == "Player")
        {
            PlayerController p = other.gameObject.GetComponent<PlayerController>();
            p.setWaterQuality(quality);
        }
    }

    // Show the gizmos in colour
    void OnDrawGizmosSelected()
    {
        Gizmos.color = m_SpawnColor;
        Gizmos.DrawCube(transform.position, borderArea);
    }
}
