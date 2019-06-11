using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AIManagement : MonoBehaviour
{
    public float speed;
    public GameObject[] waypoints;

    void Start()
    {
        List<GameObject> childrenList = new List<GameObject>();
        //get all transforms in the hierarchy
        Transform[] children = GetComponentsInChildren<Transform>(true);
        //go through the transform array and only add their gameObjects to the list if they are not the parent (this) gameObject.
        for (int i = 0; i < children.Length; i++)
        {
            Transform child = children[i];
            if (child != transform)
            {
                childrenList.Add(child.gameObject);
            }
        }
        //go thorugh the list and add the component.
        for (int i = 0; i < childrenList.Count; i++)
        {
            FishMove fishMove = childrenList[i].AddComponent<FishMove>();
            fishMove.speed = speed;
            fishMove.waypoints = waypoints;
        }
    }
}
