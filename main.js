// FOR ONLINE IMPLEMENTATION
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// 2. Creating the scene.
const scene = new THREE.Scene();
const container = document.getElementById("threejs-container");

// 3. Setting up the perspective camera.
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 10);
camera.position.set(2.2, 0.2, -0.7);

// 4. Setting up the renderer.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.97); // Correct width setting
renderer.setClearColor(0xffffff, 1);
container.appendChild(renderer.domElement);

// 5. Adding ambient light and directional light.
const ambientLight = new THREE.AmbientLight(0x404040, 2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();

scene.add(ambientLight);
scene.add(directionalLight);

// 6. Loading the GLTF model.
const loader = new GLTFLoader();
const pathToModel = "./public/scene.gltf"; // Ensure this path is correct
let brainModel = null;

loader.load(
    pathToModel,
    (modelGLTF) => {
        brainModel = modelGLTF.scene;
        brainModel.position.set(0, 0, 0);
        brainModel.scale.set(6, 6, 6);
        scene.add(brainModel);
    },
    (onLoad) => {
        console.log((onLoad.loaded / onLoad.total) * 100 + '% loaded');
    },
    (onError) => {
        console.error('An error happened while loading the model:', onError);
    }
);

window.addEventListener('resize', () => {
    const width = window.innerWidth * 0.6;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// 7. Animating the scene ~ render loop.
function animateScene() {
    requestAnimationFrame(animateScene);
    if (brainModel) {
        brainModel.rotation.y += 0.0001;
        brainModel.rotation.z += 0.0001;
    }
    renderer.render(scene, camera);
}
animateScene();
