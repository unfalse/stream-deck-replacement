
const urlParams = new URLSearchParams(window.location.search);
const streamState = urlParams.get('streamState');
const youtube = urlParams.get('youtube');
const toNextScene = urlParams.get('nextScene');
const isItEndScene = urlParams.get('endScene');
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
var vidsForStart = ['HjqaV-peunE', '9GQ3uMjJ-Pg'];
var vidsForEnd = ['4F7F1z9imvQ']; // ['Z6k6YEG08-M'];
var deliriumVid = ['7Rxp_eGJ1qc'];
const systemShockMedicalExtendedHour = ['2Zy4pIL9taM'];
var videos = [];
var currentVideoIndex = 0;
const endingVideos = ['h9PCeOwPadI', '71BDwfy37qk', 'pvb432NroLA', 'JVoOhT9yHXs', 'Z6k6YEG08-M'];
const currentEndingVideo = localStorage.getItem('currentEndingVideo') || 0;

if (isItEndScene === '1') {
  videos = [endingVideos[Number(currentEndingVideo)]];
}

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function getCurrentVideoId() {
  return videos[currentVideoIndex];
}

function showVideoTitle() {
  setTimeout(function() {
    document.getElementById('video_title').textContent = player.videoTitle;
  }, 1000);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  let height = '360', width = '640', playerDiv = 'player',
    playerVars = {
      controls: 0,
      modestbranding: 1,
      showinfo: 0
    };
  console.log(streamState);
  // videos = vidsForStart;
  if (streamState === 'start') {
    videos = vidsForStart;
  }
  if (streamState === 'delirium') {
    videos = deliriumVid;
  }
  if (streamState === 'end') {
    videos = vidsForEnd;
  }
  if (streamState === 'custom') {
    videos = [youtube];
  }
  if (streamState === 'fullscreen') {
    playerDiv = 'fullscreen';
    videos = [systemShockMedicalExtendedHour];
    height = '1080';
    width = '1920';
    playerVars = {
      controls: 0,
      modestbranding: 1,
      showinfo: 0
    };
    document.getElementById('video_title').style.display = 'none';
  }
  if (streamState === 'fullscreen2') {
    playerDiv = 'fullscreen';
    if (isItEndScene !== '1') {
      videos = [youtube];
    }
    height = '1080';
    width = '1920';
    playerVars = {
      controls: 0,
      modestbranding: 1,
      showinfo: 0
    };
    document.getElementById('video_title').style.display = 'none';
  }
  if (streamState === 'prestart') {
    videos = ['siCmqvfw_1g', '6wlbB1PTzJU', 'mNLJMTRvyj8', 'x1T6QFpd0J4', '5kDO8hLu9iI'];
    document.getElementById('video_title').style.display = 'none';
    document.getElementById('player').style.display = 'none';
    document.getElementById('countdown').style.display = 'none';
  }

  player = new YT.Player(playerDiv, {
    height: height,
    width: width,
    videoId: getCurrentVideoId(),
    playerVars: playerVars,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // var playerSide = document.getElementById('player');
  // var rightSide = document.createElement('div');
  // rightSide.className = 'rightside';
  // playerSide.appendChild(rightSide);
  event.target.playVideo();
  showVideoTitle();1
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

let done = false;
function onPlayerStateChange(event) {
  console.log(event.data);
  if (event.data == YT.PlayerState.PLAYING) {
    console.log('playing!');
    if (toNextScene === '1' && !done) {
      let eta = 95;
      const timerId = setInterval(function() {
        if (eta < 0) return;
        document.getElementById('countdown').textContent = 'Entering the Citadel station in ' + Math.floor(eta / 60).toString() + ':' + (eta % 60 < 10 ? '0' : '') + (eta % 60).toString();
        eta--;
      }, 1000);
      setTimeout(function() {
        clearInterval(timerId);
        fetch('http://127.0.0.1:4456/next');
      }, (eta * 1000) + 1000); // 1000 * 60 * 2 + 1000 * 6);
      done = true;
    }
  }
  if (event.data == YT.PlayerState.ENDED) {
    if (isItEndScene === '1') {
      const nextEndingVideo = 
        (Number(currentEndingVideo) === endingVideos.length - 1)
        ? 0
        : Number(currentEndingVideo) + 1;
      localStorage.setItem('currentEndingVideo', nextEndingVideo.toString());
      fetch('http://127.0.0.1:4456/end');
      return;
    }
    nextVideo();
  }
}

function nextVideo() {
  currentVideoIndex++;
  if (currentVideoIndex >= videos.length) {
    player.stopVideo();
    return;
  }
  player.loadVideoById(getCurrentVideoId());
  showVideoTitle();
}