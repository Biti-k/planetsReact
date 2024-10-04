import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import Wave from '../components/Wave';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion'
import { fetchDataPlanet, fetchImage } from '../api/api'
import Card from '../components/Card';


const animations = {
  initial: {opacity: 0, x: 100},
  animate: { opacity: 1, x: 0},
  exit: {opacity: 0, x: -100}
}

const Planets = () => {
  const title = useRef(null);
  const stars = 0;
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState((Array.from({length: stars},()=>{return {x: 0, y: 0}})));
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [planet,setPlanet] = useState();
  const [images,setImages] = useState();
  const [planetText, setPlanetText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  let timeOut;

  const getData = async () => {
    setIsLoading(true);

    //button animation
    setIsAnimating(true);
    setTimeout(()=>setIsAnimating(false),2000);
    //

    let text = planetText != '' ? planetText : "earth";
    const resultPlanet = await fetchDataPlanet(text); 
    let resultImages;

    if(resultPlanet[0]){
      resultImages = await fetchImage(resultPlanet[0].name);
    }

    setPlanet(resultPlanet);
    setImages(resultImages);
    setIsLoading(false);

  };

  useEffect(()=>{
    getData();
    setIconPosition(Array.from({length: 2}, ()=>{return { x: 0, y: 0 }}));
    setRandomNumbers(Array.from({length: stars},()=>{return {x: Math.floor(Math.random() * 100) + 1, y : Math.floor(Math.random() * 50) + 1}}));
  },[])
  
  const handleMouseMove = (event) => {
    // Calcula la posición relativa dentro del contenedor
    if(timeOut){
      clearTimeout(timeOut);
    }
    setIsMouseMoving(true);
    timeOut = setTimeout(()=>{
      setIsMouseMoving(false)
    },50);
    
    const x = (event.clientX - window.innerWidth * 0.25) / 50; // Ajuste de la posición relativa
    const y = (event.clientY - window.innerHeight * 0.1) / 50; // Ajuste de la posición relativa
    setIconPosition({ x, y });
  };

  const handleChangePlanet = () => {
    if(planetText != ''){
      getData();
    }
  }

  return (
    <>
    <motion.div
      variants={animations}
      initial="initial" animate="animate" exit="exit"
      className='w-screen min-h-full bg-galaxy-violet'
      onMouseMove={handleMouseMove} 
    >
      <div className='absolute z-20 w-screen h-full xl:p-8 p-0'>
        <div className='flex justify-center'>
          <div className='relative xl:w-auto w-full flex justify-center flex-col'>
            <input type="text" ref={title} className='focus:outline-none placeholder-purple-200/50 xl:text-3xl text-xl font-bold text-center align-middle p-4 border-galaxy-cyan border-[3px] rounded-[50px] xl:w-[600px] md:w-[70%] w-[90%] mx-auto mt-8 bg-transparent' placeholder="SEARCH ANY PLANET" value={planetText} onChange={(e)=>setPlanetText(e.target.value)}></input>
            <button onClick={handleChangePlanet} className={"justify-between mx-auto mt-2 xl:mt-0 xl:absolute flex items-center xl:left-[100%] xl:top-[50%] xl:translate-y-[-25%] xl:translate-x-[-100%] cursor-pointer p-3 bg-galaxy-cyan rounded-full overflow-hidden group md:w-[50%] w-[70%] xl:w-auto"}><Icon icon="ion:rocket" className={"text-5xl text-white transition duration-200 group-hover:scale-110" + ` ${isAnimating ? 'animationRocket' : ''}`}/><p className='xl:w-0 text-left text-2xl font-bold xl:text-[0px]'>SHOW</p><p></p></button>
          </div>
        </div>
        <div className="flex xl:w-[90%] w-[90%] xl:h-[600px] h-auto bg-galaxy-deep/50 mx-auto xl:mt-[100px] mt-[50px] distorsion shadow-purple-600 shadow-md xl:p-14 p-5">
          {
            isLoading ? <div className="flex items-center justify-center w-full h-full"><span className="loader"></span></div> :
            <Card dataPlanet={planet} images={images}></Card>
          }
        </div>
        <Icon
          icon="pepicons-print:planet"
          className="absolute z-10 moverL top-[80px] text-[7rem] -rotate-45 xl:block hidden"
          style={{ transform: `translate(${iconPosition.x}px, ${iconPosition.y}px) rotate(-45deg)` }} // Aplicar la posición calculada
        />
        
        <Icon
          icon="ion:planet-sharp"
          className="absolute z-10 moverR top-[80px] text-[7rem] -rotate-45 xl:block hidden"
          style={{ transform: `translate(${iconPosition.x}px, ${iconPosition.y}px) rotate(-45deg)` }} 
        />
      </div>
      <div className="stars">
        {
          Array.from({length: stars}).map((e,i)=> (
            <Icon key={i} icon="pepicons:stars-print" className='absolute z-10 text-[1rem] opacity-45 text-orange-300 transition duration-[10ms]' style={{left: `${randomNumbers[i].x}%`, top: `${randomNumbers[i].y}%`, rotate: `${randomNumbers[i].x}deg`}}/>
          ))
        }
      </div>
      <Wave />
    </motion.div>
    <div className='bg-bg h-screen xl:h-[50%] flex items-center flex-col justify-end p-5'>
      <p className='text-5xl p-2 bg-galaxy-deep/25 rounded-xl font-bold xl:mt-0 mb-4'>Contacts</p>
      <div className='flex gap-3'>
        <a href='https://github.com/biti-k' target='_blank'><Icon icon="whh:circlegithub" className='text-5xl hover:scale-110 transition duration-200'/></a>
        <a href='https://www.linkedin.com/in/diego-de-luca-95561b274/' target='_blank'><Icon icon="entypo-social:linkedin-with-circle" className='text-5xl hover:scale-110 transition duration-200'/></a>
      </div>

    </div>
    </>
  );
}

export default Planets;