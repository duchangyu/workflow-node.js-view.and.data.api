<b>
This README explains how to setup the sample to use the Staging environment vs Production.<br />
It is a configuration which works only for people having access to the staging environment (Autodesk internal only)
</b>
<br />


# Autodesk View and Data API Node.js Basic Sample

This setup is only available for people having access to the staging server. If you do not have credentials for the staging server, do not use these instructions.


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
 
* Apply for your own credentials (API keys) from [http://developer-stg.autodesk.com](http://developer-stg.autodesk.com)
* Replace the placeholder with your own keys in run.sh(for Mac/Linux) or run.bat(for Windows), 

  ```
ConsumerKey=replace_with_your_consumer_key \
ConsumerSecret=replace_with_your_secret_key \
BaseUrl=https://developer-stg.api.autodesk.com \
node server.js
  ```

* Upload one of your models to your account and get its URN using another workflow sample, for example,
  - [this workflow sample in .Net WPF application](https://github.com/Developer-Autodesk/workflow-wpf-view.and.data.api) if you are using windows 
  - or [this workflow sample in Mac OS Swift](https://github.com/Developer-Autodesk/workflow-macos-swift-view.and.data.api) if you are using Mac.

  Please note that you also need to change the base url to https://developer-stg.api.autodesk.com and replace your consumer key and secret on staging.

* Copy the URN which was generated in the previous step in  file /www/index.js at line #18 <br />
  ```
  var defaultUrn = '<replace with your encoded urn>';
  ```
* In file /www/index.html (line #33 and #34), use the viewer3D.min.js and style.css files from the staging server, but using the code below <br />
  ```
  <link type="text/css" rel="stylesheet" href="https://developer-stg.api.autodesk.com/viewingservice/v1/viewers/style.css"/>
  
  <script src="https://developer-stg.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js"></script>
  ```
* In file /www/index.js, comment out line #23, and uncomment line #24
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


## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


## Written by 

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)  <br />
(Autodesk Developer Network)


