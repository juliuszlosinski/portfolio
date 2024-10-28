import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js'

// Camera properties
const cameraProperties = {
 windowWidth: window.innerWidth,
 windowHeight: window.innerHeight,
 fieldOfView: 75,
 aspectRatio: window.innerWidth / window.innerHeight,
 nearPlane: 0.1,
 farPlane: 100
}

// 1. Scene.
const scene = new THREE.Scene()

// 2. Renderer.
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x323232)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 3. Camera.
const camera = new THREE.PerspectiveCamera(
    cameraProperties.fieldOfView, cameraProperties.aspectRatio, cameraProperties.nearPlane, cameraProperties.farPlane
)
camera.translateOnAxis(new THREE.Vector3(0, 0, 1), 10)
//-----------------------------------------

const vertices01 = new Float32Array([
    -1.0, -1.0, 1.0,
     1.0, -1.0, 1.0,
     1.0,  1.0, 1.0,

     -1.0, 1.0, 1.0,
     -1.0, -1.0, 1.0,
      1.0, 1.0, 1.0     
])

const bufferGeometry01 = new THREE.BufferGeometry();
bufferGeometry01.setAttribute("position", new THREE.BufferAttribute(vertices01, 3));
const material01 = new THREE.MeshBasicMaterial({color:0x00FFFF})
const mesh01 = new THREE.Mesh(bufferGeometry01, material01)

mesh01.translateOnAxis(new THREE.Vector3(1, 0, 0), -2)
mesh01.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.7)

scene.add(mesh01)

// ----------------------------------------

const vertices02 = new Float32Array([
    -1.0, -1.0, 1.0,
     1.0, -1.0, 1.0,
     1.0,  1.0, 1.0,
    -1.0,  1.0, 1.0
])

const indices02 =[
    0, 1, 2,
    2, 3, 0
]

const bufferGeometry02 = new THREE.BufferGeometry()
bufferGeometry02.setIndex(indices02);
bufferGeometry02.setAttribute(
    'position', 
    new THREE.BufferAttribute(vertices02, 3)
);

const material02 = new THREE.MeshBasicMaterial({color: 0xFAFFCC})

const mesh02 = new THREE.Mesh(bufferGeometry02, material02);
mesh02.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.7)
scene.add(mesh02)

//-----------------------------------------

const vertices03 = new Float32Array([
    -1.0,-1.0,-1.0,
    -1.0,-1.0, 1.0,
    -1.0, 1.0, 1.0, 
    1.0, 1.0,-1.0,
    -1.0,-1.0,-1.0,
    -1.0, 1.0,-1.0,
    1.0,-1.0, 1.0,
    -1.0,-1.0,-1.0,
    1.0,-1.0,-1.0,
    1.0, 1.0,-1.0,
    1.0,-1.0,-1.0,
    -1.0,-1.0,-1.0,
    -1.0,-1.0,-1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0,-1.0,
    1.0,-1.0, 1.0,
    -1.0,-1.0, 1.0,
    -1.0,-1.0,-1.0,
    -1.0, 1.0, 1.0,
    -1.0,-1.0, 1.0,
    1.0,-1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0,-1.0,-1.0,
    1.0, 1.0,-1.0,
    1.0,-1.0,-1.0,
    1.0, 1.0, 1.0,
    1.0,-1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0,-1.0,
    -1.0, 1.0,-1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0,-1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    1.0,-1.0, 1.0   
])

const bufferGeometry03 = new THREE.BufferGeometry();
bufferGeometry03.setAttribute("position", new THREE.BufferAttribute(vertices03, 3));
const material03 = new THREE.MeshBasicMaterial({color:0xAAFF88})
const mesh03 = new THREE.Mesh(bufferGeometry03, material03)

mesh03.translateOnAxis(new THREE.Vector3(1, 0, 0), -5)
mesh03.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.7)

scene.add(mesh03)

// ----------------------------------------

const vertices04 = new Float32Array([
    -1, -1, 1,
    1, -1, 1,
    1, 1, 1,
    -1, 1, 1,
    -1, -1, -1,
    1, -1, -1,
    1, 1, -1,
    -1, 1, -1
])

const indices04 =[
    0, 1, 2, 
    2, 3, 0, 
    1, 5, 6, 
    6, 2, 1, 
    7, 6, 5, 
    5, 4, 7,
    4, 0, 3, 
    3, 7, 4, 
    4, 5, 1, 
    1, 0, 4, 
    3, 2, 6, 
    6, 7, 3
]

const bufferGeometry04 = new THREE.BufferGeometry()
bufferGeometry04.setIndex(indices04);
bufferGeometry04.setAttribute(
    'position', 
    new THREE.BufferAttribute(vertices04, 3)
);

const material04 = new THREE.MeshBasicMaterial({color: 0xAAFF00})

const mesh04 = new THREE.Mesh(bufferGeometry04, material04);
mesh04.translateOnAxis(new THREE.Vector3(1, 0, 0), 3.0)
scene.add(mesh04)

// ----------------------------------------
// RENDERING SCENE
const rotationSpeed = 0.05
const angle = 0.7
var time = 100
function renderFrame()
{
    if(time <= 0){
        time = 75
        mesh02.material.wireframe = !mesh02.material.wireframe
        mesh04.material.wireframe = !mesh04.material.wireframe
    }
    time--
    mesh01.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle * rotationSpeed)
    mesh02.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle * rotationSpeed)
    mesh03.rotateOnAxis(new THREE.Vector3(0, 1, 1), angle * rotationSpeed)
    mesh04.rotateOnAxis(new THREE.Vector3(1, 0, 1), angle * rotationSpeed)
    requestAnimationFrame(renderFrame);
    renderer.render(scene, camera)
}
renderFrame()