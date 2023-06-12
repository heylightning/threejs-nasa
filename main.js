import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(400, 400);
camera.position.set(-3, 0, 30);

renderer.render(scene, camera);

const loader = new THREE.TextureLoader();

const sGeometry = new THREE.SphereGeometry(15, 64, 32, 6.283185307179586, 6.283185307179586);
const material1 = new THREE.MeshBasicMaterial({
    map: loader.load('/earth.jpg')
});
const earth = new THREE.Mesh(sGeometry, material1);
scene.add(earth);

const sGeometryWired = new THREE.SphereGeometry(18, 30, 15);
const material2 = new THREE.MeshBasicMaterial({
    color: 0x565656, wireframe: true
});
const wireSphere = new THREE.Mesh(sGeometryWired, material2);
scene.add(wireSphere);

function addStar() {
    const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material3 = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    const star = new THREE.Mesh(starGeometry, material3);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.005;

    wireSphere.rotation.x += 0.01;
    wireSphere.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.documentElement.clientWidth / 2, document.documentElement.clientHeight / 2);
});