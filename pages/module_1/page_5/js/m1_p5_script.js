// ---------- setting start ---------------
var _preloadData, _pageData;
var _pagePreloadArray = {
  image: 1,
  audio: -1,
  video: 1,
  data: -1,
}; // item not availble please assign value 1.
var jsonSRC = "pages/module_1/page_5/data/m1_p5_data.json?v=";
_pageAudioSync = true;
_forceNavigation = false;
_audioRequired = false;
_videoRequired = false;
storeCurrentAudioTime = 0;
_popupAudio = false;
_reloadRequired = true;
_globalCicked = 0;
_btnClicked = 0;
_currentAudio = null;
_totalClicked = 0;
var _isSimulationPaused = false;

_checkAudioFlag = false;
_tweenTimeline = null;
_popTweenTimeline = null;

var _audioIndex = 0;
_videoId = null;
_audioId = null;
// ---------- setting end ---------------
var sectionCnt = 0;
var totalSection = 0;

var prevSectionCnt = -1;
var sectionTopPos = [];
var playMainAudio = false;
// ------------------ common function start ------------------------------------------------------------------------
$(document).ready(function () {
  //console.log('Page ready')
  _preloadData = new PagePreload();
  _preloadData.initObj(_pagePreloadArray, jsonSRC);
  _preloadData.addCustomEvent("ready", _pageLoaded);
  //console.log('Page ready 1', _preloadData)
});

function _pageLoaded() {
  //console.log('_pageLoaded')
  _pageData = _preloadData.jsonData;
  if (_audioRequired) {
    _audioId = _pageData.mainAudio.audioSRC;
    _audioIndex = _pageData.mainAudio.audioIndex;
  }

  if (_videoRequired) _videoId = "courseVideo";

  //addSlideData();
  addSectionData();
  checkGlobalAudio();
  assignAudio(
    _audioId,
    _audioIndex,
    _pageAudioSync,
    _forceNavigation,
    _videoId,
    _popupAudio,
    _reloadRequired
  );
  pagePreLoad();
}

// ------------------ common function end ------------------------------------------------------------------------

// -------- adding slide data ------------
function addSectionData() {
  totalSection = _pageData.sections.length;
  for (let n = 0; n < _pageData.sections.length; n++) {
    sectionCnt = n + 1;
    if (sectionCnt == 1) {
      playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);
      // $("#section-" + sectionCnt)
      //   .find(".content-holder")
      //   .find(".col-left")
      //   .find(".content")
      //   .find(".content-bg")
      //   .find(".content-style")
      //   .append(
      //     '<div class="inst"><p tabindex="0" aria-label="' +
      //       removeTags(_pageData.sections[sectionCnt - 1].iText) +
      //       '">' +
      //       _pageData.sections[sectionCnt - 1].iText +
      //       "</p></div>"
      //   );

      /* $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').append(_pageData.sections[sectionCnt - 1].headerTitle);*/

      /*let titletext = $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').text()
            $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').find('h1').attr('aria-label', titletext)*/

      // $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style')

      //    let textObject = '', listObject = '';

      let htmlContent = "";

      htmlContent += '<div class="left-side"><div class="animations"></div>';
      htmlContent += '<div class="wrap">';

      htmlContent += `<div class="text"><p class="ost" tabindex="0">${_pageData.sections[sectionCnt - 1].ost
        }<button class="wrapTextaudio playing" id="wrapTextaudio_1" onClick="replayLastAudio(this)"></button></p></div>`;

      htmlContent += '<div class="audio"></div>';

      htmlContent += "</div>";
      // // sea saw
      htmlContent += '<div class="sea-saw">';

      htmlContent += '<div class="sea-saw-wrap">';
      htmlContent += '<div class="saw-holding">';
      htmlContent += "</div>";
      htmlContent += '<div class="bar-holding">';
      htmlContent += '<div class="right-holding">';
      htmlContent += "</div>";
      htmlContent += '<div class="left-holding">';
      htmlContent += "</div>";
      htmlContent += "</div>";

      htmlContent += "</div>";

      htmlContent += "</div>";
      htmlContent += "</div>";

      // Right side
      htmlContent += '<div class="right-side">';
      htmlContent += '<div class="image-container"><div class="dummy-patch"></div>';
      for (
        let i = 0;
        i < _pageData.sections[sectionCnt - 1].content.imgObjects.length;
        i++
      ) {
        htmlContent += `<button id="btn-${i + 1}" class="btn" data-weight="${_pageData.sections[sectionCnt - 1].content.imgObjects[i].weight
          }" data-url="${_pageData.sections[sectionCnt - 1].content.imgObjects[i].imgsrc
          }" data-name="${_pageData.sections[sectionCnt - 1].content.imgObjects[i].name}"><img src=${_pageData.sections[sectionCnt - 1].content.imgObjects[i].imgsrc
          }></button>`;
      }
      htmlContent += "</div>";
      htmlContent += "</div>";

      let headerConent = '';
      let popupDiv = '';

      headerConent += `<div class="confetti"></div><div class="header"><div class="navBtns"><button id="home" data-tooltip="Back"></button><button id="music" class="music playing" data-tooltip="Music"></button><button id="info" data-tooltip="Information"></button><button id="simulationToggle" onClick="startSimulation(this)" class="play" data-tooltip="Pause"></button></div><div class="titleText"><img src="${_pageData.sections[sectionCnt - 1].headerImg}"></div></div>`
      popupDiv += '<div class="popup">'
      popupDiv += '<div class="popup-wrap">'

      popupDiv += '<div class="popBtns">'
      popupDiv += '<button id="refresh" data-tooltip="Replay"></button>'
      popupDiv += '<button id="homeBack" data-tooltip="Back"></button>'
      popupDiv += '</div>'
      popupDiv += '</div>'
      popupDiv += '</div>'
      popupDiv += '<div class="greetingsPop">';
      popupDiv += '<div class="popup-wrap">';
      popupDiv += "</div>";
      popupDiv += "</div>";

      popupDiv += `<div id="introPopup-1"><div class="popup-content">
                    <button class="introPopAudio mute" onclick="togglePop1Audio(this, '${_pageData.sections[sectionCnt - 1].infoAudio}')"></button>
                    <button class="introPopclose" data-tooltip="Close" onClick="closePopup('introPopup-1')"></button>
                    <img src="${_pageData.sections[sectionCnt - 1].infoImg}" alt="">
                </div>
            </div>`;

      popupDiv += `<div id="home-popup" class="popup-home" role="dialog" aria-label="Exit confirmation" aria-hidden="false">
    <div class="popup-content modal-box">
      <h2 class="modal-title">Oops!</h2>
      <div class="modal-message">
        <p>If you leave the simulation then you ave to start from beginning.</p>
        <p class="modal-question">Are you sure you want to leave?</p>
      </div>
    
      <div class="modal-buttons">
        <button id="stay-btn" class="modal-btn" onClick="stayPage()">Stay</button>
        <button id="leave-btn" class="modal-btn" onClick="leavePage()">Leave</button>
      </div>
    </div>
  </div>`;



      $("#section-" + sectionCnt)
        .find(".content-holder")
        .find(".col-left")
        .find(".content")
        .find(".content-bg")
        .find(".content-style")
        .append(popupDiv + headerConent +
          '<div class="body"><div class="animat-container"> ' +
          htmlContent +
          "</div> </div>"
        );


      $(".btn").on("click", function (e) {
        var $btn = $(this);

        if ($btn.prop("disabled")) {
          e.preventDefault();
          return;
        }


        $btn.prop("disabled", true);

        onClickHanlder(e);
      });
      $("#refresh").on("click", function () {
        jumtoPage(3);
      });
      $("#homeBack").on("click", function () {
        jumtoPage(0)
      });
      $("#home").on("click", function () {
        playClickThen();
        $("#home-popup").css('display', 'flex');
      });
      $(".music").on("click", function (event) {
        playClickThen();
        let el = event.currentTarget;
          toggleAudio(el);
      });
      _currentAudio = _pageData.sections[sectionCnt - 1].initAudio;
      // $(".wrapTextAudio").on("click", replayLastAudio);

      // IdleAudioManager.init(_pageData.sections[sectionCnt - 1].idleAudio); 
      $('#courseAudio').on('ended', function () {
        IdleAudioManager.init(_pageData.sections[sectionCnt - 1].idleAudio);
      })

      document.querySelector("#info").addEventListener("click", function (event) {
        playClickThen();
        const el = event.currentTarget;
          // console.log("its wokring")
          $("#introPopup-1").css('display', 'flex')
          $("#introPopup-1").css('opacity', '1')
          $(".introPopAudio").removeClass('playing');
          $(".introPopAudio").addClass('mute');   


      });
      // _btnClicked =10;
      // showEndScreen();

      // setCSS(sectionCnt);
      IdleAudioManager.init(_pageData.sections[sectionCnt - 1].idleAudio);
    }
  }
  // $("#courseAudio").on("ended", function () {
  //   console.log("Course audio was ended");
  //   $("#wrapTextaudio_1").prop('disabled', false);
  // });
}


function stayPage() {
  playClickThen();
  $("#home-popup").hide();
}


function leavePage() {
  playClickThen();
  const audio = document.getElementById("simulationAudio");
  if (audio) {
    // Stop audio whether it's playing or paused
    audio.pause();
    audio.currentTime = 0;
  }

  jumpToPage(0); // make sure the function name is correct
}


function jumtoPage(pageNo) {
playClickThen();
  _controller.pageCnt = pageNo;
  _controller.updateViewNow();
}



function disableAll() {
  playClickThen();
  $("#home,#music,#info,.wrapTextaudio").prop("disabled", true);
  const audio = document.getElementById("audio_src");
  console.log(_controller._globalMusicPlaying, "GlobalMsuci");
  if (_controller._globalMusicPlaying) {
    audio.pause();
  }

  disableButtons();
  $(".image-container").addClass("paused");
}


function enableAll() {
  playClickThen();
  $("#home,#music,#info,.wrapTextaudio").prop("disabled", false);
  const audio = document.getElementById("audio_src");
  if (_controller._globalMusicPlaying) {
    audio.muted = false;
    audio.play();
  }
  if((audioOneCompleted && audioTwoCompleted) || (audioOneCompleted)){
    enableButtons();
  }
  $(".image-container").removeClass("paused");
}


function audioCallback(targetTimeInSeconds, callback) {
 
  const audio = document.getElementById("simulationAudio");

  if (!audio) return;

  // Remove any previous listener
  audio.removeEventListener('timeupdate', audio._callbackListener);

  // Create a new listener
  const listener = function () {
    if (audio.paused) return; // optional, usually not needed with timeupdate

    if (audio.currentTime >= targetTimeInSeconds) {
      callback(audio.currentTime); // send current time
      audio.removeEventListener('timeupdate', listener); // remove listener
      audio._callbackListener = null;
    }
  };

  // Store reference to remove later
  audio._callbackListener = listener;

  audio.addEventListener('timeupdate', listener);
}



function togglePop1Audio(el, src) {
  playClickThen();
  const audio = document.getElementById("popupAudio"); // ✅ correct audio element

  // If this is a different audio source, load it
  if (audio.src !== el.baseURI + src) {
    audio.src = src;
    audio.load();
    audio.muted = false;
    audio.play().catch(() => { });
    // Immediately update class for first click
    el.classList.replace("mute", "playing");
    return;
  }

  // Toggle play/pause for the same audio
  if (audio.paused) {
    audio.play().catch(() => { });
    el.classList.replace("mute", "playing");
  } else {
    audio.pause();
    audio.currentTime = 0;
    el.classList.replace("playing", "mute");
    console.log("Enabling buttons");
    enableButtons();
  }
}


// IdleAudioManager.js

var IdleAudioManager = (function () {
  var idleInterval = null;
  var idleTimeout = null;
  var audioIdle = null;

  var activityEvents = ['mousemove', 'keydown', 'scroll', 'touchstart'];

  function init(audioSrc) {
    if (!audioSrc) {
      // console.error("idleAudio is missing");
      return;
    }
    audioIdle = new Audio(audioSrc);
    _addActivityListeners();
    _resetIdleTimer();
  }

  function _addActivityListeners() {
    activityEvents.forEach(e => window.addEventListener(e, _resetIdleTimer));
  }

  function _removeActivityListeners() {
    activityEvents.forEach(e => window.removeEventListener(e, _resetIdleTimer));
  }

  function _startIdle() {
    if (!audioIdle) return;
    idleInterval = setInterval(() => audioIdle.play().catch(console.log), 10000);
  }

  function _resetIdleTimer() {
    clearTimeout(idleTimeout);
    clearInterval(idleInterval);
    idleTimeout = setTimeout(_startIdle, 10000); // 5s of inactivity
  }

  function start() {
    _addActivityListeners();
    _resetIdleTimer();
  }

  function stop() {
    console.log("Setimout out stopped");
    clearTimeout(idleTimeout);
    clearInterval(idleInterval);
    _removeActivityListeners();
  }

  return {
    init,
    start,
    stop
  };
})();


function startSimulation(btn) {
  playClickThen();
  var audio = document.getElementById("simulationAudio");
  var hasAudio = !!audio.getAttribute("src");

  _isSimulationPaused = !_isSimulationPaused;

  if (_isSimulationPaused) {
    // Pause state
    if (hasAudio) {
      audio.pause();
    }
    disableAll();
    btn.classList.remove("play");
    btn.classList.add("pause");
    btn.dataset.tooltip = "Play";
  } else {
    // Play state
    if (hasAudio) {
      audio.play().catch(() => { });
    }
    enableAll();
    btn.classList.remove("pause");
    btn.classList.add("play");
    btn.dataset.tooltip = "Pause";
  }

}



function toggleAudio(el) {
  playClickThen();
  // const el = event.currentTarget;
  const audio = document.getElementById("audio_src");

  console.log(el, "Target class");

  if (audio.paused) {
    audio.muted = false;
    audio.play();
    el.classList.remove("mute");
    el.classList.add("playing");
    _controller._globalMusicPlaying = true;
  } else {
    audio.pause();
    audio.currentTime = 0;
    el.classList.remove("playing");
    el.classList.add("mute");
    _controller._globalMusicPlaying = false;
  }
}




var audioStep = 0;


var activeAudioSequence = null;
var currentAudioObj = null;

var audioOneCompleted = false;
var audioTwoCompleted = false;
var counter = 0;


// function playBtnSounds(audioObj, callback) {
//   if (!audioObj || !audioObj.audioSRC || !audioObj.audioSRC.length) {
//     callback && callback();
//     return;
//   }


//   console.log(audioObj, counter, audioOneCompleted, audioTwoCompleted, "blajias");

//   const audio = document.getElementById("simulationAudio");
//   currentAudioObj = audioObj;

//   activeAudioSequence = { stop: false };

//   if (audioOneCompleted && audioTwoCompleted) {
//     counter = 1;
//   } else if (audioOneCompleted && audioObj.audioSRC.length > 1) {
//     counter = 1;
//   } else {
//     counter = 0;
//   }

//   function playNext() {
//     if (activeAudioSequence.stop) return;

//     resetSimulationAudio();

//     audio.src = audioObj.audioSRC[counter];
//     audio.muted = false;
//     audio.load();

//     audio.onplay = () => {
//       if (audioObj.ost && audioObj.ost[counter]) {
//         clearText();
//         loadText([audioObj.ost[counter]], 10, true);
//       }
//       audio.onplay = null;
//     };

//     audio.onended = () => {
//       document.querySelectorAll('.wrapTextaudio.playing').forEach(el => {
//         el.classList.remove('playing');
//         el.classList.add('paused');
//       });

//       if (counter === 0) audioOneCompleted = true;
//       if (counter === 1) audioTwoCompleted = true;

//       counter++;

//       if (counter >= audioObj.audioSRC.length) {
//         resetSimulationAudio();
//         activeAudioSequence = null;
//         $(".dummy-patch").hide();
//         enableButtons();
//         callback && callback();
//         return;
//       }

//       playNext();
//     };


//     if (!_isSimulationPaused) {
//       audio.play().catch(err => console.warn("Audio play error:", err));
//     }
//   }

//   playNext();
// }

function playBtnSounds(audioObj, callback) {
  if (!audioObj || !audioObj.audioSRC || !audioObj.audioSRC.length) {
    callback && callback();
    return;
  }

  console.log(audioObj, counter, audioOneCompleted, audioTwoCompleted, "blajias");

  const audio = document.getElementById("simulationAudio");
  currentAudioObj = audioObj;

  activeAudioSequence = { stop: false };

  if (audioOneCompleted && audioTwoCompleted) {
    counter = 1;
  } else if (audioOneCompleted && audioObj.audioSRC.length > 1) {
    counter = 1;
  } else {
    counter = 0;
  }

  function playNext() {
    if (activeAudioSequence.stop) return;

    resetSimulationAudio();

    audio.src = audioObj.audioSRC[counter];
    audio.muted = false;
    audio.load();

    let ostCalled = false; // ✅ added flag

    audio.onplay = () => {
      audio.onplay = null;
    };

    // ✅ ADDED: duration-based OST trigger (NO existing logic changed)
    audio.ontimeupdate = () => {
      if (ostCalled) return;

      if (
        Array.isArray(audioObj.ost) &&
        audioObj.ost[counter] &&
        Array.isArray(audioObj.duration) &&
        typeof audioObj.duration[counter] === "number"
      ) {
        if (audio.currentTime * 1000 >= audioObj.duration[counter]) {
          ostCalled = true;
          clearText();
          loadText([audioObj.ost[counter]], 10, true);
        }
      }
    };

    audio.onended = () => {
      document.querySelectorAll('.wrapTextaudio.playing').forEach(el => {
        el.classList.remove('playing');
        el.classList.add('paused');
      });

      if (counter === 0) audioOneCompleted = true;
      if (counter === 1) audioTwoCompleted = true;

      counter++;

      if (counter >= audioObj.audioSRC.length || (audioOneCompleted && audioTwoCompleted)) {
        resetSimulationAudio();
        activeAudioSequence = null;
        $(".dummy-patch").hide();
        enableButtons();
        if(_btnClicked == 9){
          showEndScreen();
        }
        callback && callback();
        return;
      }


      playNext();
    };

    if (!_isSimulationPaused) {
      audio.play().catch(err => console.warn("Audio play error:", err));
    }
  }

  playNext();
}

function showEndScreen(){
  console.log(_btnClicked, "end screen");
  clearGlobalAudios();

  _btnClicked++;
  console.log(_btnClicked,_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked], "end screen");
   playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);
  showEndAnimations();
}

function replayLastAudio(btnElement) {
  playClickThen();
  const audio = document.getElementById("simulationAudio");

  if (btnElement.classList.contains("playing")) {
    btnElement.classList.remove("playing");
    btnElement.classList.add("paused");
    audio.muted = true;
    return;
  }

  btnElement.classList.remove("paused");
  btnElement.classList.add("playing");
  audio.muted = false;

  if (activeAudioSequence) activeAudioSequence.stop = true;

  const ostData =
    _pageData.sections[sectionCnt - 1]
      .content
      .ostAudios[_btnClicked];

  // ✅ Clone & override audioSRC ONLY for replay
  const replayObj = {
    ...ostData,
    audioSRC: ostData.replayAudioSrc || ostData.audioSRC
  };

  playBtnSounds(replayObj);
}




function resetSimulationAudio() {
  const audioElement = document.getElementById("simulationAudio");
  if (!audioElement) return;

  audioElement.pause();
  audioElement.removeAttribute("src");

  const source = audioElement.querySelector("source");
  if (source) source.src = "";

  audioElement.load();
  audioElement.onended = null;
}



function toggleTextAudio(el, src) {

  const audio = document.getElementById("simulationAudio");

  // If this is a different audio source, load it
  if (audio.src !== el.baseURI + src) {
    audio.src = src;
    audio.load();
    audio.muted = false;
    audio.play();
    return;
  }

  // Toggle play/pause for the same audio
  if (audio.paused) {
    audio.play();
    el.classList.replace("mute", "playing");
  } else {
    audio.pause();
    audio.currentTime = 0;
    el.classList.replace("playing", "mute");
  }
}

function audioEnd(callback) {
  const audio = document.getElementById("simulationAudio");
  audio.onended = null; // remove previous handlers
  audio.onended = () => {
    if (typeof callback === "function") callback();
  };
}


var clickCount = 0;
var leftWeight = 0;
var rightWeight = 0;

function onClickHanlder(e) {
  clearGlobalAudios();
  var parentBtn = $(e.currentTarget);

  // Get button data
  var imgWeight = Number(parentBtn.data("weight"));
  var imgSrc = parentBtn.data("url");

  // _currentAudio = _pageData.sections[sectionCnt - 1].content.ostAudios[_totalClicked].audioSRC;
  _totalClicked++;
  // Disable button
  parentBtn.prop("disabled", true);
  parentBtn.addClass("visited");

  _btnClicked++;
  clickCount++;
  disableButtons();
  console.log(_btnClicked, "clicked btn each");

  // Play button sound  

  // Target div
  var targetDiv = clickCount === 1 ? ".left-holding" : ".right-holding";

  // Create moving image
  var $img = $(`<img src="${imgSrc}" class="movingImg">`).appendTo("body");
  $img.css({ position: "absolute", zIndex: 9999 });

  // Get exact position of image inside button
  var imgInsideBtn = parentBtn.find("img")[0]; // the <img> element inside the button
  var imgRect = imgInsideBtn.getBoundingClientRect();
  var scrollTop = $(window).scrollTop();
  var scrollLeft = $(window).scrollLeft();

  // Set starting position of moving image
  $img.css({
    left: imgRect.left + scrollLeft - 100,
    top: imgRect.top + scrollTop - 10
  });


  // audio

  // Store weights
  if (clickCount === 1) leftWeight = imgWeight;
  if (clickCount === 2) rightWeight = imgWeight;


  // console.log(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked], "clickeddddd")
  if (clickCount === 1) {
    // if (_globalCicked === 0) _globalCicked = 0;
    // else _globalCicked++;

    // const ostData = _pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked];
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);
    clearText();
     setTimeout(function () {
    $(".bar-holding").css("transform", "rotate(-5deg)");
  }, 500)

  }


  // Completed check
  if (_totalClicked === _pageData.sections[sectionCnt - 1].content.imgObjects.length) {
    $(".image-container").addClass("completed");
  }


  if (clickCount === 2) {
    _globalCicked++;
    setTimeout(function(){
      evaluateSeesaw();
    },200)
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);
    clearText();
    audioEnd(function () {      
      checkHeavyLight(leftWeight, rightWeight)
      // setTimeout(evaluateSeesaw, 1000);
      // setTimeout(() => checkHeavyLight(leftWeight, rightWeight), 2000);
    })
  }


  // end

  // Target position
  var targetRect = $(targetDiv)[0].getBoundingClientRect();

  // exit;
  // Animate
  $img.animate(
    {
      left: targetRect.left + scrollLeft,
      top: targetRect.top + scrollTop
    },
    300,
    function () {
      $img.appendTo(targetDiv).css({
        position: "relative",
        left: 0,
        top: 5,

      });
    }
  );
 
}


function clearGlobalAudios() {
  activeAudioSequence = null;
  currentAudioObj = null;

  audioOneCompleted = false;
  audioTwoCompleted = false;
  counter = 0;

}


function checkHeavyLight(leftWeight, rightWeight) {
  var imgObjects = _pageData.sections[sectionCnt - 1].content.imgObjects;


  const leftObj = imgObjects.find(o => o.weight === leftWeight);
  const rightObj = imgObjects.find(o => o.weight === rightWeight);

  if (!leftObj || !rightObj) {
    console.error("Left or Right object not found for given weights!", leftWeight, rightWeight);
    return;
  }

  // Determine heavy/light for display
  var leftText, rightText;
  var leftAudio, rightAudio;

  if (leftWeight > rightWeight) {
    leftText = 'HEAVY';
    rightText = 'LIGHT';
    leftAudio = leftObj?.audios?.[0]?.high?.audio?.audioSRC;
    rightAudio = rightObj?.audios?.[0]?.low?.audio?.audioSRC;
  } else if (rightWeight > leftWeight) {
    leftText = 'LIGHT';
    rightText = 'HEAVY';
    leftAudio = leftObj?.audios?.[0]?.low?.audio?.audioSRC;
    rightAudio = rightObj?.audios?.[0]?.high?.audio?.audioSRC;
  } else {
    // equal weight (optional, handle if needed)
    leftText = 'EQUAL';
    rightText = 'EQUAL';
    leftAudio = leftObj?.audios?.[0]?.high?.audio?.audioSRC;
    rightAudio = rightObj?.audios?.[0]?.high?.audio?.audioSRC;
  }

  if (!leftAudio) console.error("Left audio missing!", leftObj);
  if (!rightAudio) console.error("Right audio missing!", rightObj);

  // Play left audio first, then right audio
  playVisualAudioChainSync(leftAudio, rightAudio, leftText, rightText, 'left-holding', 'right-holding', function () {
    resetSeesaw();
  });

}

function playNextOst() {
  console.log(_globalCicked, _btnClicked, "clicked", _pageData.sections[sectionCnt - 1].content.imgObjects.length);


  if (_globalCicked == _pageData.sections[sectionCnt - 1].content.imgObjects.length) {
    $(".animations").addClass('show');
    setTimeout(function () {
      $(".animations").removeClass('show');
    }, 3000)
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);

  }
  else if (_btnClicked == _pageData.sections[sectionCnt - 1].content.ostAudios.length) {
    console.log("else if else");
    // $(".image-container").addClass('completed');
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);
  }
  else {
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_btnClicked]);
    console.log("else");
    // loadText(_pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].ost, _pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].duration);
    // audioEnd(function () {
    //   enableButtons();
    // });
  }


}

function restartActivity() {
  $(".popup").css("opacity", "0");
  setTimeout(function () {
    $(".popup").css("display", "none");
  }, 500);
  _globalCicked = 0;
  restartPage();

}


function showEndAnimations() {
  var $audio = $("#simulationAudio");
  closePopup('introPopup-1')
  clearText();
  console.log("Audio ending");
  IdleAudioManager.stop();

  $audio.on("timeupdate", function () {
    var currentTime = this.currentTime;
    $(".greetingsPop").css("display", "flex");
    $(".greetingsPop").css("opacity", "1");
    

    if (currentTime >= 1) {
      $(".confetti").addClass("show");
      $(".confetti").show();
      setTimeout(function () {
        $(".confetti").removeClass("show");
        $(".confetti").hide();
        $(".greetingsPop").css("display", "none");
        $(".greetingsPop").css("opacity", "0");
        $(".popup").css("display", "flex");
        $(".popup").css("opacity", "1");
      }, 3000);



      $audio.off("timeupdate");
    }

  });
}


// function playVisualAudioChainSync(
//   firstAudio,
//   secondAudio,
//   firstText,
//   secondText,
//   firstCls,
//   secondCls,
//   onComplete
// ) {
//   const audio = document.getElementById("simulationAudio");

//   const audios = [];
//   const texts = [];
//   const classes = [];

//   if (firstAudio) {
//     audios.push(firstAudio);
//     texts.push(firstText);
//     classes.push(firstCls);
//   }

//   if (secondAudio) {
//     audios.push(secondAudio);
//     texts.push(secondText);
//     classes.push(secondCls);
//   }

//   let index = 0;

//   function setActive(cls) {
//     $(".left-holding, .right-holding").removeClass("active");
//     if (cls) $(`.${cls}`).addClass("active");
//   }

//   function playCurrent() {
//     if (index >= audios.length) {
//       setTimeout(() => {
//         $(".left-holding, .right-holding").removeClass("active");
//         audio.removeAttribute("src");
//         audio.load();
//         if (typeof onComplete === "function") onComplete();
//       }, 500);
//       return;
//     }

//     audio.pause();
//     audio.currentTime = 0;
//     audio.src = audios[index];
//     audio.load();

//     // ✅ Apply text/class immediately (before play)
//     appendTextOnTop(texts[index], classes[index]);
//     setActive(classes[index]);

//     audio.play().catch(() => { });

//     audio.onended = () => {
//       audio.onended = null;
//       index++;
//       playCurrent();
//     };
//   }

//   audio.onpause = () => {
//     // freeze UI — do nothing
//   };

//   playCurrent();
// }


function playVisualAudioChainSync(
  firstAudio,
  secondAudio,
  firstText,
  secondText,
  firstCls,
  secondCls,
  onComplete
) {
  const audio = document.getElementById("simulationAudio");

  const audios = [];
  const texts = [];
  const classes = [];

  if (firstAudio) {
    audios.push(firstAudio);
    texts.push(firstText);
    classes.push(firstCls);
  }

  if (secondAudio) {
    audios.push(secondAudio);
    texts.push(secondText);
    classes.push(secondCls);
  }

  let index = 0;

  function setActive(cls) {
    $(".left-holding, .right-holding").removeClass("active");
    if (cls) $(`.${cls}`).addClass("active");
  }

  function showTextAndClass() {
    appendTextOnTop(texts[index], classes[index]);
    setActive(classes[index]);
  }

  function playCurrent() {
    if (index >= audios.length) {
      setTimeout(() => {
        $(".left-holding, .right-holding").removeClass("active");
        audio.removeAttribute("src");
        audio.load();
        if (typeof onComplete === "function") onComplete();
      }, 500);
      return;
    }

    // Load current audio
    audio.pause();
    if (audio.src !== audios[index]) {
      audio.src = audios[index];
      audio.load();
      audio.currentTime = 0;
    }

    // Only show text/class when audio starts
    const playAudio = () => {
      showTextAndClass();
      audio.play().catch(() => {});
    };

    // If not paused, play immediately
    if (!_isSimulationPaused) {
      playAudio();
    }

    // Expose resume function for global Play
    audio.resumeChain = function () {
      if (!_isSimulationPaused && audio.paused) {
        playAudio();
      }
    };

    audio.onended = () => {
      audio.onended = null;
      index++;
      playCurrent();
    };
  }

  audio.onpause = () => {
    // freeze UI — do nothing
  };

  // Start chain if not paused
  if (!_isSimulationPaused) {
    playCurrent();
  }
}





function enableButtons() {
  console.log("its enalling", _globalCicked, _btnClicked);
  $(".btn").not(".visited").prop("disabled", false);
  // IdleAudioManager.start();
}

function disableButtons() {
  $(".btn").not(".visited").prop("disabled", true);
  // IdleAudioManager.stop();
}


function loadText(txtArr, duration = 2000, instant = false) {
  const container = document.querySelector(".wrap .text");
  container.innerHTML = "";
  console.log("called");
  let counter = 0;
  counter++;

  if (!txtArr) return;

  // if a single string, convert to array
  if (typeof txtArr === "string") {
    txtArr = [txtArr];
  }

  const pTags = txtArr.map(text => {
    const p = document.createElement("p");
    p.innerHTML = text;

    // Keep your existing logic for buttons and styles
    if (_totalClicked !== _pageData.sections[sectionCnt - 1].content.imgObjects.length) {
      p.innerHTML += `<button id="wrapTextaudio_${counter}" class="wrapTextaudio playing" onClick="replayLastAudio(this)"></button>`;
    }
    if (_globalCicked == _pageData.sections[sectionCnt - 1].content.imgObjects.length) {
      p.style.fontSize = '55px';
      $(".wrap").css('max-width', '750px');
    }

    container.appendChild(p);
    return p;
  });

  if (instant) {
    pTags.forEach(p => p.classList.add("show"));
    return;
  }

  function showText(index) {
    pTags.forEach(p => p.classList.remove("show"));
    pTags[index].classList.add("show");

    if (index + 1 < pTags.length) {
      setTimeout(() => {
        showText(index + 1);
      }, duration);
    }
  }

  showText(0);
}



function appendTextOnTop(text, cls) {
  if (!text) return;

  let selector = ".wrap";

  if (typeof cls === "string" && cls.trim() !== "") {
    selector = cls.startsWith(".") ? cls : `.${cls}`;
  }

  const container = document.querySelector(selector);
  if (!container) return;

  const p = document.createElement("p");
  p.innerHTML = text;
  container.prepend(p);

  const leftChild = container.querySelector(".left-holding p");
  const rightChild = container.querySelector(".right-holding p");

  if (leftChild && rightChild) {
    const angle = getOppositeRotation();
    leftChild.style.transform = `rotate(${angle}deg)`;
    rightChild.style.transform = `rotate(${angle}deg)`;
  }

  $(".left-holding, .right-holding").removeClass("active");
  if (cls) $(selector).addClass("active");
}





function clearText() {
  const container = document.querySelector(".wrap .text");
  container.innerHTML = ""; // clear previous text
}

function evaluateSeesaw() {
  disableButtons();
  $(".bar-holding").removeClass("rotate-positive rotate-negative rotate-zero");

  if (leftWeight > rightWeight) {
    $(".bar-holding").css("transform", "rotate(-5deg)");
    $(".bar-holding").addClass("rotate-negative");
  } else if (rightWeight > leftWeight) {
    $(".bar-holding").css("transform", "rotate(5deg)");
    $(".bar-holding").addClass("rotate-positive");
  } else {
    $(".bar-holding").css("transform", "rotate(0deg)");
    $(".bar-holding").addClass("rotate-zero");
  }
}

function resetSeesaw() {
  // console.log("reeeesseeting", _globalCicked);

  $(".left-holding, .right-holding").removeClass('active');
  // Remove all content inside left and right containers
  $(".left-holding, .right-holding").empty();

  // Reset bar rotation
  $(".bar-holding").css("transform", "rotate(0deg)");

  // Reset counters & weights
  clickCount = 0;
  leftWeight = 0;
  rightWeight = 0;

  // Re-enable buttons if needed
  _globalCicked++;
  _btnClicked++;
  disableButtons();
  setTimeout(function () {
    playNextOst();
  }, 1000)

}


// -------- update CSS ------------
function setCSS(sectionCnt) {
  _wrapperWidth = $("#f_wrapper").outerWidth();
  _wrapperHeight = $("#f_wrapper").outerHeight();
  // ---- checking device width and height ----
  if (_wrapperWidth > 768) {
    for (var i = 0; i < _pageData.imgCollage.desktop.length; i++) {
      $("#section-1")
        .find(".bg-img")
        .eq(i)
        .css({
          "background-image":
            "url(" + _pageData.imgCollage.desktop[i].imageSRC + ")",
          "background-size": "cover",
        });
    }
  } else {
    for (var j = 0; j < _pageData.imgCollage.portrait.length; j++) {
      $("#section-1")
        .find(".bg-img")
        .eq(j)
        .css({
          "background-image":
            "url(" + _pageData.imgCollage.portrait[j].imageSRC + ")",
          "background-size": "cover",
        });
    }
  }
}

// -------- animations ------------
//function updateCurrentTime(_currTime) {
//    _tweenTimeline.seek(_currTime)
//}

/*
function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}*/
function removeTags(str) {
  //console.log('removeTags 0', str)
  if (str === null || str === "") {
    return false;
  } else {
    str = _controller.removeTags(str);
    return str;
  }
}
function initPageAnimations() {
  if (_tweenTimeline) {
    _tweenTimeline.kill();
  }
  _tweenTimeline = new TimelineLite();

  mainAnimation();
  if (_pageAudioSync && !_pageData.mainAudio.isEmptyAudio) {
    withAudioSync();
  } else {
    withoutAudioSync();
  }
}

function mainAnimation() {
  $(".f_page_content").animate(
    {
      opacity: 1,
    },
    300
  );
}

function withAudioSync() {
  _tweenTimeline.play();

  _tweenTimeline.add(animateFadeIn($("h1"), 0.5).play(), 0.5);

  _tweenTimeline.add(animateFadeIn($(".ost"), 0.5).play(), 0.1);
  _tweenTimeline.add(animateFadeOut($(".ost"), 0.5).play(), 4.5);
  _tweenTimeline.add(animateFadeOut($(".dummy-patch"), 0.5).play(), 9);
  _tweenTimeline.add(animateFadeIn($(".inst"), 0.5).play(), 5);

  _tweenTimeline.add(
    animateFromMarginLeft($(".animat-container"), 0.5, 0).play(),
    1
  );
  var rightListTiming = [2, 3, 4, 5.5];
  for (var k = 0; k < rightListTiming.length; k++) {
    _tweenTimeline.add(
      animateFromRight(
        $(".animat-container").find(".list li").eq(k),
        0.5,
        0
      ).play(),
      rightListTiming[k]
    );
  }
}

function withoutAudioSync() {
  _tweenTimeline.play();
  _tweenTimeline.add(animateFadeIn($("h1"), 0.5).play(), 0.5);
  _tweenTimeline.add(
    animateFromMarginLeft($(".animat-container"), 0.5, 0).play(),
    1
  );
  let time = 1,
    t = 0,
    pTag = 0,
    listTag = 0,
    divTag = 0;
  let time1 = time;
  for (let j = 0; j < _pageData.sections[0].content.listText.length; j++) {
    t = time1 + j * 0.5;
    _tweenTimeline.add(
      animateFromRight(
        $(".animat-container").find(".list li").eq(listTag),
        0.5,
        0
      ).play(),
      t
    );
    listTag++;
  }
}
// -------- resize page details ------------
/*window.onresize = function() {
    //setCSS()
}*/

