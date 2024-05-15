// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// local from us provided utilities
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';
import type * as utils from './lib/utils';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';

// load shaders
import basicVertexShader from './shader/basic.v.glsl';
import basicFragmentShader from './shader/basic.f.glsl';
import ambientVertexShader from './shader/ambient.v.glsl?raw';
import ambientFragmentShader from './shader/ambient.f.glsl?raw';
import normalVertexShader from './shader/normal.v.glsl?raw';
import normalFragmentShader from './shader/normal.f.glsl?raw';
import toonVertexShader from './shader/toon.v.glsl?raw';
import toonFragmentShader from './shader/toon.f.glsl?raw';
import diffuseVertexShader from './shader/diffuse.v.glsl?raw';
import diffuseFragmentShader from './shader/diffuse.f.glsl?raw';
import phongVertexShader from './shader/phong.v.glsl?raw';
import phongFragmentShader from './shader/phong.f.glsl?raw';
import gouraudVertexShader from './shader/gouraud.v.glsl?raw';
import gouraudFragmentShader from './shader/gouraud.f.glsl?raw';
import cooktorranceVertexShader from './shader/cooktorrance.v.glsl?raw';
import cooktorranceFragmentShader from './shader/cooktorrance.f.glsl?raw';

// defines callback that should get called whenever the
// params of the settings get changed (eg. via GUI)


// feel free to declar certain variables outside the main function to change them somewhere else
// e.g. settings, light or material
function main(){
  // setup/layout root Application.
  // Its the body HTMLElement with some additional functions.
  // More complex layouts are possible too.
  var root = Application("Shader");
	root.setLayout([["renderer"]]);
  root.setLayoutColumns(["100%"]);
  root.setLayoutRows(["100%"]);

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings
  var settings = new helper.Settings();
  helper.createGUI(settings);
  // adds the callback that gets called on params change
  settings.addCallback(callback);

  // ---------------------------------------------------------------------------
  // create RenderDiv
	var rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  var renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });

  // create scene
  var scene = new THREE.Scene();
  var { material } = helper.setupGeometry(scene);
  // add light proxy
  var lightgeo = new THREE.SphereGeometry(0.1, 32, 32);
  var lightMaterial = new THREE.MeshBasicMaterial({color: 0xff8010});
  var light = new THREE.Mesh(lightgeo, lightMaterial);
  scene.add(light);

function callback(changed: utils.KeyValuePair<helper.Settings>) {

  if(changed.key=="shader"){
    switch(changed.value){
    case helper.Shaders.basic:
      material.vertexShader = basicVertexShader;
      material.fragmentShader = basicFragmentShader;
      break;
    case helper.Shaders.ambient:
      material.vertexShader = ambientVertexShader;
      material.fragmentShader = ambientFragmentShader;
      material.uniforms.ambientColor.value.x = settings.ambient_color[0];
    material.uniforms.ambientColor.value.y = settings.ambient_color[1];
    material.uniforms.ambientColor.value.z = settings.ambient_color[2];
    material.uniforms.ambientReflectance.value = settings.ambient_reflectance;
    material.needsUpdate=true;
      break;
    case helper.Shaders.normal:
      material.vertexShader = normalVertexShader;
      material.fragmentShader = normalFragmentShader;
      material.needsUpdate=true;
      break;
      case helper.Shaders.toon:
      material.vertexShader = toonVertexShader;
      material.fragmentShader = toonFragmentShader;
      material.needsUpdate=true;
      break;
      case helper.Shaders.lambert:
        material.vertexShader = diffuseVertexShader;
        material.fragmentShader = diffuseFragmentShader;
        material.uniforms.ambientColor.value.x = settings.ambient_color[0];
      material.uniforms.ambientColor.value.y = settings.ambient_color[1];
     material.uniforms.ambientColor.value.z = settings.ambient_color[2];
     material.uniforms.ambientReflectance.value = settings.ambient_reflectance;
        material.uniforms.diffuseColor.value.x = settings.diffuse_color[0];
        material.uniforms.diffuseColor.value.y = settings.diffuse_color[1];
        material.uniforms.diffuseColor.value.z = settings.diffuse_color[2];
        material.uniforms.diffuseReflectance.value = settings.diffuse_reflectance;
        material.uniforms.lightX.value = settings.lightX;
        material.uniforms.lightY.value = settings.lightY;
        material.uniforms.lightZ.value = settings.lightZ;
        material.needsUpdate=true;
        break;
        case helper.Shaders.gouraud_phong:
          material.vertexShader = gouraudVertexShader;
          material.fragmentShader = gouraudFragmentShader;
          material.uniforms.ambientColor.value.x = settings.ambient_color[0];
          material.uniforms.ambientColor.value.y = settings.ambient_color[1];
         material.uniforms.ambientColor.value.z = settings.ambient_color[2];
         material.uniforms.ambientReflectance.value = settings.ambient_reflectance;
          material.uniforms.diffuseColor.value.x = settings.diffuse_color[0];
        material.uniforms.diffuseColor.value.y = settings.diffuse_color[1];
        material.uniforms.diffuseColor.value.z = settings.diffuse_color[2];
        material.uniforms.diffuseReflectance.value = settings.diffuse_reflectance;
        material.uniforms.lightX.value = settings.lightX;
        material.uniforms.lightY.value = settings.lightY;
        material.uniforms.lightZ.value = settings.lightZ;
        material.uniforms.specularColor.value.x = settings.specular_color[0];
        material.uniforms.specularColor.value.y = settings.specular_color[1];
        material.uniforms.specularColor.value.z = settings.specular_color[2];
        material.uniforms.specularReflectance.value = settings.specular_reflectance;
        material.needsUpdate=true;
        break;
        case helper.Shaders.phong_phong:
          material.vertexShader = phongVertexShader;
          material.fragmentShader = phongFragmentShader;
          material.uniforms.ambientColor.value.x = settings.ambient_color[0];
          material.uniforms.ambientColor.value.y = settings.ambient_color[1];
         material.uniforms.ambientColor.value.z = settings.ambient_color[2];
         material.uniforms.ambientReflectance.value = settings.ambient_reflectance;
          material.uniforms.diffuseColor.value.x = settings.diffuse_color[0];
        material.uniforms.diffuseColor.value.y = settings.diffuse_color[1];
        material.uniforms.diffuseColor.value.z = settings.diffuse_color[2];
        material.uniforms.diffuseReflectance.value = settings.diffuse_reflectance;
        material.uniforms.lightX.value = settings.lightX;
        material.uniforms.lightY.value = settings.lightY;
        material.uniforms.lightZ.value = settings.lightZ;
        material.uniforms.specularColor.value.x = settings.specular_color[0];
        material.uniforms.specularColor.value.y = settings.specular_color[1];
        material.uniforms.specularColor.value.z = settings.specular_color[2];
        material.uniforms.specularReflectance.value = settings.specular_reflectance;
        material.needsUpdate=true;
        break;
        case helper.Shaders.phong_cooktorrance:
          material.vertexShader = cooktorranceVertexShader;
          material.fragmentShader = cooktorranceFragmentShader;
          material.uniforms.diffuseColor.value.x = settings.diffuse_color[0];
          material.uniforms.diffuseColor.value.y = settings.diffuse_color[1];
          material.uniforms.diffuseColor.value.z = settings.diffuse_color[2];
          material.uniforms.specularColor.value.x = settings.specular_color[0];
          material.uniforms.specularColor.value.y = settings.specular_color[1];
          material.uniforms.specularColor.value.z = settings.specular_color[2];
          material.uniforms.diffuseReflectance.value = settings.diffuse_reflectance;
          material.uniforms.lightX.value = settings.lightX;
          material.uniforms.lightY.value = settings.lightY;
          material.uniforms.lightZ.value = settings.lightZ;
          material.uniforms.lightintensity.value = settings.light_intensity;
          material.needsUpdate=true;

    }
  }
  
  if(changed.key=='ambient_color'){

    material.uniforms.ambientColor.value.x = changed.value[0];
    material.uniforms.ambientColor.value.y = changed.value[1];
    material.uniforms.ambientColor.value.z = changed.value[2];
    material.needsUpdate=true;
  }
  if(changed.key=='ambient_reflectance'){

    material.uniforms.ambientReflectance.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='diffuse_color'){

    material.uniforms.diffuseColor.value.x = changed.value[0];
    material.uniforms.diffuseColor.value.y = changed.value[1];
    material.uniforms.diffuseColor.value.z = changed.value[2];
    material.needsUpdate=true;
  }
  if(changed.key=='diffuse_reflectance'){

    material.uniforms.diffuseReflectance.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='specular_color'){

    material.uniforms.specularColor.value.x = changed.value[0];
    material.uniforms.specularColor.value.y = changed.value[1];
    material.uniforms.specularColor.value.z = changed.value[2];
    material.needsUpdate=true;
  }
  if(changed.key=='specular_reflectance'){

    material.uniforms.specularReflectance.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='magnitude'){

    material.uniforms.shininess.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='roughness'){

    material.uniforms.roughness.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='light_intensity'){

    material.uniforms.lightintensity.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='lightX'){
    light.position.setX(changed.value);
    material.uniforms.lightX.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='lightY'){
    light.position.setY(changed.value);
    material.uniforms.lightY.value = changed.value;
    material.needsUpdate=true;
  }
  if(changed.key=='lightZ'){
    light.position.setZ(changed.value);
    material.uniforms.lightZ.value = changed.value;
    material.needsUpdate=true;
  }
}

// ... (GUI setup and controls)


  //scene.background = new THREE.Color(0xff00ff); // Set the background color to white

  // create camera
  var camera = new THREE.PerspectiveCamera();
  helper.setupCamera(camera, scene);

  // create controls
  var controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);

  // fill the renderDiv. In RenderWidget happens all the magic.
  // It handles resizes, adds the fps widget and most important defines the main animate loop.
  // You dont need to touch this, but if feel free to overwrite RenderWidget.animate
  var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  // start the draw loop (this call is async)
  wid.animate();
}

// call main entrypoint
main();
