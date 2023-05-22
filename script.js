//Setting variables
const apiKey = 'd32affe5603295cd523f378bb2f5bef1' 
const slider = document.querySelector('.slider');
// getComputedStyle(slider).getPropertyValue('--slider-index') to know the value of a specific property



const movies = async()=>{
    slider.innerHTML=""
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    for(let i =0; i<12; i++){
    const imagePath = res.data.results[i].poster_path;
    const image = `https://image.tmdb.org/t/p/w500/${imagePath}`;
    console.log(image)
    slider.innerHTML += `<img src="${image}">`;
    }
}
movies();


// --------------------carousel buttons----------------------
let handle;
document.addEventListener('click',(e)=>{
    if (e.target.matches('.handle') ||e.target.closest('.handle') ){
        handle=e.target.closest('.handle')
        console.log(handle);
        onHandleClick(handle);
    }
})

// --------------------carousel Functions----------------------
let count=0;
function onHandleClick(handle){
    const slider = handle.closest('.slider-container').querySelector('.slider');
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));

    if (handle.classList.contains("right-handle")){ 
        
        slider.style.setProperty('--slider-index',sliderIndex + 1);
        const itemcount= slider.children.length;
        count++;
        console.log(count)
        if (count > 2){
            slider.style.setProperty('--slider-index',0);
            count = 0;
        }
    }
    if (handle.classList.contains("left-handle")){ 
        slider.style.setProperty('--slider-index',sliderIndex - 1);
        count--;
        if (count < 0){
            slider.style.setProperty('--slider-index',0);
            count = 0;
        }
    }
    
}
// -------------------------------------------------


   
 