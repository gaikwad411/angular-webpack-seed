# angular-webpack-seed
It is seed/template project for angular(version 1) application where resources are bunduled using webpack(version 2).
Following libs are already added to the project
1. Bootstrap 3 (sass for customizations)
2. Font-awesome
3. Jade 
4. Sass
5. Developement Server

## Directory structure
src/ ==> contains all the sources
	app/ ==> contains application main module's js, css 
	config/ ==> configuration files
	modules/ ==> other modules developed 
	app.yaml ==> For google app engine, you can directly upload the /dist folder on google app engine.
	app_init.js ==> trigger file for webpack
	index.html ==> App index html file
dist/ ==> build copy of src directory, this should be served by web server.


## Gettings Started ##
### Install node dependencies ###
```npm install```

### Bower components install ###
First change the dir to src/app
```bower install```

### Start the app ###
```npm run start-dev```
It will open browser tab with URL http://localhost:9000.

