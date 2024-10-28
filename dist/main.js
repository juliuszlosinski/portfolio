import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js'

// PARAMETRY
var windowWidth = window.innerWidth   // Szerokość okna.
var windowHeight = window.innerHeight // Wysokość okna.
var fieldOfView = 75 // Kąt widzenia kamery.
var aspectRatio = window.innerWidth / window.innerHeight // Współczynnik proporcji kamery.
var nearPlane = 0.1 // Minimalne pole widzenia kamery. -> (|)----------|
var farPlane = 100  // Maksymalne pole widzenia kamer.     |----------(|) <-

// 1. Utworzenie sceny.
const scene = new THREE.Scene();

// 2. Utworzenie kamery.
const camera = new THREE.PerspectiveCamera(
    fieldOfView, aspectRatio, nearPlane, farPlane
);

// 3. Utworzenie renderera.
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(0xFFFFFF);
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

// 4. Utworzenie obiektów do rysowania.
function getRandomValue(minValue, maxValue)
{
    return Math.floor(Math.random() * (maxValue - minValue + 1) ) + minValue;
}

function createSphereAttributes()
{
    var minValue = -2
    var maxValue = 2
    const sphereAttributes ={
        radius: getRandomValue(minValue, maxValue)/2,
        color: Math.floor(Math.random()*16777215),
        position:{
            x: getRandomValue(minValue, maxValue),
            y: getRandomValue(minValue, maxValue),
            z: getRandomValue(minValue, maxValue)
        }
    }
    return sphereAttributes
}

function createSpheres(spheres, numberOfSpheres)
{
    for(let i=0; i<numberOfSpheres; i++)
    {
        const sphereAttributes = createSphereAttributes()
        const geometry = new THREE.SphereGeometry( // GEOMETRIA
            sphereAttributes.radius/2
        ); 
        const material = new THREE.MeshBasicMaterial({color: sphereAttributes.color}); // METERIAŁ
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.x = sphereAttributes.position.x + getRandomValue(-3, 3)
        sphere.position.y = sphereAttributes.position.y + getRandomValue(-3, 3)
        sphere.position.z = sphereAttributes.position.z + getRandomValue(-3, 3)
        spheres.push(sphere)
    }
}

function addSpheresToTheScene(spheres, numberOfSpheres, scene)
{
    for(let i =0; i<numberOfSpheres; i++)
    {
        scene.add(spheres[i])
    }
}

var spheres = []
var numberOfSpheres = 50
createSpheres(spheres, numberOfSpheres)
addSpheresToTheScene(spheres, numberOfSpheres, scene)

// 5. Animacja
camera.position.z = 7;
function animateScene()
{
    for(let i =0; i<numberOfSpheres; i++)
    {
        spheres[i].rotation.x += 0.001;
        spheres[i].rotation.y += 0.001;
        spheres[i].rotation.z += 0.001;
    }

    requestAnimationFrame(animateScene)
    renderer.render(scene, camera)
}
animateScene()