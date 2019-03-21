﻿using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour
{
    // Runs Menu Scene
    public void PlayMenuScene()
    {
        SceneManager.LoadScene("MenuScene");
    }

    // Runs Main Scene
    public void PlayMainScene()
    {
       SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    // Runs Informatic Scene
    public void PlayInfScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 2);
    }

    // Runs Main Scene
    public void PlayChemScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 3);
    }

    // Runs Main Scene
    public void PlayCivilScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 4);
    }

    // Quits the app
    public void QuitGame()
    {
        Debug.Log("User has exited the game");
        Application.Quit();
    }
}
