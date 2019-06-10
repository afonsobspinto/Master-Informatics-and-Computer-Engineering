using UnityEngine;
using System.Collections;

public class BlendShape : MonoBehaviour
{

    int blendShapeCount;
    SkinnedMeshRenderer skinnedMeshRenderer;
    Mesh skinnedMesh;
    float blend = 0f;
    public float blendSpeed = 10f;
    int curr = 0;
    bool reverse = false;

    void Awake()
    {
        skinnedMeshRenderer = GetComponent<SkinnedMeshRenderer>();
        skinnedMesh = GetComponent<SkinnedMeshRenderer>().sharedMesh;
    }

    void Start()
    {
        blendShapeCount = skinnedMesh.blendShapeCount;
    }

    void Update()
    {
        if (curr == -1)
        {
            reverse = false;
            curr = 0;
            blend = 0;
        }
        if(!reverse)
        {
            if (curr < blendShapeCount)
                Blend();
            else
                reverse = true;
        } else
        {
            if (curr >= 0)
                ReverseBlend();
            else
                reverse = false;
        }
    }

    void Blend()
    {
        if (skinnedMeshRenderer.GetBlendShapeWeight(curr) < 100f)
        {
            skinnedMeshRenderer.SetBlendShapeWeight(curr, blend);
            blend += blendSpeed;
        }
        else
        {
            curr++;
            blend = 0;
        }
    }

    void ReverseBlend()
    {
        if (skinnedMeshRenderer.GetBlendShapeWeight(curr) > 0f)
        {
            skinnedMeshRenderer.SetBlendShapeWeight(curr, blend);
            blend -= blendSpeed;
        }
        else
        {
            curr--;
            blend = 100;
        }
    }
}