using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterSwitcher : MonoBehaviour
{
    private int activeCharacter = 1;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.C)) 
        {
            if (activeCharacter >= transform.childCount) 
                activeCharacter = 1;
            else 
                activeCharacter++;
        }
    }

    public string getActiveCharacter() 
    {
        return "Player (" + activeCharacter + ")";
    }
}
