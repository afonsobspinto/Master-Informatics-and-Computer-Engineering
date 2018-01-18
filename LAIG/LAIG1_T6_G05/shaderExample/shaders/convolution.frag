#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
 

void main() {
	vec4 colors[9];
		
	vec4 color = texture2D(uSampler, vTextureCoord);
//	vec2 s = textureSize(uSampler,0);  //not working
//	float offset = (1.0/s[0]);  
	float offset = (2./512.);  //probably pass this value as an argument:   Distance in pixels / length of pixels
	
	//should be an array but it is not supported vec4 [9]
	colors[0] = texture2D(uSampler, vec2(vTextureCoord[0]- offset, 	vTextureCoord[1]- offset));
	colors[1] = texture2D(uSampler, vec2(vTextureCoord[0], 			vTextureCoord[1]- offset));
	colors[2] = texture2D(uSampler, vec2(vTextureCoord[0]+ offset, 	vTextureCoord[1]- offset));
	colors[3] = texture2D(uSampler, vec2(vTextureCoord[0]- offset, 	vTextureCoord[1]));
	colors[4] = texture2D(uSampler, vec2(vTextureCoord[0], 			vTextureCoord[1]));
	colors[5] = texture2D(uSampler, vec2(vTextureCoord[0]+ offset, 	vTextureCoord[1]));
	colors[6] = texture2D(uSampler, vec2(vTextureCoord[0]- offset, 	vTextureCoord[1]+ offset));
	colors[7] = texture2D(uSampler, vec2(vTextureCoord[0], 			vTextureCoord[1]+ offset));
	colors[8] = texture2D(uSampler, vec2(vTextureCoord[0]+ offset, 	vTextureCoord[1]+ offset));

	//color = (color+colorA+colorS) / vec4(3.0,3.0,3.0,3.0);
	
	//color = colorA*vec4(-1./8.,-1./8.,-1./8.,1)+color+colorS*vec4(-1./8.,-1./8.,-1./8.,1)/ vec4(3.0,3.0,3.0,3.0);
	
	vec4 mean = vec4(9.0,9.0,9.0,9.0);
	vec4 den = vec4(0.1,0.1,0.1,1);
	
	//Edge Detection
	vec4 v = vec4(-1./8.,-1./8.,-1./8.,1);
	color = (colors[0] +
			 colors[1] +
			 colors[2] +
			 colors[3] +
			 
			 colors[5] +
			 colors[6] +
			 colors[7] +
			 colors[8])*v +
			 colors[4]
			 ;
	

	//Blur
/*	vec4 v = vec4(1.,1.,1.,1.);
	color = (color0*v +
			color1*v +
			color2*v +
			color3*v +
			color4*v +
			color5*v +
			color6*v +
			color7*v +
			color8*v)/mean ;
	*/
	
	gl_FragColor = color;
}


