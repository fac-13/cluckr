
/* eslint-disable */
const main = document.querySelector('main');
const tryMeButton = document.getElementById('button__tryMe');
const randomGiftButton = document.getElementById('button__randomGift'); 

let content = localStorage.getItem('content')
  ? JSON.parse(localStorage.getItem('content'))
  : {};


/**
 * Check if there is a service worker and register it
 */

const fetchContent = (url) => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data)
      content = data;
      storeContent(content);
      renderContent(content); 
    });
};

if ('serviceWorker' in navigator) {
  fetchContent('/api/firstContent')
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker Registered');
  });
}

if (location.url == "/") {
  tryMeButton.addEventListener('click', (e) => console.log(e));
};

/**
 * Add event listeer to randomGiftButton to check if the user is online 
 */
if (location.url == '/try') {
  randomGiftButton.addEventListener('click', () => {
    checkOffline(); 
  }); 
}


/**
 * Check if user is online, if offline open dialog box
 */
const checkOffline = () => {
  console.log("Checkoffline reached"); 
  if (!navigator.onLine) {
    console.log("You are offline"); 
    const dialog = document.querySelector('dialog'); 
    setTimeout(() => {
      dialog.show();
    }, 500);
    setTimeout(() => {
      dialog.close();
    }, 4000);
  } else {
    console.log("You are online");
    fetchContent('/api/content'); 
  }
}


/**
 * fetch API content from server
 */

/**
 * stores content in localStorage
 */
const storeContent = () => {
  console.log("Store Content reached")
  localStorage.setItem('content', JSON.stringify(content));
};


/**
 * @param  {} content - content stored in localStorage 
 * Render content on the page 
 */
const renderContent = (content) => {
  console.log("Rendercontent reached")
  const section = document.querySelector('section'); 
  content.placeholder.map((el) => {
    const giphy = `<img src=${el} alt="Giphy" height="200" />`
    section.insertAdjacentHTML('beforeend', giphy);
  })
};


