using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class DontDestroy : MonoBehaviour {
    private int deathCount = 0;

    void Awake() {
        DontDestroyOnLoad(this.gameObject);
    }

    public void incrementDeathCount() {
        this.deathCount++;
    }

    public string getDeathCount() {
        return this.deathCount.ToString();
    }
}
