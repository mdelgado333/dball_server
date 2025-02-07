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
| `GET` | `/user/profile` | userOwnProfile | True | All | 
| `PATCH`| `/user/profile/editProfile` | EditOwnProfile | True | All | 
| `DELETE`| `/user/deleteProfile` | deleteOwnProfile | True | All | 
| `GET`| `/user` | allProfiles | True | Admin | 
| `GET`| `/user/:id` | anyUserProfile | True | Admin | 
| `PATCH`| `/user/:id/editProfile` | editAnyUserProfile | True | Admin | 
| `DELETE`| `/user/:id/editProfile` | deleteAnyUserProfile | True | Admin | 

### Learning

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/learning` | display all learnings | True | All | 
| `POST` | `/learning/newLearning` | create a learning | True | ADMIN | 
| `GET` | `/learning/:id` | display a learning | True | All | 
| `PATCH` | `/learning/:id/editLearning` | edit the contents of a learning | True | ADMIN | 
| `DELETE` | `/learning/:id/deleteLearning` | delete a learning | True | ADMIN | 

### Unit

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/unit` | display all units | True | All | 
| `POST` | `/unit/newUnit` | create a unit | True | ADMIN | 
| `GET` | `/unit/:id` | display a unit | True | All | 
| `PATCH` | `/unit/:id/editUnit` | edit the contents of a unit | True | ADMIN | 
| `PATCH` | `/unit/:id/addLearning` | add a Learning to the Unit | True | ADMIN | 
| `PATCH` | `/unit/:id/deleteLearning` | delete a Learning from the Unit | True | ADMIN | 
| `DELETE` | `/unit/:id/deleteUnit` | delete a unit | True | ADMIN | 

### Course

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/course` | display all courses | True | All | 
| `POST` | `/course/newCourse` | create a course | True | ADMIN | 
| `GET` | `/course/:id` | display a course | True | All | 
| `PATCH` | `/course/:id/editCourse` | edit the contents of a course | True | ADMIN | 
| `PATCH` | `/unit/:id/addUnit` | add a Unit to the Course | True | ADMIN |
| `PATCH` | `/unit/:id/deleteUnit` | delete a Unit from the Course | True | ADMIN |
| `DELETE` | `/unit/:id/deleteCourse` | delete a unit | True | ADMIN | 

### Exercise

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/exercise` | display all exercises | True | All |
| `POST` | `/exercise/newExercise` | create a exercise | True | ADMIN |
| `GET` | `/exercise/:id` | display a exercise | True | All |
| `PATCH` | `/exercise/:id/editExercise` | edit the contents of a exercise | True | ADMIN |
| `DELETE` | `/exercise/:id/deleteExercise` | delete a exercise | True | ADMIN |

### Workout

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/workout` | display all workouts | True | All | 
| `POST` | `/workout/newWorkout` | create a workout | True | ADMIN | 
| `GET` | `/workout/:id` | display a workout | True | All | 
| `PATCH` | `/workout/:id/editWorkout` | edit the contents of a workout | True | ADMIN | 
| `PATCH` | `/workout/:id/addExercise` | add a Exercise to the Workout | True | ADMIN | 
| `PATCH` | `/workout/:id/deleteExercise` | delete a Exercise from the Workout | True | ADMIN | 
| `DELETE` | `/workout/:id/deleteWorkout` | delete a Workout | True | ADMIN | 

### Cycle

| Method | URL | Description | Protected | Roles |
|--------|-----|-------------|-----------|-------|
| `GET` | `/cycle` | display all cycles | True | All | 
| `POST` | `/cycle/newCycle` | create a cycle | True | ADMIN | 
| `GET` | `/cycle/:id` | display a cycle | True | All | 
| `PATCH` | `/cycle/:id/editCycle` | edit the contents of a cycle | True | ADMIN | 
| `PATCH` | `/cycle/:id/addWorkout` | add a Workout to the Cycle | True | ADMIN | 
| `PATCH` | `/cycle/:id/deleteWorkout` | delete a Workout from the Cycle | True | ADMIN | 
| `DELETE` | `/unit/:id/deleteCourse` | delete a unit | True | ADMIN | 