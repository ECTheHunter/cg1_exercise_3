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
out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec3 color = normalize(vNormal) * 0.5 + 0.5;
  //this colors all fragments (pixels) in the same color (RGBA)
  fragColor = vec4(color, 1.0) ;
}
