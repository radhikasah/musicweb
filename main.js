$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
		function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
	
	function toggleSong() {                                        /*hamne ek function bana jiska name he toggleSong*/
				var song = document.querySelector('audio');
				if(song.paused == true) {
					console.log('Playing');
					$('.play-icon').removeClass('fa-play').addClass('fa-pause');
					song.play();
						}
				else {
					console.log('Pausing');
					$('.play-icon').removeClass('fa-pause').addClass('fa-play');
					song.pause();
					}
			} 
	
		function updateCurrentTime()
		{
			var song = document.querySelector('audio');
			//console.log(song.currentTime);
			//console.log(song.duration);
			var currentTime = Math.floor(song.currentTime);
			currentTime = fancyTimeFormat(currentTime);
			var duration = Math.floor(song.duration);
			duration = fancyTimeFormat(duration)
			$('.time-elapsed').text(currentTime);
			$('.song-duration').text(duration);
			
		}
			
    $('.play-icon').on('click', function() {
        toggleSong();
    });
		$('body').on('keypress',function(event) {
			// body pe kahi pe bhi key press karne pe yeh function chalo//
		var target = event.target;
		if (event.keyCode == 32 && target.tagName !='INPUT')
		{
			toggleSong();
		}
	});
			
			
		function changeCurrentSongDetails(songObj) 
			{
					$('.current-song-image').attr('src','img/' + songObj.image)
					$('.current-song-name').text(songObj.name)
					$('.current-song-album').text(songObj.album)
			}
			//----------------------------- progress bar----------------------------------//
			
			function UpdateTimer() {
						var song = document.querySelector('audio');
						var ct = song.currentTime;
						var td = song.duration;
						var percentage = (ct/td)*100;
						$('.progress-filled').css('width', percentage+ "%");
						}
			
			
			
			function addSongNameClickEvent(songObj,position) {        //ye function different song ke different position ke accourding work kare ga
			var songName=songObj.fileName;															
			var id = '#song' + position;								//ek variable he #song usko add ko position ke sath
			$(id).click(function() {
			var audio = document.querySelector('audio');
			var currentSong = audio.src;
			if(currentSong.search(songName) != -1)
			{
			toggleSong();
			}
			else {
			audio.src = songName;
			toggleSong();
			changeCurrentSongDetails(songObj); // Function Call
			}
			});
			}
			
		$('.fa-repeat').on('click',function() {
			$('.fa-repeat').toggleClass('disabled')
			willLoop = 1 - willLoop;
		});
	


 var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
	   'image':'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
		 'image':'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
		 'image':'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		 'image':'song4.jpg'
    }]
	
	
	var currentSongNumber = 1;
	var willLoop = 0;
	var willShuffle = 0;
	var shuffle = 0;
	var Playingnumber = 0  ;
	
			
	function changeSong() 
		{
		var music =  songs[Playingnumber].fileName;
		var song = document.querySelector("audio");
		song.src = music;
		toggleSong();
		changeCurrentSongDetails(songs[Playingnumber])           // jab hame song ko change kare to hamere song k sath song k detail bhi change ho
		}	

<!---------------------------------loopsection start--------------------------------------------------------------->
	window.onload = function() {
		
		
		
			changeCurrentSongDetails(songs[0]);             //   jab ham page ko load kare to song 1 ki detail ho 
			
			
			
		
			setInterval(function()
			{
			UpdateTimer();
			
			},1000);
	

		
		for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1)
		}
		
		

	
		updateCurrentTime(); 
		setInterval(function() {
		updateCurrentTime();
		},1000);
		
		$('#songs').DataTable({
					paging: false
				});
		
		
	}
	//-------------------------------start forward and backward button--------------------------------------------//

			$(".fa-step-forward").click(function(){

						if(shuffle == 1)
						{
						var audio = document.querySelector('audio');
						var nextSongNumber = randomExcluded(0,3,Playingnumber); // Calling our function from Stackoverflow

						var nextSongObj = songs[nextSongNumber];
						audio.src = nextSongobj.fileName;
						toggleSong();
						changeCurrentSongDetails(nextSongobj);
						Playingnumber = nextSongNumber;
                         }


						else {

						if(Playingnumber == songs.length-1){
						Playingnumber = 0;
						changeSong();
						}

						else {
						console.log("two");
						console.log(Playingnumber);
						Playingnumber++;
						changeSong();
						}

						}

						})



						$(".fa-step-backward").click(function(){

						if(Playingnumber == 0){
						console.log("one");
						Playingnumber = (songs.length-1);
						changeSong();
						}

						else {
						console.log("two");
						console.log(Playingnumber);
						Playingnumber--;
						changeSong();
						}
						})
	//----------------------------------------end of forward and backward button   --------------------------------------------//


				
							