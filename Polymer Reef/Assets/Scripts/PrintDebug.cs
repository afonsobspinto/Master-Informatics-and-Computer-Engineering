using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PrintDebug : MonoBehaviour
{
    private Queue<string> logHistory;
    private string log;

    [Header("PrintDebug Properties")]
    [SerializeField]
    private bool attachToDebug = true;
    [SerializeField]
    private int maxMessagesOnScreen = 20;

    void OnEnable()
    {
        if (attachToDebug)
        {
            Application.logMessageReceived += Log;
        }
    }

    void OnDisable()
    {
        if (attachToDebug)
        {
            Application.logMessageReceived -= Log;
        }
    }

    void Start()
    {
        logHistory = new Queue<string>(maxMessagesOnScreen);
    }

    void OnGUI()
    {
        GUILayout.Label(log);
    }

    void Log(string message, string trace = "", LogType type = LogType.Log)
    {
        // Create log
        string newMessage = "\n [" + type + "] : " + message;
        if (type == LogType.Exception)
        {
            newMessage = "\n" + trace;
        }

        // Cleanup history
        if (logHistory.Count == maxMessagesOnScreen)
        {
            string oldMessage = logHistory.Dequeue();
            log = log.Remove(log.Length - oldMessage.Length);
        }

        // Append new log
        logHistory.Enqueue(newMessage);
        log = newMessage + log;
    }
}
