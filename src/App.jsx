import './App.css'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react'

function App() {
  let scene;
  let camera;
  let renderer = null;
  let sphere = null;
  let pointLight = null;
  let earthTexture;
  let spaceTexture;
  const targetRotationY = useRef(0); // Store the target rotation
  const rotationSpeed = 1.2; // Speed of rotation

  const createPlanet = (scene)=>{
    const geometry = new THREE.SphereGeometry(11,64,32);
    const material = new THREE.MeshStandardMaterial( { map: earthTexture } )
    sphere = new THREE.Mesh(geometry,material);
    sphere.position.set(0,60,0);
    scene.add(sphere)
  }

  const addStar = ()=>{
    const colors = [
      new THREE.Color(0xb2e3fd),
      new THREE.Color(0xf1b18c)
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load('/blurred.jpg'), emissive: randomColor, emissiveIntensity: 1, transparent: true,blending: THREE.AdditiveBlending,});
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    star.scale.set(1, 1, 1); // Adjust the scale to make the glow effect larger
    scene.add(star);
  }

  const animate = ()=>{
    requestAnimationFrame(animate);
    targetRotationY.current += 0.001;
    sphere.rotation.y += (targetRotationY.current - sphere.rotation.y) * rotationSpeed;
    if(sphere.position.y > 0){
      sphere.position.set(0,sphere.position.y-sphere.position.y*0.009,0);
    }
    renderer.render(scene,camera)
  }

  const moveCamera = (up=false)=>{
    up ? targetRotationY.current += 0.05 : targetRotationY.current -= 0.05;
  }

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  useEffect(()=>{
    window.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        moveCamera(true);
      } else {
        moveCamera();
      }
    });

    window.addEventListener('resize', handleResize);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    scene = new THREE.Scene();
    spaceTexture = new THREE.TextureLoader().load('/galaxy.jpg');
    spaceTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture = new THREE.TextureLoader().load('/earth.jpg');
    scene.background = spaceTexture;
    renderer = new THREE.WebGLRenderer({
      canvas : document.querySelector("#bg"),
    });
    pointLight  = new THREE.PointLight(0xffffff,1000);
    pointLight.position.set(0,20,30);
    let pointLight2 = new THREE.PointLight(0xffffff,700);
    pointLight2.position.set(50,60,10);

    scene.add(pointLight, pointLight2);

    camera.position.set(40, 0, 0);
    camera.lookAt(0, 0, 0); // Cámara en el eje Y, por encima de la esfera


    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.gammaOutput = true;
    renderer.gammaFactor = 0.2;

    createPlanet(scene);
    Array(100).fill(0).forEach(addStar)
    renderer.render( scene, camera );
    animate();
  },[])


  return (
    <>
      <canvas id="bg"></canvas>
      <canvas id="glscreen"></canvas>
      <main>
        <NavLink to='/planets' className='h-[70px] mx-auto xl:w-[600px] w-[300px] sm:w-[400px] md:w-[600px] relative navlink mt-[50px] flex justify-center'><h1 className='flex items-center justify-center xl:text-5xl md:text-4xl text-3xl font-bold coolButton'>Explore Planets <Icon icon="whh:planet" className="ml-5"/></h1></NavLink>
      </main>
    </>
  )
}

export default App
