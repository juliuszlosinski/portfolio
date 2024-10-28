import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js';

const windowWidth = window.innerWidth   
const windowHeight = window.innerHeight 
const fieldOfView = 75 
const aspectRatio = window.innerWidth / window.innerHeight
const nearPlane = 0.1 
const farPlane = 100

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    fieldOfView, aspectRatio, nearPlane, farPlane
)
camera.position.z = 30;


const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement)

var boxGeometry = new THREE.BoxGeometry(10, 10, 10, 5, 5, 5)
var boxMaterial = new THREE.MeshBasicMaterial({color: 0xFF00FF, wireframe:true})
var boxMesh = new THREE.Mesh(
    boxGeometry, boxMaterial
)
scene.add(boxMesh)

var touchStartX;
var touchEndX;
var touchStartY;
var touchEndY;
document.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
}, false);

document.addEventListener("keydown", function(event){
    var W = 87;
    var arrowUp = 38;
    var arrowDown = 40; 
    var arrowLeft = 37;
    var arrowRight = 39;
    var S = 83;
    var A = 65;
    var D = 68;
    var R = 82;
    var Q = 81;
    var E = 69;
    var C = 67;
    var keyCode = event.keyCode
    var movementSpeed = 0.3
    var rotationAngle = 0.02
    if(keyCode == W || keyCode == arrowUp)
    {
        boxMesh.translateZ(-1 * movementSpeed)
    }
    if(keyCode == S || keyCode == arrowLeft)
    {
        boxMesh.translateZ(1 * movementSpeed)
    }
    if(keyCode == A || keyCode == arrowDown)
    {
        boxMesh.translateX(-1 * movementSpeed)
    }
    if(keyCode == D || keyCode == arrowRight)
    {
        boxMesh.translateX(1 * movementSpeed)
    }
    if(keyCode == Q || touchEndX > touchStartX)
    {
        boxMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotationAngle)
    }
    if(keyCode == R || touchEndX < touchStartX)
    {
        boxMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationAngle) 
    }
    if(keyCode == E || touchEndY < touchStartY)
    {
        boxMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotationAngle) 
    }
    if(keyCode == C || touchEndY > touchStartY)
    {
        boxMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -rotationAngle) 
    }
})
document.addEventListener("wheel", function(event){
    var dir = Math.sign(event.deltaY)
    camera.translateZ(dir/2)
})

function animateScene()
{
    requestAnimationFrame(animateScene);
    renderer.render(scene, camera)
}
animateScene()