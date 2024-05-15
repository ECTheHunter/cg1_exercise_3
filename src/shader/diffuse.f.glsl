// defines the precision
precision highp float;

// we have access to the same uniforms as in the vertex shader
// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 cameraPosition;
in vec3 vNormal;
in vec3 vLightDir;
uniform vec3 diffuseColor;
uniform float diffuseReflectance;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  
  float diffuseIntensity = max(dot(vNormal, vLightDir), 0.0);
  vec3 finalColor = diffuseColor * diffuseIntensity * diffuseReflectance / 255.0;

  //this colors all fragments (pixels) in the same color (RGBA)
  fragColor = vec4(finalColor, 1.0) ;
}
