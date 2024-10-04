export const fetchDataPlanet = async (planet) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/planets?name=${planet}`,
        {
            method: 'GET',
            headers:{
                'Content-type':'application/json',
                'x-api-key' : import.meta.env.VITE_PLANETSAPI
            }
        }
      ); 
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
};

export const fetchImage = async (planet) => {
  try {
    const response = await fetch(`https://google.serper.dev/images`,
      {
          method: 'POST',
          headers:{
              'Content-type':'application/json',
              'x-api-key' : import.meta.env.VITE_IMAGESAPI
          },
          body: JSON.stringify({
            "q" : planet
          })
      }
    ); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}