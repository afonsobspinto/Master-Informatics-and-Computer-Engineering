using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CharacterSwitcher : MonoBehaviour
{
    public Text pauseText;
    private int activePlayer = 0;
    private int pauseCount = 0;

    private List<string> playerTypes = new List<string>();

    void Start() {
        foreach (Transform player in transform)
            this.playerTypes.Add(player.name);
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.C)) {
            if (this.activePlayer >= transform.childCount - 1) 
                this.activePlayer = 0;
            else 
                this.activePlayer++;
        }
    }

    public void ModifyPauseCount(int count) {
        this.pauseCount += count;
        this.pauseText.text = this.pauseCount.ToString();
    }

    public string GetActivePlayer() {
        return this.playerTypes[this.activePlayer];
    }

    public int GetPauseCount() {
        return this.pauseCount;
    }
}
