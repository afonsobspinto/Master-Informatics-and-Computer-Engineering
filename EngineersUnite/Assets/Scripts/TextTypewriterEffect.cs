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

    private bool hasScrolled = false, hasCountdown = false;
    private Image m_Image;

    void Start() {
        FadeInSlideImage(GameObject.Find("SlideImage").GetComponent<Image>());
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
        else if (this.hasScrolled && !this.hasCountdown) {
            StartCoroutine(StartCountdown());
            this.hasCountdown = true;
        }
    }

    private void FadeInSlideImage(Image m_Image) {
        m_Image.canvasRenderer.SetAlpha(0.0f);
        m_Image.CrossFadeAlpha(1, 3.0f, false);
    }

    private IEnumerator StartCountdown() {
        yield return new WaitForSeconds(1);
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    private IEnumerator ShowText() {
        for (int i = 0; i <= full.text.Length; i++) {
            curr = full.text.Substring(0, i);
            this.GetComponent<Text>().text = curr;

            if (curr.Length > 0 && curr[i-1] == '.') yield return new WaitForSeconds(speed * 10);
            else yield return new WaitForSeconds(speed);
        }
        this.hasScrolled = true;
    }
}
