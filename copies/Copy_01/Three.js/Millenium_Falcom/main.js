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
camera.position.set(4, 5, 11);
camera.lookAt(0, 0, 0);

// OTHER:

// a) OBJECTS:
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI/2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color:0x555555,
    side:THREE.DoubleSide
})
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

// 3D MODEL:
const loader = new GLTFLoader().setPath("./public/");
loader.load('scene.gltf', (gltf)=>{
    const mesh = gltf.scene;
    mesh.position.set(0, 1.05, -1);

    mesh.traverse((child)=>{
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(mesh)
});

// Controls:
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// b) LIGHTS:
const spotLight = new THREE.SpotLight(
    0xCCAAFF,  5, 100, 0.22, 0.5
);
spotLight.position.set(0, 25, 0);
spotLight.castShadow=true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

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
       current += 0.0005;
    }else{
        current -=0.0005;
    }
    spotLight.color.setRGB(current, current-0.25, current-0.5)
    controls.update();
    renderer.render(scene, camera);
}
animate()