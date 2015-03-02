/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
var urnprod = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwtYXMtYS1zZXJ2aWNlMjAxNTAxMjYvU3VzcGVuc2lvbi5kd2Y=';
var urnstg = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLTEyLjAyLjIwMTUtMTMuNTUuMDIvQW5hbHl6ZS5kd2Y=';

var _viewer = null;

$(document).ready(function () {

    // indicates if using staging or production environment
    var staging = false;

    // var tokenurl = 'http://' + window.location.host +
    //     '/node/basic/api/' + (staging ? 'tokenstg' : 'token');

    var tokenurl = 'http://still-spire-1606.herokuapp.com/api/rawtoken';
    var config = {

        environment : (staging ? 'AutodeskStaging' : 'AutodeskProduction')
    }

    // instantiate viewer manager
    var adnViewerMng = new Autodesk.ADN.Toolkit.Viewer.AdnViewerManager(
        tokenurl,
        document.getElementById('viewerDiv'),
        config);

    // allows different urn to be passed as url parameter
    var paramUrn = Autodesk.Viewing.Private.getParameterByName('urn');

    var urn = (paramUrn !== '' ? paramUrn : (staging ? urnstg : urnprod));

    adnViewerMng.loadDocument(urn, onViewerInitialized, onError);
});

function onViewerInitialized(viewer)
{
    console.log('Viewer initialized');

    _viewer = viewer;

    // custom toobar config 
    var toolbarConfig = {
            //array of toolbars, this configration contains multi-toolbars
          'toolbars': [ 
            {
                // id of toolbar
              'id': 'toolbar_viewerSubToolbar_1',
              // position of toolbar
              // possible values 'viewer_subToolbar' | 'viewer_canvas' | 'custom_canvas'
              'toolbar_type': 'viewer_subToolbar',
              // css classname of toolbar position, required for | 'viewer_canvas' | 'custom_canvas'
              'position_css_class': '',
              // array of buttons
              'buttons': [
                {
                  'id': 'button1',
                  'buttonText': 'Rotation',
                  'tooltip': 'Ratate the model at X direction',
                  'visible': true,
                  'backgroundImage': './res/icons/lmvdbg1.png',
                  'onClick': function(e){
                     alert('button1 is clicked.');

                  }
                },
                {
                  'id': 'button2',
                  'buttonText': 'explode',
                  'tooltip': 'Explode the model',
                  //'visible': false, //default is true
                  'backgroundImage': './res/icons/lmvdbg2.png',
                  'onClick': function(e){
                     alert('button2 is clicked.');

                  }
                }
              ]
            },
            {
                //Id of toolbar
              'id': 'toolbar_viewerCanvas_1',
              // position of toolbar
              // possible values 'viewer_subToolbar' | 'viewer_canvas' | 'custom_canvas'
              'toolbar_type': 'viewer_canvas',
              // css classname of toolbar position, required for | 'viewer_canvas' | 'custom_canvas'
              'position_css_class': '',
              // array of buttons
              'buttons': [
                {
                  'id': 'button3',
                  'buttonText': 'button3',
                  'tooltip': 'tooltip for button3',
                  'visible': true,
                  'backgroundImage': './res/icons/lmvdbgSolid.png',
                  'onClick': function(e){
                     alert('button3 is clicked.');

                  }
                },
                {
                  'id': 'button4',
                  'buttonText': 'button4',
                  'tooltip': 'tooltip for button4',
                  'visible': true,
                  'backgroundImage': './res/icons/lmvdbgGradient.png',
                  'onClick': function(e){
                     alert('button4 is clicked.');

                  }
                }
              ]
            },
            {
                //Id of toolbar
              'id': 'toolbar_custom_cancas_1',
              // position of toolbar
              // possible values 'viewer_subToolbar' | 'viewer_canvas' | 'custom_canvas'
              'toolbar_type': 'custom_canvas',
              // css classname of toolbar position, required for | 'viewer_canvas' | 'custom_canvas'
              'position_css_class': '',
              // array of buttons
              'buttons': [
                {
                  'id': 'button5',
                  'buttonText': 'Rotation',
                  'tooltip': 'tooltip of button5',
                  'visible': true,
                  'backgroundImage': 'Images/3d_rotation.png',
                  'onClick': function(e){
                     alert('button4 is clicked.');

                  }
                },
                {
                  'id': 'button6',
                  'buttonText': 'Rotation',
                  'tooltip': 'tooltip of button6',
                  'visible': true,
                  'backgroundImage': 'Images/3d_rotation.png',
                  'onClick': function(e){
                     alert('button4 is clicked.');

                  }
                }
              ]
            }
          ]
        };

    var options = {
        'toolbarConfig':toolbarConfig

    };

    //load the toolbar extension
    viewer.loadExtension('Autodesk.ADN.Viewing.Extension.ToolbarExt', options);

    //viewer.loadExtension('Autodesk.ADN.Viewing.Extension.Toolbar', options);







    
};

function onError(error)
{
    console.log(error);
};


// Following code does not rely on Autodesk.ADN.Toolkit.Viewer.AdnViewerManager
// and uses Autodesk API directly

//        $(document).ready(function () {
//
//            var getToken =  function() {
//
//                var xhr = new XMLHttpRequest();
//
//                xhr.open("GET", 'http://' + window.location.host + '/api/token', false);
//                xhr.send(null);
//
//                return xhr.responseText;
//            }
//
//            function initializeViewer(containerId, documentId, role) {
//
//                var viewerContainer = document.getElementById(containerId);
//
//                var viewer = new Autodesk.Viewing.Private.GuiViewer3D(
//                        viewerContainer);
//
//                viewer.start();
//
//                Autodesk.Viewing.Document.load(documentId,
//
//                        function (document) {
//
//                            var rootItem = document.getRootItem();
//
//                            var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
//                                    rootItem,
//                                    { 'type': 'geometry', 'role': role },
//                                    true);
//
//                            viewer.load(document.getViewablePath(geometryItems[0]));
//                        },
//                        // onErrorCallback
//                        function (msg) {
//                            console.log("Error loading document: " + msg);
//                        }
//                );
//            }
//
//            function initialize() {
//
//                var options = {
//                    env: "AutodeskProduction",
//                    getAccessToken: getToken,
//                    refreshToken: getToken
//                };
//
//                Autodesk.Viewing.Initializer(options, function () {
//
//                    initializeViewer('viewerDiv', urn, '3d');
//                });
//            }
//
//            initialize();
//        });
