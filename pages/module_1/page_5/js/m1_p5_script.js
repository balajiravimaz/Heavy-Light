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
_audioRequired = true;
_videoRequired = false;
storeCurrentAudioTime = 0;
_popupAudio = false;
_reloadRequired = true;
_globalCicked = 0;
_btnClicked = 0;
_currentAudio = null;
_totalClicked=0;

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
        }<button class="wrapTextaudio playing" disabled="true" onClick="replayLastAudio(this)"></button></p><p class="inst">${_pageData.sections[sectionCnt - 1].iText
        }<button class="wrapTextaudio playing" id="wrapTextaudio_1" disabled="true" onClick="replayLastAudio(this)"></button></p></div>`;

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

      headerConent += `<div class="confetti"></div><div class="header"><div class="navBtns"><button id="home" data-tooltip="Back"></button><button id="music" class="music playing" data-tooltip="Music"></button><button id="info" data-tooltip="Information"></button></div><div class="titleText"><img src="${_pageData.sections[sectionCnt - 1].headerImg}"></div></div>`
      popupDiv += '<div class="popup">'
      popupDiv += '<div class="popup-wrap">'

      popupDiv += '<div class="popBtns">'
      popupDiv += '<button id="refresh" data-tooltip="Replay"></button>'
      popupDiv += '<button id="homeBack" data-tooltip="Back"></button>'
      popupDiv += '</div>'
      popupDiv += '</div>'
      popupDiv += '</div>'

      popupDiv +=`<div id="introPopup-1"><div class="popup-content">
                    <button class="introPopAudio mute" onclick="togglePop1Audio(this, '${_pageData.sections[sectionCnt - 1].infoAudio}')"></button>
                    <button class="introPopclose" data-tooltip="Close" onClick="closePopup('introPopup-1')"></button>
                    <img src="${_pageData.sections[sectionCnt - 1].infoImg}" alt="">
                </div>
            </div>`;

            popupDiv +=`<div id="home-popup" class="popup-home" role="dialog" aria-label="Exit confirmation" aria-hidden="false">
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
      $("#refresh").on("click", function(){
        jumtoPage(3);
      });
      $("#homeBack").on("click", function(){
        jumtoPage(0)
      });
      $("#home").on("click", function(){
        $("#home-popup").css('display', 'flex');
      });
      $(".music").on("click", function(event){
        let el=event.currentTarget;
        playClickThen(function() {
          toggleAudio(el);
        })
      }); 
      _currentAudio = _pageData.sections[sectionCnt - 1].initAudio;
      // $(".wrapTextAudio").on("click", replayLastAudio);

      // IdleAudioManager.init(_pageData.sections[sectionCnt - 1].idleAudio); 
          $('#courseAudio').on('ended', function() {
            IdleAudioManager.init(_pageData.sections[sectionCnt - 1].idleAudio); 
          })

              document.querySelector("#info").addEventListener("click", function (event) {
    const el = event.currentTarget;
    playClickThen(function() {
      // console.log("its wokring")
        $("#introPopup-1").css('display','flex')
        $("#introPopup-1").css('opacity','1') 
        $(".introPopAudio").removeClass('playing');
    $(".introPopAudio").addClass('mute');
    
  
    // $(".introPopAudio").on("click",function(){  
    //     console.log("its working");
        
    // })       
    });
    
});

      // setCSS(sectionCnt);
    }
  }
   $("#courseAudio").on("ended", function() {        
      console.log("Course audio was ended");
      $("#wrapTextaudio_1").prop('disabled', false);
});
}

function stayPage(){
  $("#home-popup").hide();
}
function leavePage(){
  jumtoPage(0);
}

function jumtoPage(pageNo) {
  
  _controller.pageCnt = pageNo;
  _controller.updateViewNow();
}

function replayLastAudio(btnElement){
  console.log(_currentAudio,btnElement, "Audio plaing", _currentAudio);
  togglePop1Audio(btnElement, _currentAudio);
  disableButtons();
  // playBtnSounds(_currentAudio);
  // disableButtons();
  audioEnd(function(){
    console.log("enabling buttons");
    enableButtons();
  })
}

function togglePop1Audio(el, src) {
    const audio = document.getElementById("simulationAudio");

    // If this is a different audio source, load it
    if (audio.src !== el.baseURI + src) {
        audio.src = src;
        audio.load();
        audio.muted = false;
        // Reset all buttons' states (optional)
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
      console.error("idleAudio is missing");
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
    idleInterval = setInterval(() => audioIdle.play().catch(console.log), 5000);
  }

  function _resetIdleTimer() {
    clearTimeout(idleTimeout);
    clearInterval(idleInterval);
    idleTimeout = setTimeout(_startIdle, 5000); // 5s of inactivity
  }

  function start() {
    _addActivityListeners();
    _resetIdleTimer();
  }

  function stop() {
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



function toggleAudio(el) {
  // const el = event.currentTarget;
  const audio = document.getElementById("audio_src");

  console.log(el, "Target class");

  if (audio.paused) {
    audio.muted = false;
    audio.play();
    el.classList.remove("mute");
    el.classList.add("playing");
  } else {
    audio.pause();
    audio.currentTime = 0;
    el.classList.remove("playing");
    el.classList.add("mute");
  }
}



var activeAudio = null;

function playBtnSounds(soundFile) {
  if (!soundFile) {
    console.warn("Audio source missing!");
    return;
  }

  console.log("calling audios");

  const audio = document.getElementById("simulationAudio");

  if (activeAudio && !activeAudio.paused) {
    activeAudio.pause();
    // Do NOT reset src yet, let it finish
  }

  audio.loop = false;
  audio.src = soundFile;
  audio.load();

  activeAudio = audio;

  audio.play().catch(err => {
    console.warn("Audio play error:", err);
  });
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
  var parentBtn = $(e.currentTarget);

  // Get button data
  var imgWeight = Number(parentBtn.data("weight"));
  var imgSrc = parentBtn.data("url");

  _currentAudio = _pageData.sections[sectionCnt - 1].content.ostAudios[_totalClicked].audioSRC;
  _totalClicked++;
  // Disable button
  parentBtn.prop("disabled", true);
  parentBtn.addClass("visited");

  _btnClicked++;
  clickCount++;
  disableButtons();

  // Play button sound
  playBtnSounds(_pageData.sections[sectionCnt - 1].content.btnAudios[0]);

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
    left: imgRect.left + scrollLeft - 70,
    top: imgRect.top + scrollTop
});


  // Target position
  var targetRect = $(targetDiv)[0].getBoundingClientRect();

  // exit;
  // Animate
  $img.animate(
    {
      left: targetRect.left + scrollLeft,
      top: targetRect.top + scrollTop
    },
    700,
    function () {
      $img.appendTo(targetDiv).css({
        position: "relative",
        left: 0,
        top: 5,
        
      });

      // Store weights
      if (clickCount === 1) leftWeight = imgWeight;
      if (clickCount === 2) rightWeight = imgWeight;

      // Play next sound
      playBtnSounds(_pageData.sections[sectionCnt - 1].content.btnAudios[1]);

      // First click OST
      if (clickCount === 1) {
        if (_globalCicked === 0) _globalCicked = 0;
        else _globalCicked++;

        var ostData = _pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked];

        setTimeout(function () {
          playBtnSounds(ostData.audioSRC);
          loadText(ostData.ost, ostData.duration);

          audioEnd(function () {
            enableButtons();
          });
        }, 1500);
      }

      // Completed check
      if (_btnClicked === _pageData.sections[sectionCnt - 1].content.imgObjects.length) {
        $(".image-container").addClass("completed");
      }

      $(".bar-holding").css("transform", "rotate(-5deg)");

      if (clickCount === 2) {
        setTimeout(evaluateSeesaw, 1000);
        setTimeout(() => checkHeavyLight(leftWeight, rightWeight), 2000);
        clearText();
      }
    }
  );
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
  playAudioChain(leftAudio, rightAudio, leftText, rightText, 'left-holding', 'right-holding', 1500, function () {
    setTimeout(function () {
      resetSeesaw();
    }, 1000)
  });

}

function playNextOst() {
  console.log(_globalCicked, "clicked", _pageData.sections[sectionCnt - 1].content.imgObjects.length);


  if (_globalCicked == _pageData.sections[sectionCnt - 1].content.imgObjects.length - 1) {
    $(".animations").addClass('show');  
    showEndAnimations();
    setTimeout(function () {
      $(".animations").removeClass('show');
      loadText(_pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].ost, _pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].duration);
    }, 3000)

    audioEnd(function () {
      enableButtons();

    });

  } 
  else if (_globalCicked == _pageData.sections[sectionCnt - 1].content.imgObjects.length - 2) {
   $(".image-container").addClass('completed');   
  }
  else {
    loadText(_pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].ost, _pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].duration);
    audioEnd(function () {
      enableButtons();
    });
  }  
  playBtnSounds(_pageData.sections[sectionCnt - 1].content.ostAudios[_globalCicked].audioSRC);

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

  var $audio = $('#simulationAudio');
  console.log("Audio ending");
  IdleAudioManager.stop();

  $audio.on('timeupdate', function () {
    var currentTime = this.currentTime;

    if (currentTime >= 11) {
      clearText();
      $(".confetti").addClass('show');
      setTimeout(function () {
        $(".confetti").removeClass('show');
      }, 2000)

      setTimeout(function () {
        $(".popup").css('display', 'flex');
        $(".popup").css("opacity", "1");
      }, 1000);

      $audio.off('timeupdate');
    }
  });
}


function playAudioChain(firstAudio, secondAudio, firstText, secondText, firstCls, secondCls, delay = 0, onComplete) {
  const audio = document.getElementById("simulationAudio");

  console.log(firstText, secondText, "texts");

  // 1️⃣ Play first audio
  if (firstAudio) {
    appendTextOnTop(firstText, firstCls); // call when first audio starts
    playBtnSounds(firstAudio);

    if (secondAudio) {
      // 2️⃣ Wait for first audio to finish
      audioEnd(() => {
        audio.onended = null; // remove old listener

        setTimeout(() => {
          // 3️⃣ Play second audio
          appendTextOnTop(secondText, secondCls); // call when second audio starts
          playBtnSounds(secondAudio);

          // 4️⃣ Wait for second audio to finish
          audioEnd(() => {
            audio.onended = null;
            if (typeof onComplete === "function") onComplete();
          });

        }, delay);
      });
    } else {
      // Only first audio exists
      audioEnd(() => {
        audio.onended = null;
        if (typeof onComplete === "function") onComplete();
      });
    }
  }
}


function enableButtons() {
  console.log("its enalling");
  $(".btn").not(".visited").prop("disabled", false);
  IdleAudioManager.start();
}

function disableButtons() {
  $(".btn").not(".visited").prop("disabled", true);
  IdleAudioManager.stop();
}

function loadAudio() { }

function loadText(txtArr, duration = 2000) {
  const container = document.querySelector(".wrap .text");
  container.innerHTML = "";

  if (!txtArr || txtArr.length === 0) return;

  const pTags = txtArr.map(text => {
    const p = document.createElement("p");
    p.innerHTML = text;
    console.log(_totalClicked, _pageData.sections[sectionCnt - 1].content.imgObjects.length, "ttoal")
    if(_totalClicked !== _pageData.sections[sectionCnt - 1].content.imgObjects.length ){
      p.innerHTML +='<button class="wrapTextaudio playing" onClick="replayLastAudio(this)"></button>';
    }
    if (_globalCicked == _pageData.sections[sectionCnt - 1].content.imgObjects.length - 1) {
      p.style.fontSize = '55px';
      $(".wrap").css('max-width', '750px')
    }
    container.appendChild(p);
    
    return p;
  });

  function showText(index) {
    pTags.forEach(p => p.classList.remove("show"));
    pTags[index].classList.add("show");

    // wait ONLY before showing the next text
    if (index + 1 < pTags.length) {
      setTimeout(() => {
        showText(index + 1);
      }, duration);
    }
  }

  // 🔹 show first text immediately
  showText(0);
}

function appendTextOnTop(text, cls) {
  const selector = cls.startsWith('.') ? cls : `.${cls}`;
  const container = document.querySelector(selector);
  if (!container) return;

  // Create <p> element
  const p = document.createElement("p");
  p.innerHTML = text;

  // Add on top of container
  container.prepend(p);

  // Update <p> inside left-holding and right-holding
  const leftChild = container.querySelector('.left-holding p');
  const rightChild = container.querySelector('.right-holding p');

  console.log(leftChild, rightChild, "left and right");
  if (leftChild && rightChild) {
    const angle = getOppositeRotation(); // get opposite rotation
    leftChild.style.transform = `rotate(${angle}deg)`;
    rightChild.style.transform = `rotate(${angle}deg)`;
  }

  // Manage active classes
  $(".left-holding, .right-holding").removeClass("active");
  $(selector).addClass("active");
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
  playNextOst();

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
