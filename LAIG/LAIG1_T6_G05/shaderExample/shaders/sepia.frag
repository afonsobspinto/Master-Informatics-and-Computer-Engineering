#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	color.r = color.r * 0.393 + color.g *0.769 + color.b * 0.189;
	color.g = color.r * 0.349 + color.g *0.686 + color.b * 0.168;
	color.b = color.r * 0.272 + color.g *0.534 + color.b * 0.131;

	gl_FragColor = color;
}


