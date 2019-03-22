using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class DontDestroy : MonoBehaviour {
    private int deathCount = 0;
    private AudioSource audioSource;
    public AudioClip introMusic, levelMusic, endLevelMusic;
    private string prevPlayedLevel = "Level 1", lastPlayedLevel = "Level 1";
    private bool alreadyHighlighted = false;

    void Awake() {
        DontDestroyOnLoad(this.gameObject);
        this.audioSource = GameObject.Find("UITracker").GetComponent<AudioSource>();
        this.audioSource.volume = 0.5f;
    }

    void Update() {
        if (SceneManager.GetActiveScene().name == "MenuScene" && GameObject.Find("SceneMenu") != null && !this.alreadyHighlighted) {
            foreach (Transform child in GameObject.Find(this.prevPlayedLevel).transform) {
                if (child.gameObject.name == "Image") child.gameObject.SetActive(false);
            }

            foreach (Transform child in GameObject.Find(this.lastPlayedLevel).transform) {
                if (child.gameObject.name == "Image") child.gameObject.SetActive(true);
            }

            this.prevPlayedLevel = this.lastPlayedLevel;
            this.alreadyHighlighted = true;
        }

        if (SceneManager.GetActiveScene().name.StartsWith("Level")) {
            this.lastPlayedLevel = SceneManager.GetActiveScene().name;
            this.alreadyHighlighted = false;
        }

        if (SceneManager.GetActiveScene().name == "IntroSlide1") {
            audioSource.clip = this.introMusic;
        }
        else if (SceneManager.GetActiveScene().name == "MenuScene") {
            audioSource.clip = this.levelMusic;
        }
        else if (SceneManager.GetActiveScene().name == "Level 18") {
            audioSource.clip = this.endLevelMusic;
        }
        if (!audioSource.isPlaying) audioSource.Play();
    }

    public void incrementDeathCount() {
        this.deathCount++;
    }

    public string getDeathCount() {
        return this.deathCount.ToString();
    }
}
