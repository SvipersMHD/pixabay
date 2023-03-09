const inputSearch = document.querySelector('.shearchbar input')
const btnSearch = document.querySelector('.shearchbar button')
const radioImg = document.querySelector('.radioImg')
const radioVideo = document.querySelector('.radioVideo')
const imgWrapper = document.querySelector('.img__wrapper')
const header = document.querySelector('.header')
const main = document.querySelector('.main')
const footer = document.querySelector('.footer')

function affichageRecherche(){
   header.style.height = "50vh"
   main.style.padding = "50px 0"
   footer.style.display = "flex"
}

function recherche(){
   let inputValueWEspace = inputSearch.value
   let inputValueRempl = inputValueWEspace.replace(' ', "+")
   let inputValue = inputValueRempl
   
   if(radioImg.checked){
      
      imgWrapper.innerHTML =""
      
      fetch(`https://pixabay.com/api/?key=34258708-7d82d762faefbd38adea8aaa5&q=${inputValue}&image_type=photo`)
      .then(response => response.json())
      .then(data => {
         console.log(data);
         
         for(let i = 0; i < 20; i++){
            let imgSearch =
            `
            <div class="img__box">
            <img src="${data.hits[i].webformatURL}" alt="">
            <a href="${data.hits[i].pageURL}" target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            </div>
            
            `
            imgWrapper.innerHTML += imgSearch    
         }
      })
      .catch(error => {
         console.error('Erreur lors de la récupération des données :', error); 
      });
   }
   else if (radioVideo.checked) {
      imgWrapper.innerHTML =""
      fetch(`https://pixabay.com/api/videos/?key=34258708-7d82d762faefbd38adea8aaa5&q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
         for(let i = 0; i < 20; i++){
            videoShearch =
            `
            <div class="img__box">
            <img src="https://i.vimeocdn.com/video/${data.hits[i].picture_id}_295x166.jpg" alt="">
            <a href="${data.hits[i].pageURL}" target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            </div>
            `
            // <video src="${data.hits[i].videos.medium.url}" controls></video>
            imgWrapper.innerHTML += videoShearch  
         }
      })
      .catch(error => {
         console.error('Erreur lors de la récupération des données :', error); 
      });
   }
   
   
   inputSearch.value =""
}

addEventListener('keypress', function(event) {
   if (event.key === 'Enter') {
      affichageRecherche()
      recherche()
   }
});
btnSearch.addEventListener('click', () => {
   affichageRecherche()
   recherche()
});
