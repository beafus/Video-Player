

(function (videoapi) { 


	videoapi.Clip = function(id, name, description, contenturl, thumburl) {

		this.id = id;
		this.name = name;
		this.description = description
		this.contenturl= contenturl;
		this.thumburl = thumburl;

	};




	videoapi.clips = [];


	videoapi.start = function(hookElementSelection, dataurlForJsonFile) {
	
		videoapi.clips = [];
		$.ajax({url:dataurlForJsonFile}).success(function(data) {


			parseJSONData(data);
			renderClips(hookElementSelection);
			renderNonWatchedClipsFirst(hookElementSelection); 

		});
	};


	var parseJSONData = function(data) {
		var clips = data;

		$.each(clips , function(i,clip) {
			var aCLip = new videoapi.Clip(clip.id, clip.name, clip.description, clip['content-url'], clip['thumb-url']) ;
			videoapi.clips.push(aCLip);
		});	
	}




	var renderClips = function(base) {

		theatremode = false;


		$.each(videoapi.clips, function(i,clip) {

			currentcontent =  clip.contenturl; 
	

		//when you click a thumb, its video must be displayed.
			videoapi.playVideo = function(index) {


				
				$("#media-controls").show();

				var renderSelectedVideo = $('#videoSelected'); 
				var renderSelectedDescription = $('#descriptionSelected')

				renderSelectedVideo.empty();
				renderSelectedDescription.empty();

				var currentclipId = videoapi.clips[index].id; 
				var currentclipName = videoapi.clips[index].name; 
				var currentclipDescription = videoapi.clips[index].description; 
				var currentclip = videoapi.clips[index].contenturl; 

				

				var value = localStorage.getItem("videoWatched");



				value = value || 0;


				var newvalue = currentclipId;
				value = value +"##" + newvalue;
				

				window.incrementDataStore = localStorage.setItem("videoWatched", value);

				$("#videoHook").html("");
				renderNonWatchedClipsFirst($("#videoHook"));
        	

        		var nameHTML = $("<h4 class='videotitle'><b>" + currentclipName+ "</b></h4>");
       			var descriptionHTML = $("<h4 id='description'>" + currentclipDescription + "</h4>");
				var renderVideo = $("<video id='videoElement'  width=854 height=480 controls><source src = ' "+ currentclip + " ' type= 'video/ogg'></video>");
		

				renderSelectedDescription.append(descriptionHTML);


				renderSelectedVideo.append(nameHTML);
				renderSelectedVideo.append(renderVideo);



				var playPauseBtn;
				var progressBar;

				var j_VideoElement= $("#videoElement");
				var videoElement= j_VideoElement[0];
				videoElement.load();

	




				videoapi.updateProgressBar =  function() {

					var videoElement = this;


					

	

	 				var progressBar = $('#progress-bar');	
					var percentage = Math.floor((100 / videoElement.duration) * videoElement.currentTime);

					var videoDuration = videoElement.duration;
					var showDescriptionTime = videoDuration * 0.25 ;

					if (percentage==25){

						$('#videoSelected').append(descriptionHTML);

						if(theatremode==true){
								$("#description").addClass("descriptionTheatre");
						}

					}

					progressBar.attr("value", percentage);
	
					progressBar.innerHTML = percentage + '% played';

				}




				videoapi.initialiseMediaPlayer = function(videoElement) {



					if($("#videoElement source").attr("src")==localStorage.getItem("video")) {

						videoElement.currentTime = localStorage.getItem("time");

					}


					progressBar = $('#progress-bar');
					playPauseBtn = $('#play-pause-button');


					videoElement.controls = false;

					videoElement.addEventListener('timeupdate', videoapi.updateProgressBar, false);

					videoElement.addEventListener('play',function(){
					
	
						videoapi.changeButtonType( 'pause');
					},false);


					videoElement.addEventListener('pause',function(){
	
						videoapi.changeButtonType('play');
					},false);

					

					videoElement.addEventListener('ended', function() { 


						if (theatremode==true){

								videoapi.playVideo((index+1) % videoapi.clips.length);

						}

						videoElement.pause(); 

						}, false);

					videoElement.play(); 


				}



		videoapi.initialiseMediaPlayer(videoElement);

	



		videoapi.playpause = function() {

			if (videoElement.paused ) {

				videoapi.changeButtonType( 'pause');
				videoElement.play();
				
			}

			else if ( videoElement.ended){
				videoapi.changeButtonType( 'pause');
				videoElement.play();
			}
	
			else {
	

				videoapi.changeButtonType( 'play');
				videoElement.pause();

				// When paused I want to store the current time and the video source 
				var pausedTime = videoElement.currentTime;
			    var videoPaused= $("#videoElement source").attr("src");
			 

				localStorage.time = pausedTime;
				localStorage.video = videoPaused;
		
			}

	
		}



		videoapi.changeButtonType = function(value) {

			$("#play-pause-button").attr("class",value);

		}



		videoapi.stop =function() {

			videoElement.pause();
			videoElement.currentTime = 0;

		}

		videoapi.theatre = function(){

			if(theatremode==false ){

				theatremode=true;

				$("#watchedFirst").hide();
				$("#nonWatched").hide();
				$("#welcome").hide();



				$("#videoSelected").addClass("theatre");
				$("#media-controls").addClass("controlsTheatre");
				$("#description").addClass("descriptionTheatre");
				$("#descriptionNoAnim").addClass("descriptionTheatre");
				

			}else{

				theatremode=false;

				$("#watchedFirst").show();
				$("#nonWatched").show();
				$("#welcome").show();


				$("#videoSelected").removeClass("theatre");
				$("#media-controls").removeClass("controlsTheatre");
				$("#description").removeClass("descriptionTheatre");
				$("#descriptionNoAnim").removeClass("descriptionTheatre");


			}

		}


	}//fin play video


	});// end each

}//end render 






var renderNonWatchedClipsFirst = function(base) {

	
	var watchedvideos = [];

	 if(localStorage.getItem("videoWatched")){
	 	
	 		 watchedvideos = localStorage.getItem("videoWatched").split("##");

	 }

	var myfinalHTML = $('#nonWatched'); 
	myfinalHTML.empty();
	var finalHTML = $('#watchedFirst');
	finalHTML.empty();


	$.each(videoapi.clips, function(i,clip) {

	 	var myID = clip.id;
	 	var indexFound = jQuery.inArray(myID, watchedvideos);

	

	 	if(indexFound == -1) {

	 		var currentclipthumb = videoapi.clips[i].thumburl; 
			var renderNonWatchedThumb = $("<img id='"+clip.id+"' class='col-md-2'  onclick='videoapi.playVideo("+i+")'  src = ' "+ currentclipthumb+" ' />");
		 	myfinalHTML.append(renderNonWatchedThumb);
	 		
			
		} else {
			var currentclipthumb = videoapi.clips[i].thumburl; 
			var renderWatchedThumb = $("<img id='"+clip.id+"' class='col-md-2'  onclick='videoapi.playVideo("+i+")'  src = ' "+ currentclipthumb+" ' />");
			finalHTML.append(renderWatchedThumb);
		
			

		}

	});

}


function supports_html5_storage() {
	try {
		return 'localStorage' in window && window.localStorage !== null;
	} catch (e) {
		return false;
	}
}


})(window.videoapi = window.videoapi || {} );


























