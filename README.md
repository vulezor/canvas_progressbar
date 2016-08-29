# canvas_progressbar

This is jquery plugin of progress bar. For now we have one configurable view thru options.
After include plugin into page, you can create canvas. 
Give them class or id and just initialize plugin name after selector like on code below.

$('selector_name').mdz_progressbar()

You can override some option to configure your style of mdz_progressbar. Expectation is write like json object below which is default by the way and you can override the rules of that style. 
{
     percent: 0,
     fillColor: '#34495e',
     staticStrokeColor:'#cccccc',
     dynamicStrokeColor:"#19bd9b",
     fontColor:"#FFFFFF",
     textShadow:true,
     fontStyle:"Arial"
}


