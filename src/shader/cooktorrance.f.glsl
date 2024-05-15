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
in vec3 vViewDir;
in vec3 vLightDir;
uniform vec3 diffuseColor;        
uniform float diffuseReflectance; 
uniform vec3 specularColor;     
uniform float roughness;       
uniform float lightintensity;   
const float PI = 3.14159265359;
out vec4 fragColor;
float GGX(float NdotH, float roughness) {
    float a2 = roughness * roughness;
    float d = (NdotH * a2 - NdotH) * NdotH + 1.0;
    return a2 / (PI * d * d);
}
float SmithG(float NdotV, float NdotL, float roughness) {
    float k = (roughness * roughness) / 2.0;
    float G_V = NdotV / (NdotV * (1.0 - k) + k);
    float G_L = NdotL / (NdotL * (1.0 - k) + k);
    return G_V * G_L;
}
vec3 FresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

// main function gets executed for every pixel
void main()
{
    vec3 H = normalize(vViewDir + vLightDir);
float NdotL = max(dot(vNormal, vLightDir), 0.0);
float NdotV = max(dot(vNormal, vViewDir), 0.0);
float NdotH = max(dot(vNormal, H), 0.0);


float D = GGX(NdotH,roughness);


float G = SmithG(NdotV,NdotL,  roughness);


vec3 F = FresnelSchlick(max(dot(vViewDir, H), 0.0), specularColor);


vec3 specular = D * G * F / (4.0 * NdotL * NdotV);
     vec3 diffuse = diffuseColor * diffuseReflectance / PI;
     vec3 finalColor = diffuse / 255.0 + specular * lightintensity / 255.0;
  //this colors all fragments (pixels) in the same color (RGBA)
  fragColor = vec4(finalColor, 1.0);
}
