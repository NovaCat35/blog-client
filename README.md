# Wayfarer's Frontier

Life is a beautiful mix of ups and downs. For all its worth, I like to sort out my thoughts, post some projects I'm working on, and collect insights from all walks of life while I try to make sense of my own.

> Dear readers: some of the features from the site are still in the development stage and many more cool features are to come. That said, the current project's progress is fully functional and for showcasing. Disclaimer: most of the blogs have been rough drafted and plugged into ChatGPT to be stylized as I'm more focused on flushing out the site's development. If you have any feedback, please feel free to reach out. Thank you!

Live link: https://wayfarers-frontier.pages.dev/ 🧳

<img width="900" alt="Screenshot 2024-07-30 at 4 55 00 PM" src="https://github.com/user-attachments/assets/57861b42-c558-4d4f-b7c7-e1f79666cb4f">

## Project Links 🔗

- [Site Link](https://wayfarers-frontier.pages.dev/)
- Frontend Client _(You are here)_
- [Backend API](https://github.com/NovaCat35/blog-api)
- [CMS](https://github.com/NovaCat35/blog-cms)

## Features 🎯

- Blog pages and editor
- Sign-up/Login authentication
- Session continuity and authorization with JWT
- Comment section

## Hosting Platforms 🌐

- [Cloudflare](https://dash.cloudflare.com/): for deploying and hosting the application

## Technologies Used 🚀

- **Framework:** React + Vite
- **Program Language:** TypeScript
- **Stylesheet Language:** SCSS module and tailwind
- **Unit Testing:** vitest

## Goal and Challenges 🔥

One of the primary objectives of this project was to develop a client-side blog site and integrate it with our backend server-side API. While setting up the majority of the backend logic for the blog API, I encountered challenges related to connecting the client to the backend due to CORS not being implemented and overlooking certain considerations during API testing with Postman. For instance, I initially overlooked that Mongoose schema's virtual is a backend-specific element, among other aspects related to routers and api fetching objects. Using old project documents and revisiting the server api for some modifications, I soon was able to get the client side working again.

An important turning point for me was trying to figure out how to authenticate user with login/sign-up. For some reason, when trying to fetch the login auth route, there's server issue with retrieving wrong info and status errors. I approach this issue by testing various sections of fetching routes with web inspection and breakpoint messages on the code and terminal to locate the various bug issue. Then I also notice issues with CORS not setup properly on the backend. These two approaches eventually helped me solve these various issues of fetching the correct data.

## Libraries 📚

```
  npm create vite@latest projectName -- --template react-ts
   npm install uuidv4
   npm install date-fns
   npm install --save prop-types
   npm install react-router-dom
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install -D sass
   npm install --save react-lazy-load-image-component
   npm install --save @types/react-lazy-load-image-component
   npm install react-paginate
   npm install react-markdown  (note: Markdown is use for blogs, parser for editor preview, and turndown for converting TinyMCE html output to markdowns for api storage)
   npm install html-react-parser --save
   npm install turndown (For TS: npm i --save-dev @types/turndown)
   npm install --save @tinymce/tinymce-react
```

> Don't forget to modify tailwind.config & create a tailwind.css file

## Unit Test Installation Setups ⚙️

```
   npm install vitest --save-dev
   npm install jsdom --save-dev
   npm install @testing-library/react @testing-library/jest-dom --save-dev
   npm install @testing-library/user-event --save-dev
```

> Make sure you config the above in package.json and vite.config respectively
>
> TESTING: npm test FileName.test.tsx

## Image & Text Sources 🌅

lighthouse svg: https://www.remove.bg/upload

Cat images: https://danbooru.donmai.us/posts/4212089

SVGs: https://www.svgrepo.com/vectors

Rubber Duck: https://unsplash.com/photos/yellow-and-red-plastic-toy-VTvnoNBowZs

Airplane line: https://stock.adobe.com/images/airplane-line-path-vector-travel-line-icon/200894032

Navigation: https://unsplash.com/photos/person-holding-compass-facing-towards-green-pine-trees-_94HLr_QXo8

Sabbatical:
https://unsplash.com/photos/person-walking-on-wooden-pathway-near-mountain-UPapS5-R_rk

Seagulls:
https://www.vexels.com/png-svg/preview/235038/seagull-bird-side-view

Wave generator:
https://www.softr.io/tools/svg-wave-generator
