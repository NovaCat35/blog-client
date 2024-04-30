# Wayfarer's Frontier

Life is a beautiful mix of ups and downs. For all its worth, I like to sort out my thoughts, post some projects I'm working on, and collect insights from all walks of lives while I try to make sense of my own. 🧳

This project is a current work in progress  ⚠️ <br>

## Content Links 🚀

- Live Demo: work in progress  ⚠️
- Frontend Client _(You are here)_
- [Backend API ](https://github.com/NovaCat35/blog-api)

## Features 🚀
- Blog pages and Projects
- Sign-up/Login authentication
- Session continuity and authorization with JWT
- Comments

## Build With 🛠️

- React + Vite
- TypeScript
- SCSS module and tailwind
- Unit Testing: vitest

## Goal and Challenges 🔥
One of the primary objectives of this project was to develop a client-side blog site and integrate it with our backend server-side API. While setting up the majority of the backend logic for the blog API, I encountered challenges related to connecting the client to the backend due to CORS not being implemented and overlooking certain considerations during API testing with Postman. For instance, I initially overlooked that Mongoose schema's virtual is a backend-specific element, among other aspects related to routers and api fetching objects. Using old project documents and revisiting the server api for some modifications, I soon was able to get the client side working again.

A important blocking point was trying to figure out how to authenticate user with login/signup. For some reason, when trying to fetch the login auth route, there's server issue with retrieving wrong info. I had to eventually test with inspect on the web and breakpoint messages on the terminal to locate bug issue.

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
   npm install react-paginate
   npm install react-markdown
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

## Image Sources 🌅
lighthouse svg: https://www.remove.bg/upload
Cat images: https://danbooru.donmai.us/posts/4212089