// A version number is used to manage caches.
const CACHE_NAME = 'business-builder-cache-v1';

// A list of all the files and assets the app needs to run offline.
const URLS_TO_CACHE = [
  '/', // Caches the root URL
  '/index.html', // Caches the main PWA file
  '/compass.html', // Caches the compass tool file
  '/manifest.json', // Caches the PWA manifest
  '/resources.json', // Caches the configuration file
  '/icon-192.png', // Corrected icon path and name
  '/icon-512.png', // Corrected icon path and name
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap' // Caches the font file
];

// --- INSTALL EVENT ---
// This event runs when the service worker is first installed.
// It opens a cache and adds all our essential files to it.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event in progress.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Opened cache and caching app shell files:', URLS_TO_CACHE);
        // Use { cache: 'reload' } to ensure fresh copies are fetched during install
        return Promise.all(
             URLS_TO_CACHE.map(url => cache.add(new Request(url, {cache: 'reload'})))
         );
      })
      .then(() => {
        console.log('Service Worker: Installation complete.');
        //