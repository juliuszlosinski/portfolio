// FOR ONLINE IMPLEMENTATION

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


// FOR LOCAL IMPLEMENTATION
/*
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
*/

// 1. RENDERER:
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

// 2. SCENE:
const scene = new THREE.Scene();

// 3. CAMERA:
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth/ window.innerHeight, 1, 1000
);
camera.position.set(4, 5, 20);

// OBJECTS:

var listener = new THREE.AudioListener();
camera.add( listener );

// AUDIO
var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

var audioLoader = new THREE.AudioLoader();

// A) 3D MODEL:
const loader = new GLTFLoader().setPath("./public/");
loader.load('GravityFalls.gltf', (gltf) => {
    const mesh = gltf.scene;
  
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    mesh.position.set(0, -3.00, -0.5);
    scene.add(mesh);
    
    document.getElementById('progress-container').style.display = 'none';

    audioLoader.load( './music.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop(true);
    sound.setVolume(0.004);
    sound.play();
},
function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
function ( err ) {
    console.log( 'Un error ha ocurrido' );
}
);
  }, ( xhr ) => {
    document.getElementById('progress').innerHTML = `LOADING ${Math.max(xhr.loaded / xhr.total, 1) * 100}/100`;
},);

// Controls:
const controls = new OrbitControls(camera, renderer.domElement);

controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// b) LIGHTS:
const spotLight = new THREE.SpotLight(
    0xFFFFFF,  5, 0, 0.22, 0.5
);
spotLight.position.set(0, 25, 0);
spotLight.castShadow=true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const ambientLight = new THREE.AmbientLight(
  0xFFFFFF, 1.55
)
scene.add(ambientLight)

// c) SHADOWS:
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var max = Math.random()
var current = 0.0;
var min = 0
var go = true

// ANIMATION:
function animate(){
    requestAnimationFrame(animate)
    if(current < min || current > max)
    {
        go = !go;
    }
    if(go){
       current += 0.003;
    }else{
        current -=0.003;
    }
    spotLight.color.setRGB(current, current-0.25, current-0.5)
    controls.update();
    renderer.render(scene, camera);
}
animate()