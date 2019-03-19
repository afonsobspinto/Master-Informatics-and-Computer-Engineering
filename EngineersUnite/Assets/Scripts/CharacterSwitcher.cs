using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CharacterSwitcher : MonoBehaviour
{
    public Text pauseText;
    private int activePlayer = 0;
    private int pauseCount = 0;

    private List<GameObject> playerTypes = new List<GameObject>();

    void Start() {
        foreach (Transform player in transform)
            this.playerTypes.Add(player.gameObject);

        StartCoroutine(ShowCharacterSwitch());
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.C)) {
            GameObject currentPlayer = this.playerTypes[this.activePlayer];
            currentPlayer.gameObject.GetComponent<PlayerMovement>().horizontalMove = 0;
            currentPlayer.gameObject.GetComponent<Animator>().SetFloat("Speed", 0);
            
            if (this.activePlayer >= transform.childCount - 1) 
                this.activePlayer = 0;
            else {
                this.activePlayer++;
            }

            StartCoroutine(ShowCharacterSwitch());
        }
    }

    private IEnumerator ShowCharacterSwitch() {
        GameObject currPlayer = this.playerTypes[this.activePlayer];

        foreach (Transform player in transform)
            DisplaySelection(player.gameObject, false);

        DisplaySelection(currPlayer, true);
        yield return new WaitForSeconds(1);
        DisplaySelection(currPlayer, false);
    }

    public void DisplaySelection(GameObject obj, bool isActive) {
        obj.GetComponentsInChildren<SpriteRenderer>()[1].enabled = isActive;
    }

    public void ModifyPauseCount(int count) {
        this.pauseCount += count;
        this.pauseText.text = this.pauseCount.ToString();
    }

    public string GetActivePlayer() {
        return this.playerTypes[this.activePlayer].name;
    }

    public int GetPauseCount() {
        return this.pauseCount;
    }
}
