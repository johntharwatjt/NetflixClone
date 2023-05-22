//Setting variables
const apiKey = 'd32affe5603295cd523f378bb2f5bef1' 
const slider = document.querySelector('.slider');
const movieTitle = document.querySelector('.movie-title');
const description = document.querySelector('.description');
const moreInfoBtn = document.querySelector('.more-info');
const moviesContainer = document.querySelector('.movies-container');
const sliderTitle = document.querySelector('.slider-title');
const videoContainer = document.querySelector('.video-container');
const mute = document.querySelector('.mute');
const video = document.querySelector('.video');
const form = document.querySelector('.search');
// getComputedStyle(slider).getPropertyValue('--slider-index') to know the value of a specific property

const sliderAll= document.querySelectorAll('.slider');

// --------------------setting up the carousel images----------------------
const movies = async(request,n)=>{
    sliderAll[n].innerHTML=""
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${request}?api_key=${apiKey}`);
    for(let i =1; i<13; i++){
    const imagePath = res.data.results[i].poster_path;
    const image = `https://image.tmdb.org/t/p/w500/${imagePath}`;
    sliderAll[n].innerHTML += `<img src="${image}" >`;
    }
    imageInfo(request,n);
}
// --------------------------------------------------------------
movies('popular',0);
movies('top_rated',1);
movies('upcoming',2);



const imageInfo = async (request,n)=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${request}?api_key=${apiKey}`);
    for(let i=1;i<13;i++){
      const sliderImg=sliderAll[n].querySelector(`.slider img:nth-child(${i})`);
      
      const title = res.data.results[i].title;
      const overView = res.data.results[i].overview;
      const rate = res.data.results[i].vote_average;
      const imagePath = res.data.results[i].poster_path;
      const image = `https://image.tmdb.org/t/p/original/${imagePath}`;
    //   ----------making video request-------
    //   const movieID = res.data.results[i].id;
    //   const videoKeyRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`);
    //   const videoKey=videoKeyRes.data.results[0].key;
    //   const videoUrl=`https://www.youtube.com/embed/${videoKey}`
    //   console.log(videoKey)
    // ------------------------
        
      sliderImg.addEventListener('click',()=>{      
      console.log(`img ${i} ${title}`)
      movieTitle.innerHTML=title;
      description.innerHTML=overView;
      moreInfoBtn.title = rate;
     
       
    //   videoContainer.innerHTML=
    //   `     <div class="overlay"></div>
    //   <iframe width="100%" height="100%" src="${videoUrl}?autoplay=1"  allow="autoplay">
    // </iframe> `
      
      videoContainer.innerHTML=
            `     <div class="overlay"></div>
            <img src="${image}" >
            `
      })  
    }
  }

// --------------------Mute buttons----------------------
 mute.addEventListener('click',()=>{
    video.muted=!video.muted;
    if(video.muted== true){
    mute.innerHTML='<img src="assets/icons/mute.svg" alt="" width="30px" >'
    } else {
        mute.innerHTML='<img src="assets/icons/unmute.svg" alt="" width="30px" >'
    }
 })
// ----------------------------------------------------


// --------------------setting up the search input----------------------
 form.addEventListener('submit',async function (e){
    e.preventDefault();
    const searchTerm = form.elements.query.value
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);
    const title = res.data.results[0].title;
    const overView = res.data.results[0].overview;
    const rate = res.data.results[0].vote_average;
    const imagePath = res.data.results[0].poster_path;
    const image = `https://image.tmdb.org/t/p/original/${imagePath}`;
    movieTitle.innerHTML=title;
    description.innerHTML=overView;
    moreInfoBtn.title = rate;
    videoContainer.innerHTML=
    `     <div class="overlay"></div>
    <img src="${image}" >
    `
    })
// ------------------------------------------------------

// --------------------carousel buttons----------------------
let handle;
document.addEventListener('click',(e)=>{
    if (e.target.matches('.handle') ||e.target.closest('.handle') ){
        handle=e.target.closest('.handle')
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


   
 