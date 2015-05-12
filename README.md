# Autodesk View and Data API Node.js Basic Sample

[![build status](https://api.travis-ci.org/duchangyu/workflow-node.js-view.and.data.api.png)](https://api.travis-ci.org/duchangyu/workflow-node.js-view.and.data.api)



## Description
A sample demonstrating how to view a model in a web application with the Autodesk View & Data API. This web application has a basic Node.js 
server and JavaScript/HTML5 client. This sample does not demonstrate how to upload a model to the Autodesk server for translation. See instructions below 
to prepare a model to be consumed in this sample.


## Dependencies
Install Node.js on your machine and clone this repo. Download the project dependencies using npm before running the app by running 
the following command in the project root directory
```
npm install
```
on the node.js console. This will install the following node.js modules in the project:
- express
- request
- serve-favicon

This sample does not include the workflow of uploading models. on the server It depends on other workflow samples to upload models and 
get model URNs - as explained in the Setup/Usage Instructions.


## Setup/Usage Instructions
 
* Apply for your own credentials (API keys) from [http://developer.autodesk.com](http://developer.autodesk.com)

* Replace the placeholder with your own keys in run.sh(for Mac/Linux) or run.bat(for Windows), 

  ```
ConsumerKey=replace_with_your_consumer_key \
ConsumerSecret=replace_with_your_secret_key \
BaseUrl=https://developer.api.autodesk.com \
node server.js
  ```
* Upload one of your models to your account and get its URN using another workflow sample, for example,
  - [this workflow sample in .Net WPF application](https://github.com/Developer-Autodesk/workflow-wpf-view.and.data.api) if you are using windows 
  - or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac
  - or this [WEB page](http://models.autodesk.io)
* Copy the URN which was generated in the previous step in file /www/index.js at line #18

  ```
    var defaultUrn = 'replace with your encoded urn';
  ```
* Run the server from the Node.js console, by running the following command(For Mac):
  
  ```
    $ chmod +x run.sh
    $ ./run.sh
  ```
  
  For windows, run the "run.bat" from command window

  ```
    run.bat
  ```
* Connect to you local server using a WebGL-compatible browser: [http://localhost:3000/](http://localhost:3000/)


This sample can also work with the Autodesk staging server (vs production) or work with someone else's credentials as long you can get a valid token. 
By default, the project is setup with the production server, and use your own credentials. If you are interested by a different setup, see the Options below.

## Options

You can work with production or staging Autodesk View and Data environments. By default, the project is setup with the production server.

* Instructions to setup this sample to use the Autodesk View & Data staging server are [here](README-stg.md) 


If you are in a hurry, do not want to translate your own models, you can try our prepared models. You need use the access token generated from someone else credentials to view models using this sample.

* Instructions to setup this sample using someone else credentials are available [here](README-option.md) 


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


## Written by 

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)  <br />
(Autodesk Developer Network)

