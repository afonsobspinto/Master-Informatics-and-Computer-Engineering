using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class LevelConfig : MonoBehaviour
{
    private int[] unlocked;
    private int selectedLevel;

    // Start is called before the first frame update
    void Start()
    {
        unlocked = new int[SceneManager.sceneCountInBuildSettings - 5];
        unlocked[0] = 1;
        selectedLevel = 0;
        for (int i = 1; i < SceneManager.sceneCountInBuildSettings - 6; i++)
            unlocked[i] = 0;
        foreach(Transform child in transform)
        {
            foreach(Transform levelButtons in child.transform)
            {
                levelButtons.gameObject.GetComponent<Button>().interactable = false;
                if (child.name == "Line1")
                    child.GetChild(0).gameObject.GetComponent<Button>().interactable = true;
            }
        }
        
        
     }

    // Update is called once per frame
    private void Update()
    {
        
    }
}
