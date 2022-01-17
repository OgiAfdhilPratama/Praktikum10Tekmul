  
  /*------Toogle Body SCrolling--------*/
  function toggleBodyScrolling(){
      document.body.classList.toggle("hide-scrolling");
  }
  
  
  /*--------FIlter Produk Items-------*/
  const filterBtnsContainer = document.querySelector(".produk-filter");
  let produkItems;
  filterBtnsContainer.addEventListener("click", (e) =>{
      if(e.target.classList.contains("produk-filter-btn") &&
      !e.target.classList.contains("active")){
          filterBtnsContainer.querySelector(".active").classList.remove("active");
          e.target.classList.add("active");
          toggleBodyScrolling();
          document.querySelector(".filter-status").classList.add("active");
          document.querySelector(".filter-status p").innerHTML="SHD PRODUK";
          setTimeout(() => {
            filterItems(e.target); 
          },400);
          setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodyScrolling();
          },800);
           
      }
  });


  function filterItems(filterBtn){
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".produk-item").forEach((item) =>{
        const category = item.getAttribute("data-category").split(",");
        if(category.indexOf(selectedCategory) !== -1 || selectedCategory ==="all"){
            item.classList.add("show");
        }
        else{
            item.classList.remove("show");

        }

    });
    produkItems = document.querySelectorAll(".produk-item.show");
    
}

// filter active category produk items
filterItems(document.querySelector(".produk-filter-btn.active"));


/*-----Produk Item Detail Popup-------*/
let produkItemIndex;
document.addEventListener("click", (e) => {
    if(e.target.closest(".produk-item")){
         const currentItem = e.target.closest(".produk-item");
         produkItemIndex = Array.from(produkItems).indexOf(currentItem);
         togglePopup();
         produkItemDetails();
         updateNextPrevItem();
       
    }
});
function togglePopup(){
    document.querySelector(".produk-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function  produkItemDetails(){
    document.querySelector(".pp-thumbnail img").src =
    produkItems[produkItemIndex].querySelector("img").src;

    document.querySelector(".pp-header h3").innerHTML =
    produkItems[produkItemIndex].querySelector(".produk-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML =
    produkItems[produkItemIndex].querySelector(".produk-item-details").innerHTML;

    document.querySelector(".pp-counter").innerHTML = `${produkItemIndex+1} of ${produkItems.length} (<span title="category">${document.querySelector(".produk-filter-btn.active").innerHTML}</span>)`;
     
}

function  updateNextPrevItem(){
    if(produkItemIndex !== 0){
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML =
        produkItems[produkItemIndex-1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-left img").src =
        produkItems[produkItemIndex-1].querySelector("img").src;


    }
    else{
        document.querySelector(".pp-footer-left").classList.add("hidden");

    }

    if(produkItemIndex !== produkItems.length-1){
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML =
        produkItems[produkItemIndex+1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-right img").src =
        produkItems[produkItemIndex+1].querySelector("img").src;

    }
    else{
        document.querySelector(".pp-footer-right").classList.add("hidden");

    }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () =>{changeProdukItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () =>{ changeProdukItem("next");
});

function changeProdukItem(direction){
    if(direction =="prev"){
        produkItemIndex--;
    }
    else{
        produkItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0,0);
    produkItemDetails();
    updateNextPrevItem();

    },400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);

    }, 1000);
    
}


