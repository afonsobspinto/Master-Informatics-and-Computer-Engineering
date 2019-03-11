using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CharacterSwitcher : MonoBehaviour
{
    public Text pauseText;
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
        this.pauseText.text = this.pauseCount.ToString();
    }

    public string getActiveCharacter() {
        return "Player (" + activeCharacter + ")";
    }

    public int GetPauseCount() {
        return this.pauseCount;
    }
}
