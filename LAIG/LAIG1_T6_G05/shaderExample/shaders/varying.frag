#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

void main() {
	if (coords.x > 0.0)
		gl_FragColor =  normal;
	else
	{
		gl_FragColor.rgb = abs(coords.xyz)/3.0;
		gl_FragColor.a = 1.0;
	}
}