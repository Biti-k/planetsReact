import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const Card = ({dataPlanet, images})=>{
    const [image,setImage] = useState()
    const [opacityInfoPeriod, setopacityInfoPeriod] = useState(0)
    const [showJupiterRadius, setShowJupiterRadius] = useState(false)
    const [planetData, setPlanetData] = useState(null);
    const [showJupiterMass, setShowJupiterMass] = useState(false);
    const JUPITER_MASS = '1.898 * 10²⁷ kg';

    useEffect(()=>{
        //set kelvin or celsius
        if(dataPlanet[0] != null){
            const newPlanetData = { ...dataPlanet[0] };
            newPlanetData.tempTypeHost = 'K';
            newPlanetData.tempTypePlanet = 'K';
            newPlanetData.host_star_temperature = Number(newPlanetData.host_star_temperature);

            for(const key in newPlanetData){
                if(newPlanetData[key] === null){
                    newPlanetData[key] = 'UNKOWN';
                }
            }
            
            setPlanetData(newPlanetData);
        }
        console.log(dataPlanet);
    },[dataPlanet])

    const changeTemperature = (name)=>{
        const updatedData = { ...planetData };
        if(name=='host_star_temperature'){
            if(updatedData.tempTypeHost == 'K'){
                updatedData.tempTypeHost = 'C'
                updatedData[name] -= 273.15;
            }else{
                updatedData.tempTypeHost = 'K';
                updatedData[name] += 273.15;
            }
            let temp = updatedData[name];
            updatedData[name] = Number(temp.toFixed(2));
        }else{
            if(updatedData.tempTypePlanet == 'K'){
                updatedData.tempTypePlanet = 'C'
                updatedData[name] -= 273.15;
            }else{
                updatedData.tempTypePlanet = 'K';
                updatedData[name] += 273.15;
            }
            let temp = updatedData[name];
            updatedData[name] = Number(temp.toFixed(2));
        }
        setPlanetData(updatedData);
    }

    const infoPeriod = ()=>{
        opacityInfoPeriod == 100 ? setopacityInfoPeriod(0) : setopacityInfoPeriod(100);
    }

    const showRadiusInfo = ()=>{
        setShowJupiterRadius(!showJupiterRadius);
    }

    const showJupiterMassInfo = ()=>{
        setShowJupiterMass(!showJupiterMass);
    }

    return(
        <div className='flex flex-col-reverse w-full gap-7 xl:flex-row'>
            {
                planetData != null  ?
                <>
                    <div className='xl:w-[30%] flex items-center justify-center h-full rounded-[90px] bg-black border-[4px] outline-purple-500/25 outline-[2px] outline border-galaxy-purple/50 shadow-md shadow-cyan-400/50'><img src={images.images[0].imageUrl} className='xl:object-cover object-contain xl:w-auto xl:h-full h-auto w-full max-h-[400px] rounded-[90px]'/></div>
                        <div className='p-4 rounded-xl bg-galaxy-purple/50 xl:w-[70%] border border-purple-500/50 flex flex-col gap-4'>
                            <div>
                                <p className='text-xl font-bold xl:block flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Distance from earth</span> <span className='underline'>{planetData.distance_light_year+' light years'}</span>{planetData.distance_light_year == 0 ? ' (You are probably here)' : ``}</p>
                            </div>
                            <div>
                                <p className='text-xl font-bold flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Mass</span> <span className='underline'>{planetData.mass+' jupiters'}<Icon icon="bi:question-circle-fill" className='utils-button text-2xl' onClick={showJupiterMassInfo}/></span><span className='text-sm ml-3 p-1 bg-cyan-300/25 rounded-xl mt-2 text-center' style={{display: showJupiterMass ? "block" : 'none' }}>The mass of jupiter is just {JUPITER_MASS}</span></p>
                            </div>
                            <div>
                                <p className='text-xl font-bold flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Host star mass</span> <span className='underline'>{planetData.host_star_mass+' * Milky Way star mass'}</span></p>
                            </div>
                            <div>
                                <p className='text-xl font-bold flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Host star temperature</span> <span className='underline'>{planetData.host_star_temperature}{planetData.tempTypeHost == 'K' ? " ° Kelvin" : " ° Celsius"}<Icon icon="material-symbols:swap-horizontal-circle-rounded" className='text-3xl ml-2 inline-block cursor-pointer hover:scale-110 transition' onClick={()=>changeTemperature("host_star_temperature")}/></span></p>
                            </div>
                            <div>
                                <p className='text-xl font-bold flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Period</span> <span className='underline'>{planetData.period}<Icon icon="bi:question-circle-fill" className='utils-button text-2xl' onClick={infoPeriod}/></span><span className='text-sm ml-3 p-1 bg-cyan-300/25 rounded-xl mt-2 text-center' style={{display: opacityInfoPeriod == 0 ? "none" : 'block' }}>A period of a planet is the amount of time (days) that takes to make one revolution to the sun</span></p>
                            </div>
                            <div>
                                <p className='text-xl font-bold flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Radius</span> <span className='underline'>{planetData.radius+' * radius of Jupiters'}<Icon icon="bi:question-circle-fill" className='utils-button text-2xl' onClick={showRadiusInfo}/></span><span className='text-sm ml-3 p-1 bg-cyan-300/25 rounded-xl mt-2 text-center' style={{display: showJupiterRadius ? "block" : 'none' }}>The radius of Jupiter is 69911 km</span></p>
                            </div>
                            <div>
                                <p className='text-xl font-bold flex flex-col md:block'><span className='p-1 rounded-md bg-galaxy-deep/50'>Temperature</span> <span className='underline'>{planetData.temperature+' '}{planetData.tempTypePlanet == 'K' ? " ° Kelvin" : " ° Celsius"}<Icon icon="material-symbols:swap-horizontal-circle-rounded" className='text-3xl ml-2 inline-block cursor-pointer hover:scale-110 transition' onClick={()=>changeTemperature("temperature")}/></span></p>
                        </div>
                    </div>
                </>
                :
                <p className='text-3xl text-center font-bold flex items-center justify-center gap-1 w-full'>NO INFO FOUND <Icon icon="ci:error" className='inline-block'/></p>
            }
        </div>
    )
}

export default Card;