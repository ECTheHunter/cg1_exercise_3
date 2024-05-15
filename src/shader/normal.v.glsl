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
out vec3 vNormal;


// main function gets executed for every vertex
void main()
{
    vNormal = normalize(normalMatrix * normal);

    vec4 vPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    gl_Position = vPosition;
}