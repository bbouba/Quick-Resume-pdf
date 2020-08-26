# Quick-Resume-pdf
    This web site is build to help user creating a quickly a professionnal resume in differents style with pdf format.

## Technologies
The App use these technologies: Nodejs, MongoDB, ExpressJS, ReactJS, React-Bootstrap

### Clone The App
To clone it, run this commande line in you terminal
```
git clone https://github.com/bbouba/Quick-Resume-pdf.git
```
### Structure
The App is divided in two part:
#### Backend part
The folder that name server/ represent the backend part. Inside that folder in your terminal, execute:
```
npm install
```
to install all packages. After that, add the .env file inside with these configurations:
```
*   MONGODB_KEY=XXXXX           (database access link)
*   ACCESS_TOKEN_KEY=XXXXX      
*   REFRESH_TOKEN_KEY=XXXXX

    To genarate the both tokens keys, on the termonal runfirst node and (require('crypto').randomBytes( XX ).toString('hex')) two times
    but for each key. copy the keys and put it for each token key.
    replace XX by the length of the key
```

#### Frontend part
The folder that name /resume represente the frontend part. Inside that folder  in your terminal, execute:
```
npm install
```

Now you can use and improve the App.

