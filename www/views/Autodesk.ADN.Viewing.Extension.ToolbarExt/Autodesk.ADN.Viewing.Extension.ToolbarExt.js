//This extension applies v1.2.3 


'use strict';

AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.ToolbarExt = function (viewer, options) {

	//
    Autodesk.Viewing.Extension.call(this, viewer, options);


    ////////////////////////////
    // 
    // private variables
    //
    ////////////////////////////
    var _viewer = viewer;

    var _self = this;

    var _divToolbar = null;
    var _orangeButton = null;

    var _mainViewerSubToolbar = null;

    var _canvasToolbar = null;
    
    var toolbarConfig = null;
 




    _self.load = function () {

        if (!options || !options.toolbarConfig) {
            console.error('toolbarConfig is not found, exiting...');
            return false;

        }



    	//create the toolbars
        _self.createToolbar();

        //add toolbars to UI


        console.log('Autodesk.ADN.Viewing.Extension.ToolbarExt loaded');

        return true;
    };


    _self.createToolbar = function() {

       toolbarConfig = options.toolbarConfig;

   
       //Create each toolbars in toolbar configuration
       for (var i = 0; i < toolbarConfig.toolbars.length; i++) {
          
            //get the toolbar config item
            var toolbarCfg = toolbarConfig.toolbars[i];

            // create a new subToolbar as part of the standard viewer's toolbars.  We will use
            // transparent images for the tool buttons to match the standard style.
            if (toolbarCfg.toolbar_type == 'viewer_subToolbar') {
              
                // get the main toolbar from the viewer
                var mainToolbar = _viewer.getToolbar(true);     

                console.assert(mainToolbar != null);

                var  mainViewerSubToolbar = new Autodesk.Viewing.UI.ControlGroup(toolbarCfg.id);
        
                // create buttons and add to toolbar
                   
                for (var i = 0; i < toolbarCfg.buttons.length; i++) {
                    var buttonCfg = toolbarCfg.buttons[i];

                    var buttonId = buttonCfg.id ? buttonCfg.id : 'viewer_subtoolbar_button_' + i;
                    var button1 = new Autodesk.Viewing.UI.Button(buttonId);
                    

                    //set backgroud image
                    if (typeof buttonCfg.backgroundImage !== 'undefined'){
                        button1.icon.style.backgroundImage = 'url('+ buttonCfg.backgroundImage +')';
                    }

                    //set button tooltip
                    if (typeof buttonCfg.tooltip !== 'undefined'){
                    button1.setToolTip(buttonCfg.tooltip);
                    }

                    //set botton visiblity status
                    if (typeof buttonCfg.visible !== 'undefined'){
                        button1.setVisible(buttonCfg.visible);
                    }

                    button1.onClick = buttonCfg.onClick;

                    mainViewerSubToolbar.addControl(button1);

                }

                mainToolbar.addControl(mainViewerSubToolbar);



            }
            // create toolbar in viewer canvas
            else if(toolbarCfg.toolbar_type == 'viewer_canvas'){

                var canvasToolbar = new Autodesk.Viewing.UI.ToolBar("lmvdbg_canvas_toolbar");

                if (typeof toolbarCfg.position_css_class !== 'undefined' || 
                    toolbarCfg.position_css_class != ''
                    ) {
                    // we need to add a class to this container so we can reposition where we want (see CSS class above)
                    canvasToolbar.addClass(toolbarCfg.position_css_class);   
                }
                else
                {
                    //set default class to this container for the toolbar
                    //TODO: 
                }
                

                // //create buttons and add to toolbar
                // _self.createButtons(toolbarCfg,canvasToolbar);
                   

       
                // var htmlDivContainer = $('<div></div>');
                // htmlDivContainer.style = 'position: relative; top: 10px; left: 0px; z-index: 200;';
                // htmlDivContainer.appendTo(_viewer.container);

                // htmlDivContainer.appendChild(_canvasToolbar.container);
 

            }
            //
            else if(toolbarCfg.toolbar_type == 'custom_canvas'){

            }
            else{
            console.error('unsupported toolbar type.');
            }


       }

        

        
    }


    // //create buttons and add to toolbar
    // _self.createButtons = function(toolbarCfg, toolbar)
    // {
    //     for (var i = 0; i < toolbarCfg.buttons.length; i++) {
    //         var buttonCfg = toolbarCfg.buttons[i];

    //         var buttonId = buttonCfg.id ? buttonCfg.id : 'viewer_subtoolbar_button_' + i;
    //         var button1 = new Autodesk.Viewing.UI.Button(buttonId);
            

    //         //set backgroud image
    //         if (typeof buttonCfg.backgroundImage !== 'undefined'){
    //             button1.icon.style.backgroundImage = 'url('+ buttonCfg.backgroundImage +')';
    //         }

    //         //set button tooltip
    //         if (typeof buttonCfg.tooltip !== 'undefined'){
    //         button1.setToolTip(buttonCfg.tooltip);
    //         }

    //         //set botton visiblity status
    //         if (typeof buttonCfg.visible !== 'undefined'){
    //             button1.setVisible(buttonCfg.visible);
    //         }

    //         button1.onClick = buttonCfg.onClick;

    //         toolbar.addControl(button1);

    //     }
    // };


    _self.removeToolbar = function(){

        toolbarConfig = options.toolbarConfig;

       

       for (var i = 0; i < toolbarConfig.toolbars.length; i++) {
          
            var toolbarCfg = toolbarConfig.toolbars[i];

            if (toolbarCfg.toolbar_type == 'viewer_subToolbar') {
              
                // get the main toolbar from the viewer
                var mainToolbar = _viewer.getToolbar(true);     

                console.assert(mainToolbar != null);

                // this will remove the entire group and take out the corresponding HTML
                mainToolbar.removeControl(toolbarCfg.id);   



            }
            //
            else if(toolbarCfg.toolbar_type == 'viewer_canvas'){

            }
            //
            else if(toolbarCfg.toolbar_type == 'custom_canvas'){

            }
            else{
            console.error('unsupported toolbar type when unloading.');
            }

          
        

       }
    };


    _self.unload = function () {

       // Remove boolbars from UI
        _self.removeToolbar();

        console.log('Autodesk.ADN.Viewing.Extension.ToolbarExt unloaded');

        return true;
    };


};

Autodesk.ADN.Viewing.Extension.ToolbarExt.prototype =
    Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.ToolbarExt.prototype.constructor =
    Autodesk.ADN.Viewing.Extension.ToolbarExt;

Autodesk.Viewing.theExtensionManager.registerExtension(
    'Autodesk.ADN.Viewing.Extension.ToolbarExt',  //extension id
    Autodesk.ADN.Viewing.Extension.ToolbarExt);

