// defines the precision
precision highp float;

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

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

uniform float lightX;
uniform float lightY;
uniform float lightZ;


out vec3 vNormal;
out vec3 vLightDir;
out vec3 vViewDir;

// main function gets executed for every vertex
void main()
{

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);

    vLightDir = normalize(vec3(lightX, lightY, lightZ) - viewPosition.xyz);
    vViewDir = normalize(cameraPosition - viewPosition.xyz);

    

    gl_Position = projectionMatrix * viewPosition;
}
