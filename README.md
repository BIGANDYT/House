# House 

A JavaScript application simulating house automation: pressing a button on
a control panel would visually turn on a light, change the temperature or 
close the curtains.
The application has two parts a control knob to define the settings for the app.
And the app in the form of an image and optional audio file.
App definitions are specified in the House.xml file

## Demo

 [Hosted Demo](http://sitecoreci.cloudapp.net:8080/HouseTest/)

## Example

```xml
<app>
		<title>sonos</title>
		<image>assets/img/sonos.png</image>
		<audio>assets/mp3/aem.mp3</audio>		
		<value>0</value>
		<min>0</min>
		<max>100</max>
		<controlwidth>200</controlwidth>
		<controlheight>200</controlheight>
		<controlcolor>#E32636</controlcolor>
</app>
```

## Options

* title : the app title
*	image : the image to use for the app
*	audio : an optional audio file to control the volume of
*	value : the initial value
*	min : the minimum value to control can be set to
*	max : the maximum value to control can be set to
*	controlwidth : the width of the control
*	controlheight : the height of the control
*	controlcolor : the colour of the control

## Running

The app uses maven to build, run and run code analysis.

*	To run using maven: mvn clean verify org.codehaus.cargo:cargo-maven2-plugin:run
*	 To run analysis using sonar & maven: mvn clean sonar:sonar

## Links

* [SonarQube Source analysis](http://sitecoreci.cloudapp.net:9000/dashboard/index/3170/)
* [BuildServer](http://sitecoreci.cloudapp.net:8075/project.html?projectId=House&tab=projectOverview/)
* [Zip Distribution - All you need to run](https://www.dropbox.com/s/gdtqtfyahbhrbt8/Test.zip?dl=0)

## Supported browser

Tested on Chrome, IE10, Edge
