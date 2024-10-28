import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js';

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
        const texture = new THREE.TextureLoader().load( "wood.png" );
        const material = new THREE.MeshPhongMaterial({map: texture, depthTest:true}); // METERIAŁ
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

// Dodanie światła

// 1. Kierunkowego.
const directionalColor = 0xFFFFFF;
const directionalIntensity = 1.5;
const directionalLight = new THREE.DirectionalLight(directionalColor, directionalIntensity);
directionalLight.position.set(-1, 2, 4);

scene.add(directionalLight);

// 2. Zawsze obecnego.
const ambientColor = 0xFF000AA;
const ambientIntensity = 1;
const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
scene.add(ambientLight);

// DODANIE PODSTAWKI

// 1. Ustawienie Tekstury.
const planeSize = 40
const loader = new THREE.TextureLoader();
const texture = loader.load('checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = 40 / 2;
texture.repeat.set(repeats, repeats);

// 2. Utworzenie geometrii wraz z materiałem.
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});

// 3. Utworzenie siatki.
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
planeMesh.rotation.x = Math.PI * -.5;
planeMesh.position.y = -5
scene.add(planeMesh)

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
