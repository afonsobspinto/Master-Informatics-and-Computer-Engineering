using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class TextTypewriterEffect : MonoBehaviour {
    public float speed = 0.1f;
    public TextAsset full;
    private string curr = "";

    private IEnumerator scroller;

    private bool hasScrolled = false;

    void Start() {
        this.scroller = ShowText();
        StartCoroutine(this.scroller);
    }

    void Update() {
        if (Input.GetKeyDown(KeyCode.X) && !this.hasScrolled) {
            StopCoroutine(this.scroller);
            this.GetComponent<Text>().text = full.text;
            this.hasScrolled = true;
        }
        else if (Input.GetKeyDown(KeyCode.X) && this.hasScrolled) {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
        }
    }

    private IEnumerator ShowText() {
        for (int i = 0; i <= full.text.Length; i++) {
            curr = full.text.Substring(0, i);
            this.GetComponent<Text>().text = curr;
            yield return new WaitForSeconds(speed);
        }
        this.hasScrolled = true;
    }
}
