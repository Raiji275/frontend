import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a container for the 3D content
const container3D = document.createElement('div');
container3D.style.position = 'absolute';
container3D.style.top = '0';
container3D.style.left = '0';
container3D.style.width = '100%';
container3D.style.height = '100%';
container3D.style.zIndex = '1000';

// Create a canvas for the 3D content inside the glassmorphism container
const canvas3D = document.createElement('canvas');
canvas3D.classList.add('canvas-3d');

const glassmorphismContainer = document.querySelector('.glass-morph ');
const appElement = document.querySelector('#app');

glassmorphismContainer.insertBefore(canvas3D, appElement);

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.5, -0.6, -4); // adjust the z-value to your liking
const renderer = new THREE.WebGLRenderer({
  canvas: canvas3D,
  antialias: true,
  alpha: true // make the background transparent
});

renderer.setSize(glassmorphismContainer.offsetWidth, glassmorphismContainer.offsetHeight);

// Add a light source to the scene
// Add a hemisphere light to simulate ambient light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(hemisphereLight);

// Add a directional light to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Update the existing ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight);

// Create a group to hold the 3D model
const group = new THREE.Group();
scene.add(group);

// Load your custom 3D model
const loader = new GLTFLoader();
loader.load('/school-latest.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1, 0.8, 1); // scale the model to 80% of its original size
  group.add(model);
  group.position.set(0, -1, -5); // Move the model to a specific position
  group.lookAt(camera.position); // Make the model face the camera

  // Check if user is on mobile device
  const isMobile = window.innerWidth < 768; // adjust this value to your liking
  if (isMobile) {
    // Reset the model's scale
    model.scale.set(1, 2, 1);
  
    // Reset the group's position to be closer to the camera
    group.position.set(-0.1, -1.7, -6);
  }
  
});

// Create a vector to store the mouse position
const mouseVector = new THREE.Vector3();

// Add an event listener to update the mouse position
if (!isMobile) {
  document.addEventListener('mousemove', (event) => {
    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
}

// Animate the 3D model
function animate() {
  requestAnimationFrame(animate);
  const direction = new THREE.Vector3(mouseVector.x, mouseVector.y, 0);
  direction.normalize();
  const tiltAngleX = Math.PI / 8; // Adjust the tilt angle to your liking
  const tiltAngleY = Math.PI / 8; // Adjust the tilt angle to your liking
  const tiltAxisX = new THREE.Vector3(0, 1, 0);
  const tiltAxisY = new THREE.Vector3(1, 0, 0);
  group.quaternion.setFromAxisAngle(tiltAxisX, tiltAngleX * direction.x);
  group.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(tiltAxisY, -tiltAngleY * direction.y));
  renderer.render(scene, camera);

}



animate();

function animate2() {
  requestAnimationFrame(animate);
  
  // ... existing animation code ...
  
  // Check if user is on mobile device
  const isMobile = window.innerWidth < 768; // adjust this value to your liking
  if (isMobile) {
    console.log('Mobile animation values:', group.rotation.y, group.position.z);
    console.log('Group object:', group);
    group.rotation.y += 0.01; // rotate the model slowly
    group.position.z = Math.sin(Date.now() * 0.001) * 0.5; // oscillate the model's z-position
  }
}
animate2();

