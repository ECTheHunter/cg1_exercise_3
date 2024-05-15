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
in vec3 vView;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
    float dotProduct = dot(vView, vNormal);

    float thresholds[4];
thresholds[0] = 0.25;
thresholds[1] = 0.5;
thresholds[2] = 0.75;


vec3 finalColor;
if (dotProduct < thresholds[0]) {
    finalColor = vec3(0, 1, 0) * 0.25;
} else if (dotProduct < thresholds[1]) {
    finalColor = vec3(0, 1, 0) * 0.5;
} else if (dotProduct < thresholds[2]) {
    finalColor = vec3(0, 1, 0) * 0.75;
} else {
    finalColor = vec3(0, 1, 0);
}


fragColor = vec4(finalColor, 1.0);

}
