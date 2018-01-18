#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;
uniform float red;
uniform float green;
uniform float blue;

void main() {

    vec4 color = texture2D(uSampler, vTextureCoord);
    float colorFactor = abs(cos(timeFactor));

	color.r = colorFactor * red + (1.0 - colorFactor) * color.r;
	color.g = colorFactor * green + (1.0 - colorFactor) * color.g;
	color.b = colorFactor * blue + (1.0 - colorFactor) * color.b;

	gl_FragColor = color;
}