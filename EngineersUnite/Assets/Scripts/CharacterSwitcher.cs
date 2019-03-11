using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterSwitcher : MonoBehaviour
{
    private int activeCharacter = 1;
    private int pauseCount = 0;

    void Update() {
        if (Input.GetKeyDown(KeyCode.C)) {
            if (activeCharacter >= transform.childCount) 
                activeCharacter = 1;
            else 
                activeCharacter++;
        }
    }

    public void ModifyPauseCount(int count) {
        this.pauseCount += count;
    }

    public string getActiveCharacter() {
        return "Player (" + activeCharacter + ")";
    }

    public int GetPauseCount() {
        return this.pauseCount;
    }
}
