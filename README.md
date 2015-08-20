# Video-Player
This web application is a HTML 5 video player built using JavaScript,  CSS and jQuery animations. 
A JavaScript library has created a custom video player that will load a selection of movies and enable the user to select a movie to play
Videos will be displayed from the day’s top headlines, and users will be able to pick one of the videos they have not scene before to view it – and additional information about the video will become visible as the video plays.
## How to run the app 
**(this applies to a MAC computer, it should be similar in Windows and Linux)**
The project has two main folders, www and server. In order to tun the application, after downloadind the folder open you terminal.
* Access to the server folder
  * For example if you have downloaded the project into your Desktop you should do:
    1. cd Desktop
    2. cd Project
    3. cd server
  * Once you are there you should run the following:
    1. #!/bin/bash
    2. ./bin/node server.js
  * After that you should see something like this
    * Static file server running at => http://localhost:8888/
  * Now go to your browser and copy that http address followed by myvideo.html
    *  http://localhost:8888/myvideo.html
    
##  How it is done

 * The list of videos are obtained from downloading and parsing the supplied AJAX file
 * Each video has a thumbnail and the main video  also displays a title
 * The video description appears on the video after the video has completed by 25% and uses a css3 animation to slide in from the left.
 * The videos the user has watched on their browser are  stored in localStorage so those
 are displayed at the end of the list (displaying unwatched videos first)
 * There is a full implementation of a complete custom set of video player controls – including:
   * Play/Pause Button
   * Progress Bar
   * Stop button
   * Full screen mode / theatre mode
 * When a video has finished the next video is displayed
 * Also the progress of the current video is stored in localstorage when paused, so you can 
 re-seek to its saved progress if the page is refreshed or otherwise loaded again.


 
 
    


