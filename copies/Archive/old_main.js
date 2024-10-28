import * as THREE from 'three';

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
const renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

// 4. Utworzenie obiektów do rysowania.

function getRandomValue(minValue, maxValue)
{
    return Math.floor(Math.random() * (maxValue - minValue + 1) ) + minValue;
}

function createCubeAttributes()
{
    var minValue = -2
    var maxValue = 2
    var randomColor = Math.floor(Math.random()*16777215);
    const cubeAttributes ={
        width:  getRandomValue(minValue, maxValue)/2,
        height: getRandomValue(minValue, maxValue)/2,
        depth:  getRandomValue(minValue, maxValue)/2,
        color: randomColor,
        position:{
            x: getRandomValue(minValue, maxValue),
            y: getRandomValue(minValue, maxValue),
            z: getRandomValue(minValue, maxValue)
        }
    }
    return cubeAttributes
}

function createCubes(cubes, numberOfCubes)
{
    for(let i=0; i<numberOfCubes; i++)
    {
        const cubeAttributes = createCubeAttributes()
        const geometry = new THREE.BoxGeometry( // GEOMETRIA
            cubeAttributes.width, 
            cubeAttributes.height, 
            cubeAttributes.depth
        ); 
        const material = new THREE.MeshBasicMaterial({color: cubeAttributes.color}); // METERIAŁ
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = cubeAttributes.position.x
        cube.position.y = cubeAttributes.position.y
        cube.position.z = cubeAttributes.position.z
        cubes.push(cube)
    }
}

function addCubesToTheScene(cubes, numberOfCubes, scene)
{
    for(let i =0; i<numberOfCubes; i++)
    {
        scene.add(cubes[i])
    }
}

var cubes = []
var numberOfCubes = 50
createCubes(cubes, numberOfCubes)
addCubesToTheScene(cubes, numberOfCubes, scene)

// 5. Animacja
camera.position.z = 5;
function animateScene()
{
    for(let i =0; i<numberOfCubes; i++)
    {
        cubes[i].rotation.x += 0.01;
        cubes[i].rotation.y += 0.01;
        cubes[i].rotation.z += 0.01;
    }

    requestAnimationFrame(animateScene)
    renderer.render(scene, camera)
}
animateScene()