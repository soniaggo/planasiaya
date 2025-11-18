// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate', // el SW se actualiza solo cuando hagas deploy nuevo
//       includeAssets: [
//         'favicon.ico',
//         'robots.txt',
//         'apple-touch-icon.png',
//       ],
//       manifest: {
//         name: 'PlanAsiaYa',
//         short_name: 'PlanAsiaYa',
//         description:
//           'Queda con otros viajeros en Asia en tiempo real. Chats por ciudad, quedadas y comunidad mochilera.',
//         theme_color: '#0f172a',
//         background_color: '#0f172a',
//         display: 'standalone',
//         orientation: 'portrait',
//         start_url: '/',
//         scope: '/',
//         icons: [
//           {
//             src: '/icons/icon-192x192.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//           {
//             src: '/icons/icon-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//           },
//           {
//             src: '/icons/icon-512x512-maskable.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'maskable',
//           },
//         ],
//       },
//       workbox: {
//         // Caché básica para estáticos (JS/CSS/imágenes)
//         runtimeCaching: [
//           {
//             urlPattern: ({ request }) =>
//               request.destination === 'script' ||
//               request.destination === 'style' ||
//               request.destination === 'image',
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'static-resources',
//               expiration: {
//                 maxEntries: 100,
//                 maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
//               },
//             },
//           },
//           {
//             // HTML / navegación → primero red, si no, caché
//             urlPattern: ({ request }) => request.mode === 'navigate',
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'html-pages',
//             },
//           },
//         ],
//       },
//     }),
//   ],
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // 👇 AHORA la app vive en la raíz del dominio: https://app.planasiaya.com
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        id: '/',
        name: 'PlanAsiaYa',
        short_name: 'PlanAsiaYa',
        description:
          'Queda con otros viajeros en Asia en tiempo real. Chats por ciudad, quedadas y comunidad mochilera.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        lang: 'es',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});


