using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class DontDestroy : MonoBehaviour {
    private int deathCount = 0;
    private AudioSource audioSource;
    public AudioClip introMusic, levelMusic, endLevelMusic;

    void Awake() {
        DontDestroyOnLoad(this.gameObject);
        this.audioSource = GameObject.Find("BackgroundMusic").GetComponent<AudioSource>();
    }

    void Update() {
        if (SceneManager.GetActiveScene().name == "IntroSlide1") {
            audioSource.clip = this.introMusic;
        }
        else if (SceneManager.GetActiveScene().name == "MenuScene") {
            audioSource.clip = this.levelMusic;
        }
        else if (SceneManager.GetActiveScene().name == "Level 99") {
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
