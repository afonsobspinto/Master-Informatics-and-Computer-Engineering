#if GAIA_PRESENT && UNITY_EDITOR

using UnityEngine;
using System.Collections;
using System;
using System.Reflection;
using UnityEditor;

namespace Gaia.GX.TanukiDigital
{
    /// <summary>
    /// Suimono Setup
    /// </summary>
    public class Suimono_Gaia : MonoBehaviour
    {
        #region Generic informational methods

        /// <summary>
        /// Returns the publisher name if provided. 
        /// This will override the publisher name in the namespace ie Gaia.GX.PublisherName
        /// </summary>
        /// <returns>Publisher name</returns>
        public static string GetPublisherName()
        {
            return "Tanuki Digital";
        }

        /// <summary>
        /// Returns the package name if provided
        /// This will override the package name in the class name ie public class PackageName.
        /// </summary>
        /// <returns>Package name</returns>
        public static string GetPackageName()
        {
            return "Suimono";
        }

        #endregion

        #region Methods exposed by Gaia as buttons must be prefixed with GX_

        public static void GX_About()
        {
            EditorUtility.DisplayDialog("About Suimono", "Suimono is an interactive water system that brings advanced water rendering features to Unity 5.", "OK");
        }

        /// <summary>
        /// Add Suimono to the scene
        /// </summary>
        public static void GX_AddSuimono()
        {

            //Add the Suimono objects to the scene


            //Get scene info
            GaiaSceneInfo sceneInfo = GaiaSceneInfo.GetSceneInfo();


            //INSTALL Suimono Module
            GameObject suimonoPrefab = Gaia.Utils.GetAssetPrefab("SUIMONO_Module");
            if (suimonoPrefab == null)
            {
                Debug.LogWarning("Unable to locate SuimonoModule - Aborting!");
                return;
            }

            //See if we can locate it
            if (GameObject.Find("SUIMONO_Module") != null)
            {
                Debug.LogWarning("Suimono Module already in scene - Aborting!");
                return;
            }

            //See if we can create it
            GameObject suimonoObj = Instantiate(suimonoPrefab);
            if (suimonoObj == null)
            {
                Debug.LogWarning("Unable to create Suimono Module object - Aborting!");
                return;
            }
            else
            {
                suimonoObj.name = "SUIMONO_Module";
            }




            //INSTALL Suimono Surface
            GameObject surfacePrefab = Gaia.Utils.GetAssetPrefab("SUIMONO_Surface");
            if (suimonoPrefab == null)
            {
                Debug.LogWarning("Unable to locate SuimonoSurface - Aborting!");
                return;
            }

            //See if we can locate it
            if (GameObject.Find("SUIMONO_Surface") != null)
            {
                Debug.LogWarning("Suimono Surface already in scene - Aborting!");
                return;
            }

            //See if we can create it
            GameObject surfaceObj = Instantiate(surfacePrefab);
            if (surfaceObj == null)
            {
                Debug.LogWarning("Unable to create Suimono Surface object - Aborting!");
                return;
            }
            else
            {
                //set surface
                surfaceObj.name = "SUIMONO_Surface";

                //set surface position
                surfaceObj.transform.position = new Vector3(0.0f,0.0f,0.0f);

                //Set Water Y-Height and expansion
                if (sceneInfo != null)
                {
                    surfaceObj.transform.position = new Vector3(sceneInfo.m_centrePointOnTerrain.x, sceneInfo.m_seaLevel, sceneInfo.m_centrePointOnTerrain.z);
                    surfaceObj.transform.localScale = sceneInfo.m_sceneBounds.extents*1;
                }


                //set surface-specific settings
                var surfaceObject = surfaceObj.GetComponent<Suimono.Core.SuimonoObject>();
                if (surfaceObject != null)
                {
                    //set surface as infinite ocean
                    surfaceObject.typeIndex = 0;
                }

            }




            //See if we can configure Module
            //var suimonoModule = suimonoObj.GetComponent<Suimono.Core.SuimonoModule>();
            var suimonoModule = (Suimono.Core.SuimonoModule) FindObjectOfType(typeof(Suimono.Core.SuimonoModule));
            if (suimonoModule != null)
            {

                //Set the camera
                Camera camera = Camera.main;
                if (camera == null)
                {
                    camera = FindObjectOfType<Camera>();
                }
                if (camera != null)
                {
                    suimonoModule.manualCamera = camera.transform;
                }


                //Add scene directional light if it exists
                Light lightObj = GameObject.Find("Directional Light").GetComponent<Light>();

                if (lightObj != null){
                    suimonoModule.setLight = lightObj;
                } else {
                    Debug.Log("Suimono: Could not find scene directional light through automatic detection, please set manually instead.");
                }


            }

        }




        #endregion
    }
}

#endif