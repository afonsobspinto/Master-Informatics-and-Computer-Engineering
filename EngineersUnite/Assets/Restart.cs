using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Restart : MonoBehaviour
{
    // Update is called once per frame
    public void Update()
    {
        if (Input.GetKeyDown(KeyCode.R))
        {
            Debug.Log("RESTARTING SCENE");
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }
}
