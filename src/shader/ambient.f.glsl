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


uniform vec3 ambientColor;        
uniform float ambientReflectance; 

out vec4 fragColor;

void main()
{

    // Ambient light contribution
    vec3 ambient = ambientColor * ambientReflectance / 255.0;
    // Output the final color
    fragColor = vec4(ambient, 1.0);
}