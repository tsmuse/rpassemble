# RPAssemble

RPAssemble is a pre-configured setup for building rapid HTML/CSS prototypes. RP == Rapid Prototype, Assemble == the Assemble framework that it's built on top of. Easy peasy.

## What is this?

### v.0.0.1 -- current version

Right now this is a barebones scaffold: assemblefile.js and a package.json that will build and watch the contents of the pages, layouts, partials, data, and assets folders and builds them into pages in the dist folder. It still requires the command line and node to be installed to run. This will be the functional foundation for the future Electron app.

## Why?

My goal is to build an easy to use graphic tool that will allow anyone with interest the ability to build basic HTML/CSS prototypes (or websites) in a modular way. Modularity is key to rapid prototyping, as having to build the same structures multiple times is what tends to make building basic prototypes in code time consuming. Modularity also allows for sharing and remixing that is really important for creating and exploring new ideas.

The barriers to entry for HTML and CSS are very low, but modularity is a feature that has a high technical cost to implement. For people who are not interested in writing applications but just expressing ideas in code, this barrier can be impassible. If all those dependencies could be packed up and pre-configured, then the barriers to building modularly with basic HTML and CSS drop considerably.

## How is it installed?

Right now the application requires you to install Node.JS first.

Once you have node installed, put this repo's contents into whatever folder you want and then install all the dependencies with

  npm install

After all the dependencies are installed you simply run the application with

  assemble

The script will run in watch mode and auto-reload your default browser via BrowserSync.

## How is it used?

Right now there aren't a lot of options without you modifying the assemblefile.js. All of the output is written to the dist folder. This scaffold uses Handlebars files to templates and Sass for stylesheets. Basic reusable layouts are sources from the layouts folder. Partials that you write are pulled from the partials folder. Any actual page you want to build must live in the pages folder. Any sub-folders you use in these three folders will be passed on after build. All the sass you write will have browser prefixes applied to them and written as CSS files in the dist/css folder.

Run the script and then add and update files as needed.
