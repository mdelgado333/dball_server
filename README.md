# DBALL (Basketball Workout app) 🏀📱

## About

<p>DBALL is a basketball workout application that can be both viewed on a smartphone(both Android and IOS) or on a desktop PC through a web browser due to the use of React Native.</p>

<p>In this app, users will be not only able of following a full basketball workout on their own with all the reps and sets included as well as exercise explanation through video but also they will be able of learnign more about the game they love, through theorical basketball lessons divided on small doses called micro-learnings made to ensure progress</p>

<p>Apart from that, at the end of the day basketball is a sport and if you wanna become great at it, not only you have to level up your skills, you also have to bring your physique level up too, that's why you will find a separation in our app between pure basketball and physical training but always focused towards obtaining a better overall performance output</p>

## Languages and Tools

<p align="left">
 
 <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> 
  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> 
 </a>

 <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> 
  <img src="https://github.com/devicons/devicon/raw/master/icons/css3/css3-plain-wordmark.svg" title="CSS3" alt="CSS" width="40" height="40" style="max-width: 100%;">
 </a>
 
 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>  </a>



<a href="https://es.reactjs.org/" target="_blank" rel="noreferrer"> 
  <img src="https://github.com/devicons/devicon/raw/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"></a>
  

<a href="https://reactnative.dev/" target="_blank" rel="noreferrer"> 
 <img src="https://worldvectorlogo.com/es/logo/react-native-1" alt="bootstrap" width="40" height="40"/> </a>
 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 
 </a> 
 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> 
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
 
 <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>  </a>
 
</p>

## Routes (Back-end)

### Auth
| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `POST` | `/auth/signup` | Signup | False |  | 
| `POST`| `/auth/login` | Login | False | All | 
| `GET` | `/auth/verify` | Login | True | All | 

### User

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/user/profile` | Profile | True | All | 
| `PUT`| `/user/editProfile` | EditProfile | False | All | 