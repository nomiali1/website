// Sample Products
const products = [
  {id:1, name:"Men T-Shirt", category:"men", price:20, image:"https://via.placeholder.com/200"},
  {id:2, name:"Women Dress", category:"women", price:35, image:"https://via.placeholder.com/200"},
  {id:3, name:"Kids Toy", category:"kids", price:15, image:"https://via.placeholder.com/200"},
  {id:4, name:"Men Shoes", category:"men", price:50, image:"https://via.placeholder.com/200"},
  {id:5, name:"Women Bag", category:"women", price:40, image:"https://via.placeholder.com/200"}
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = cart.length);
}
updateCartCount();

// Shop Page
const productList = document.getElementById('product-list');
if(productList){
  function displayProducts(items){
    productList.innerHTML = '';
    items.forEach(p=>{
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <a href="product.html?id=${p.id}">View</a>
      `;
      productList.appendChild(div);
    });
  }

  displayProducts(products);

  // Filter
  document.getElementById('category-filter').addEventListener('change', e=>{
    const cat = e.target.value;
    displayProducts(cat==='all' ? products : products.filter(p=>p.category===cat));
  });

  // Search
  document.getElementById('search').addEventListener('input', e=>{
    const search = e.target.value.toLowerCase();
    displayProducts(products.filter(p=>p.name.toLowerCase().includes(search)));
  });
}

// Product Detail Page
const productDetail = document.getElementById('product-detail');
if(productDetail){
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const p = products.find(pr => pr.id===id);
  if(p){
    productDetail.innerHTML = `
      <h2>${p.name}</h2>
      <img src="${p.image}" alt="${p.name}">
      <p>Price: $${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
  }
}

// Cart Page
const cartItemsDiv = document.getElementById('cart-items');
if(cartItemsDiv){
  function displayCart(){
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item=>{
      const p = products.find(pr => pr.id === item.id);
      total += p.price;
      const div = document.createElement('div');
      div.innerHTML = `<p>${p.name} - $${p.price}</p>`;
      cartItemsDiv.appendChild(div);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
  }
  displayCart();
}

function addToCart(id){
  cart.push({id});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Product added to cart');
}

function checkout(){
  alert('Checkout complete!');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  if(cartItemsDiv) displayCart();
}
