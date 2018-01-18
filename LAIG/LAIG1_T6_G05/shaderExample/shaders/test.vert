attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform bool uUseTexture;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 vFinalColor;
varying vec2 vTextureCoord;

void main() {

    // Transformed Vertex position
    vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);

    // Transformed normal position
	vec3 N = normalize(vec3(uNMatrix * vec4(aVertexNormal, 1.0)));

    vec3 eyeVec = -vec3(vertex.xyz);
    vec3 E = normalize(eyeVec);

	//vFinalColor = lighting(vertex, E, N);
    vFinalColor = vec4(1,0,0,1); 

	gl_Position = uPMatrix * vertex;

    if (uUseTexture)
        vTextureCoord = aTextureCoord;

}

