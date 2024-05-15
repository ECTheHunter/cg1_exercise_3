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

uniform vec3 ambientColor;        
uniform float ambientReflectance; 
uniform vec3 diffuseColor;
uniform float diffuseReflectance;
uniform vec3 specularColor;
uniform float specularReflectance;
uniform float shininess;

out vec3 vColor;

// main function gets executed for every vertex
void main()
{

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 vNormal = normalize(normalMatrix * normal);

    vec3 vLightDir = normalize(vec3(lightX, lightY, lightZ) - viewPosition.xyz);
    vec3 vViewDir = normalize(cameraPosition - viewPosition.xyz);
     vec3 reflectDir = reflect(-vLightDir, vNormal);
    float specularIntensity = pow(max(dot(reflectDir, vViewDir), 0.0), shininess);
    float diffuseIntensity = max(dot(vNormal, vLightDir), 0.0);
     vec3 ambient = ambientColor * ambientReflectance;
  
vec3 finalcolor = diffuseIntensity * diffuseColor * diffuseReflectance  / 255.0 + specularIntensity * specularReflectance * specularColor  / 255.0 + ambient  / 255.0; 
  vColor = finalcolor;
    

    gl_Position = projectionMatrix * viewPosition;
}
