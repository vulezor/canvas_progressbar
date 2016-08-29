# canvas_progressbar

This is jquery plugin of progress bar. For now we have one configurable view thru options.
After include plugin into page, you can create canvas. 
Give them class or id and just initialize plugin name after selector like on code below.

$('#selector_name').mdz_progressbar()

You can override some option to configure your style of mdz_progressbar. Expectation is write like json object below which is default by the way and you can override the rules of that style. 
```javascript
{
     percent: 0,
     fillColor: '#34495e',
     staticStrokeColor:'#cccccc',
     dynamicStrokeColor:"#19bd9b",
     fontColor:"#FFFFFF",
     textShadow:true,
     fontStyle:"Arial"
}
```
Tip:
If you declare your initial function like on example below

var canvas1 = $('#selector_name').mdz_progressbar()

In code you can update and animate your result like on call method below.

canvas1.data('plugin_mdz_progressbar').addValue(80);

![2016-08-29_055156](https://cloud.githubusercontent.com/assets/3845100/18040323/c8aceb56-6dac-11e6-920b-00e567ec9987.png)
