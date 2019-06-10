using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaterQuality : MonoBehaviour
{

    public Vector3 borderArea { get { return m_BorderArea; } }

    [SerializeField]
    private Color m_SpawnColor = new Color(0.000f, 0.000f, 0.000f, 0.000f);
    [SerializeField]
    private Vector3 m_BorderArea = new Vector3(20f, 5f, 20f);

    private BoxCollider boxCollider;

    [SerializeField]
    private float quality; // between 0% and 100%

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

    private void OnTriggerStay(Collider other)
    {
        if (other.gameObject.name == "Player" && PlayerController.health.getCurrentValue() > 0)
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
