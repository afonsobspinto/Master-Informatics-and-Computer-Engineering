using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TransitionButton : MenuButton
{
    [Header("Transition Screen")]
    public GameObject screen;

    public override void OnPressed()
    {
        screen.SetActive(!screen.activeSelf);
    }
}
