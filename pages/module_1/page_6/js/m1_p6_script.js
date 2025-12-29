// ---------- setting start ---------------
var _preloadData, _pageData;
var _pagePreloadArray = {
  image: 1,
  audio: 1,
  video: 1,
  data: -1,
}; // item not availble please assign value 1.
var jsonSRC = "pages/module_1/page_6/data/m1_p6_data.json?v=";
_pageAudioSync = true;
_forceNavigation = false;
_audioRequired = false;
_videoRequired = false;
storeCurrentAudioTime = 0;
_popupAudio = false;
_reloadRequired = true;
_globalCicked = 0;
_currentAudio = null;
_isPlayed = false;
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
  // playBtnSounds(_pageData.sections[sectionCnt - 1].endAudio);
  //   showEndAnimations();
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
      playBtnSounds(_pageData.sections[sectionCnt - 1].introAudio);
      audioEnd(function () {
        $(".dummy-patch").hide();
        resetSimulationAudio();
      })
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

      for (
        let i = 0;
        i < _pageData.sections[sectionCnt - 1].content.flipObjects.length;
        i++
      ) {
        htmlContent += `<div class="flip-container" id="flip-container-${i + 1
          }">`;

        htmlContent += '<div class="flipWrap">';
        htmlContent += `<div class="flipText"><p tabindex="0">${_pageData.sections[sectionCnt - 1].content.flipObjects[i].instText
          }</p><button class="flipTextAudio"></button></div>`;

        htmlContent += '<div class="flipBody">';
        // console.log(_pageData.sections[sectionCnt - 1].content.flipObjects[i].images, "ababbababba")
        for (
          let k = 0;
          k <
          _pageData.sections[sectionCnt - 1].content.flipObjects[i].images
            .length;
          k++
        ) {
          htmlContent += `<button class="flip-card" id="flip-card-${k + 1}">`;

          htmlContent += '<div class="flip-inner">';
          htmlContent += '<div class="flip-front">';
          htmlContent += '<div class="flip-front-img">';
          htmlContent += `<img src="${_pageData.sections[sectionCnt - 1].content.flipObjects[i].images[k]
              .imageSrc
            }" alt="">`;
          htmlContent += "</div>";
          htmlContent += "</div>";
          htmlContent += '<div class="flip-back">';
          htmlContent += '<div class="flipBackText">';
          htmlContent += `<img src="${_pageData.sections[sectionCnt - 1].content.flipObjects[i].images[k]
              .flipImage
            }" alt="">`;
          htmlContent += "</div>";
          htmlContent += '<div class="flipBackImage">';
          htmlContent += `<p tabindex="0">${_pageData.sections[sectionCnt - 1].content.flipObjects[i].images[k]
              .flipText
            }</p>`;
          htmlContent += "</div>";
          htmlContent += "</div>";

          htmlContent += "</div>";
          htmlContent += "</button>";
        }
        htmlContent += "</div>";

        htmlContent += "</div>";

        htmlContent += "</div>";
      }

      let headerConent = "";
      let popupDiv = "";

      headerConent += `<div class="confetti"></div><div class="header"><div class="navBtns"><button id="home" data-tooltip="Back"></button><button class="music playing" data-tooltip="Music"></button><button id="info" data-tooltip="Information"></button></div><div class="titleText"><img src="${_pageData.sections[sectionCnt - 1].headerImg
        }"></div></div>`;
      popupDiv += '<div class="popup">';
      popupDiv += '<div class="popup-wrap">';

      popupDiv += '<div class="popBtns">';
      popupDiv += '<button id="refresh" data-tooltip="Replay"></button>';
      popupDiv += '<button id="homeBack" data-tooltip="Back"></button>';
      popupDiv += "</div>";
      popupDiv += "</div>";
      popupDiv += "</div>";
      popupDiv += '<div class="greetingsPop">';
      popupDiv += '<div class="popup-wrap">';
      popupDiv += "</div>";
      popupDiv += "</div>";
      popupDiv += `<div id="introPopup-1"><div class="popup-content">
                    <button class="introPopAudio mute" onclick="togglePopAudio(this, '${_pageData.sections[sectionCnt - 1].infoAudio}')"></button>
                    <button class="introPopclose" data-tooltip="Close" onClick="closeIntroPop('introPopup-1')"></button>
                    <img src="${_pageData.sections[sectionCnt - 1].infoImg}" alt="">
                </div>
            </div>`;

      popupDiv += `<div id="home-popup" class="popup-home" role="dialog" aria-label="Exit confirmation" aria-hidden="false">
    <div class="popup-content modal-box">
      <h2 class="modal-title">Oops!</h2>
      <div class="modal-message">
        <p>If you leave the fun game then you have to start from beginning.</p>     
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
        .append(
          popupDiv +
          headerConent +
          '<div class="body"><div class="animat-container"> <div class="dummy-patch"></div>' +
          htmlContent +
          "</div> </div>"
        );
      $("#flip-container-1").addClass("show")
      $(".flip-card").on("click", onClickHanlder);

      // $("#refresh").on("click", restartActivity);
      // $("#home,#homeBack").on("click", jumtoPage)  

      $("#refresh").on("click", function () {
        jumtoPage(4);
      });
      $("#homeBack").on("click", function () {
        jumtoPage(1)
      });
      $("#home").on("click", function () {
        playClickThen();
        $("#home-popup").css('display', 'flex');
        AudioController.pause();
      });
      $(".music").on("click", function (event) {
        playClickThen();
        let el = event.currentTarget;
          toggleAudio(el);
      });
      _currentAudio = _pageData.sections[sectionCnt - 1].content.flipObjects[0].instAudio;
      $(".flipTextAudio").on("click", replayLastAudio);
      document.querySelector("#info").addEventListener("click", function (event) {
        playClickThen();
        AudioController.pause();
        const el = event.currentTarget;
          // console.log("its wokring")
          $("#introPopup-1").css('display', 'flex')
          $("#introPopup-1").css('opacity', '1')
          $(".introPopAudio").removeClass('playing');
          $(".introPopAudio").addClass('mute');

          // $(".introPopAudio").on("click",function(){  
          //     console.log("its working");

          // })       
      });

      // setCSS(sectionCnt);
    }
  }
}



function stayPage() {
  playClickThen();
  AudioController.play();
  $("#home-popup").hide();
}
function leavePage() {
  playClickThen();
  var audio = document.getElementById("simulationAudio");
  if (audio) {
    // Stop audio whether it's playing or paused
    audio.pause();
    audio.currentTime = 0;
  }

  jumtoPage(1); 
}

function jumtoPage(pageNo) {
  playClickThen();

  _controller.pageCnt = pageNo;

  _controller.updateViewNow();
}


var activeAudio = null;

function playBtnSounds(soundFile) {
  if (!soundFile) {
    console.warn("Audio source missing!");
    return;
  }

  console.log("calling audios");

  const audio = document.getElementById("simulationAudio");

  // Stop previous audio if it exists
  if (activeAudio && !activeAudio.paused) {
    activeAudio.pause();
    // Do NOT reset src yet, let it finish
  }

  audio.loop = false;
  audio.src = soundFile;
  audio.load();

  activeAudio = audio;

  audio.play().catch((err) => {
    console.warn("Audio play error:", err);
  });
}



function resetSimulationAudio() {
  console.log("Balajia");

  const audioElement = document.getElementById("simulationAudio");
  if (!audioElement) return;

  audioElement.pause();

  audioElement.src = "";
  audioElement.removeAttribute("src");

  const source = audioElement.querySelector("source");
  if (source) source.src = "";

  audioElement.load(); 
  audioElement.onended = null;
}





function audioEnd(callback) {  
  const audio = document.getElementById("simulationAudio");
  audio.onended = null;
  audio.onended = () => {
    if (typeof callback === "function") callback();
  };
}

var clickCount = 0;

function onClickHanlder(e) {
  playClickThen();
  var $card = $(e.currentTarget);

  var index = parseInt(e.currentTarget.id.split("-").pop(), 10);

  var ldx = index - 1;


  var $card = $(e.currentTarget);
  console.log($card, "cardss")

  $card.toggleClass("flipped");

  disableButtons();
  // playBtnSounds(_pageData.sections[sectionCnt - 1].content.btnAudios[0]);
  setTimeout(function () {
    validateAnswer(ldx, _globalCicked, index);
  }, 500)
}

function validateAnswer(ldx, _globalCicked, index) {

  if (_pageData.sections[sectionCnt - 1].content.flipObjects[_globalCicked].images[ldx].isCorrect) {
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.flipObjects[_globalCicked].images[ldx].audioSrc)

    audioEnd(function () {
      console.log("current index", index)
      resetSimulationAudio();
      enableNextFlip(index);
    })
  } else {
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.flipObjects[_globalCicked].images[ldx].audioSrc);
    audioEnd(function () {
      resetSimulationAudio();
      resetToggle();
      setTimeout(function () {
        enableButtons();
      }, 1000)
    });
  }
}

function toggleAudio(el) {
  playClickThen();
  // console.log(event, "current e")
  // const el = event.currentTarget; 
  const audio = document.getElementById("audio_src");

  // console.log(el, "Target class");

  if (audio.paused) {
    audio.muted = false;
    audio.play();
    el.classList.remove("mute");
    el.classList.add("playing");
    _controller._globalMusicPlaying = true;
  } else {
    audio.pause();
    el.classList.remove("playing");
    el.classList.add("mute");
    _controller._globalMusicPlaying = false;
  }
}

var AudioController = (() => {
  const audio = document.getElementById("simulationAudio");

  const hasAudio = () => audio && audio.src;

  return {
    play() {
      if (hasAudio()) audio.play();
    },
    pause() {
      if (hasAudio()) audio.pause();
    }
  };
})();



function enableNextFlip(indx) {
  _globalCicked++;
  if (_globalCicked < _pageData.sections[sectionCnt - 1].content.flipObjects.length) {
    $(`.flip-container`).removeClass('show');
  }

  console.log(indx, indx + 1, "showing index")
  setTimeout(function () {
    $(`#flip-container-${_globalCicked + 1}`).addClass('show')
    playNext();
  }, 300)

}

function playNext() {
  // console.log(_globalCicked, "gloplab clicked",_pageData.sections[sectionCnt - 1].content.flipObjects.length)
  if (_globalCicked == _pageData.sections[sectionCnt - 1].content.flipObjects.length) {
    playBtnSounds(_pageData.sections[sectionCnt - 1].endAudio);
    audioEnd(function () {
      resetSimulationAudio();
      // $(".greetingsPop").css("display", "none");
      // $(".greetingsPop").css("opacity", "0");
      // setTimeout(function () {
      //   $(".popup").css("display", "flex");
      //   $(".popup").css("opacity", "1");
      // }, 100)
    })    
    showEndAnimations();
  } else if (_globalCicked <= _pageData.sections[sectionCnt - 1].content.flipObjects.length) {
    _currentAudio = _pageData.sections[sectionCnt - 1].content.flipObjects[_globalCicked].instAudio;
    playBtnSounds(_pageData.sections[sectionCnt - 1].content.flipObjects[_globalCicked].instAudio);
    audioEnd(function () {
      resetSimulationAudio();
      enableButtons();
    })
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
  closePopup('introPopup-1');
  console.log("Audio ending");

  $audio.on("timeupdate", function () {
    var currentTime = this.currentTime;
    $(".greetingsPop").css("visibility", "visible");
    $(".greetingsPop").css("opacity", "1");

    if (currentTime >= 1) {
      $(".confetti").addClass("show");
      // $(".confetti").show();
      setTimeout(function(){
        $(".greetingsPop").css("visibility", "hidden");
      $(".greetingsPop").css("opacity", "0");
      $(".popup").css("visibility", "visible");
        $(".popup").css("opacity", "1");
      },1500)
      setTimeout(function () {
        $(".confetti").removeClass("show");
        // $(".confetti").hide();                
      }, 2000);

      $audio.off("timeupdate");
    }

  });
}

function closeIntroPop(ldx) {
  playClickThen();
  AudioController.play();
  document.getElementById(ldx).style.display = 'none';
  let audio = document.getElementById("popupAudio");
  if (audio.src) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function replayLastAudio() {
  playClickThen();
  console.log(_currentAudio, "Audio plaing");
  playBtnSounds(_currentAudio);
  disableButtons();
  audioEnd(function () {
    resetSimulationAudio();
    enableButtons();
  })
}


function enableButtons() {
  $(".flip-card").prop("disabled", false);
  $(".flipTextAudio").prop("disabled", false);
}

function disableButtons() {
  $(".flip-card").prop("disabled", true);
  $(".flipTextAudio").prop("disabled", true);
}

function resetToggle() {
  $(".flip-card").removeClass('flipped');
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
  _tweenTimeline.add(animateFadeOut($(".dummy-patch"), 0.5).play(), 3);
  // _tweenTimeline.add(animateFadeIn($(".inst"), 0.5).play(), 5);

  _tweenTimeline.add(
    animateFadeIn($(".animat-container"), 0.5, 0).play(),
    0.3
  );

  var rightListTiming = [0.3];
  // for (var k = 0; k < rightListTiming.length; k++) {
  //   _tweenTimeline.add(
  //     animateFadeIn(
  //       $(".animat-container").find(".flip-container").eq(k),
  //       0.5,
  //       0
  //     ).play(),
  //     rightListTiming[k]
  //   );
  // }
}

// function withoutAudioSync() {
//   _tweenTimeline.play();
//   _tweenTimeline.add(animateFadeIn($("h1"), 0.5).play(), 0.5);
//   _tweenTimeline.add(animateFadeIn($(".animat-container"), 0.5, 0).play(), 0.1);
//   let time = 1,
//     t = 0,
//     pTag = 0,
//     listTag = 0,
//     divTag = 0;
//   let time1 = time;
//   for (let j = 0; j < _pageData.sections[0].content.listText.length; j++) {
//     t = time1 + j * 0.5;
//     _tweenTimeline.add(
//       animateFromRight(
//         $(".animat-container").find(".list li").eq(listTag),
//         0.5,
//         0
//       ).play(),
//       t
//     );
//     listTag++;
//   }
// }
// -------- resize page details ------------
/*window.onresize = function() {
    //setCSS()
}*/
