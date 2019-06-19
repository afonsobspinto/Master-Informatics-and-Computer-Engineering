using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExitButton : MenuButton
{
    public override void OnPressed()
    {
        // TODO associate with modal
#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#endif
        Application.Quit();
    }
}
