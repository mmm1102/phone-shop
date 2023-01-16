
  let dugmici=document.querySelectorAll(".btn-add");
  dugmici.forEach(elem => {
    elem.addEventListener("click", addToCart)
  })



function addToCart(){
  let dugme=this;
  let roditelj=dugme.parentElement;
  let slika = roditelj.querySelector(".phone-pic").src;
  let cena=roditelj.querySelector(".phone-price").textContent;
  let naziv=roditelj.querySelector(".phone-title").textContent;

  renderCart(slika, cena, naziv);
  updateTotal();
  
}



  function renderCart(slika, cena, naziv) {

    const row=document.createElement("div");
    row.classList.add("proizvodi-row");

    let naslovi=document.querySelectorAll(".cart-item-title");

    for (let i = 0; i < naslovi.length; i++) {
      if (naslovi[i].textContent == naziv) {
          alert("The product is already in the cart");
          return;
      }
  }

    let ispis=`
    <div class="cart-item cart-column">
    <img src="${slika}" class="cart-item-image" alt="slika telefona">
    <span class="cart-item-title">${naziv}</span>
    </div>
      <div class="cart-price cart-column">${cena}</div>
      
      <div class="cart-quantity cart-column">
      <input type="number" min="1" max="10" value="1" class="cart-quantity-input">
      <button class="btn-korpa">Remove
      </button>
      </div>

    `
    row.innerHTML=ispis;
    document.querySelector(".cart-items").append(row); 
    
    row.querySelector(".btn-korpa").addEventListener("click", brisi);
    row.querySelector(".cart-quantity-input").addEventListener("change",updateTotal);
  }

  function brisi () {


    this.parentElement.parentElement.remove();
    updateTotal ();
  }

  function updateTotal () {
    let cartItems=document.querySelector(".cart-items");
    let rows=cartItems.querySelectorAll(".proizvodi-row");
    let total=0;

    for (let i = 0; i < rows.length; i++) {
      let cenaElementa = rows[i].querySelector(".cart-price").textContent;
      let cena = parseFloat(cenaElementa.substring(0));
      let kolicina = rows[i].querySelector(".cart-quantity-input").value;
      total = total + cena * kolicina;
    }
    document.querySelector(".total-span").textContent = "€" + total;
  }