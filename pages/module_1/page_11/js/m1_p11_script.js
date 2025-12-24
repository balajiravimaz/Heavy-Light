
// ---------- setting start ---------------
var _preloadData, _pageData
var _pagePreloadArray = {
    image: 1,
    audio: -1,
    video: 1,
    data: -1
}; // item not availble please assign value 1.
var jsonSRC = 'pages/module_1/page_11/data/m1_p11_data.json?v=';
_pageAudioSync = true;
_forceNavigation = false;
_audioRequired = true;
_videoRequired = false;
storeCurrentAudioTime = 0;
_popupAudio = false;
_reloadRequired = true;

_checkAudioFlag = false;
_popTweenTimeline = null;
_tweenTimeline = null;
var _audioIndex = 0;
_videoId = null;
_audioId = null;
// ---------- setting end ---------------
var sectionCnt = 0;
var totalSection = 0;
var prevSectionCnt = -1;
var sectionTopPos = []
var playMainAudio = false;
var totalVisited = 0;
var _currentAudioIndex = 0;
var _visitedArr = [];
// ------------------ common function start ------------------------------------------------------------------------
$(document).ready(function () {
    _preloadData = new PagePreload()
    _preloadData.initObj(_pagePreloadArray, jsonSRC);
    _preloadData.addCustomEvent('ready', _pageLoaded);
})

function _pageLoaded() {
    _pageData = _preloadData.jsonData

    if (_audioRequired) {
        _audioId = _pageData.mainAudio.audioSRC;
        _audioIndex = _pageData.mainAudio.audioIndex;
    }

    if (_videoRequired)
        _videoId = "courseVideo";

    if (parent._strictNavigation) {

    }
    addSectionData();

    checkGlobalAudio();
    assignAudio(_audioId, _audioIndex, _pageAudioSync, _forceNavigation, _videoId, _popupAudio, _reloadRequired);
    pagePreLoad();
    setTimeout(function () {
        initPageAnimations();
        showVisitedModule();
    }, 1500)

    console.log("_audioId", _audioId);

}

// ------------------ common function end ------------------------------------------------------------------------


// -------- adding slide data ------------
function addSectionData() {
    totalSection = _pageData.sections.length;
    for (let n = 0; n < _pageData.sections.length; n++) {
        sectionCnt = n + 1;
        let titleText = '', insText = '';
        if (sectionCnt == 1) {


            let textObject = '', listObject = '', titleText = '';

            let sectionData = _pageData.sections[sectionCnt - 1];
            let gameData = sectionData.content.sectionArray[0].game;
            let objectsArr = gameData.objects;

            let objectsHTML = '';


            for (let i = 0; i < objectsArr.length; i++) {
                objectsHTML +=
                    "<div class='obj-cont' id='obj-cont-" + objectsArr[i].id + "' ><div class='object' " +
                    "id='" + objectsArr[i].id + "' " +
                    "data-type='" + objectsArr[i].weight + "' " +
                    "draggable='true'>" +
                    "<img src='" + objectsArr[i].image + "' alt='' />" +
                    "</div></div>";
            }

            let htmlObj = '',
                imgObj =
                    "<div class='game-completed'> <div class='greetingsPop'></div><div class='game-completed-popup'><button class='replay' data-tooltip='Replay'></button><button data-tooltip='Back' class='home'></button></div> </div>" +
                    "<div class='game-container'>" +
                    "<div class='dummy-box'></div>" +
                    "<div class='box'>" +
                    "<div class='box-title'>" + sectionData.boxType1 + "</div>" +
                    "<div class='drop-area' id='heavyBox' data-type='heavy'></div>" +
                    "</div>" +

                    "<div class='box'>" +
                    "<div class='box-title'>" + sectionData.boxType2 + "</div>" +
                    "<div class='drop-area' id='lightBox' data-type='light'></div>" +
                    "</div>" +

                    "<div class='objects-container' id='objectsContainer'>" +
                    objectsHTML +
                    "</div>";

            htmlObj += textObject + insText;



            $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').append('<div class="header-container"><div class="navBtns"><button id="home" data-tooltip="Back"></button><button class="music playing" data-tooltip="Music"></button></div><div class="titleText"><img src="pages/module_1/page_11/images/heading-text.png"></div></div><div class="body"><div class="dummypatch"></div><div class="top-alignText"><div class="instruction">' + sectionData.instruction + '</div><button class="intro-audio" data-audio=' + gameData.audio.instruction + '> </button><div class="completed-audio" data-audio=' + gameData.audio.success + '> </div><div class="completed-correct" data-audio=' + gameData.audio.correct + '> </div><div class="completed-wrong" data-audio=' + gameData.audio.wrong + '> </div></div><div class="image-container">' + imgObj + '</div></div><audio id="instructionAudio"></audio>');


            $('.content-holder').append(`<div id="home-popup" class="popup-home" role="dialog" aria-label="Exit confirmation" aria-hidden="false">
    <div class="popup-content modal-box">
      <h2 class="modal-title">Oops!</h2>
      <div class="modal-message">
        <p>  If you leave the sorting game then you have to start from beginning. </p>
        <p class="modal-question">Are you sure you want to leave?</p>
      </div>
    
      <div class="modal-buttons">
        <button id="stay-btn" class="modal-btn" onClick="stayPage()">Stay</button>
        <button id="leave-btn" class="modal-btn" onClick="leavePage()">Leave</button>
      </div>
    </div>
  </div>`)

            $('.box').off('click mouseenter mouseleave').on('click mouseenter mouseleave', onClickHandler)

            $('.intro-audio').off('click').on('click', onClickAudioHandler);

            $('.completed-audio').off('click').on('click', onClickAudioHandler2);

            // $('.replay').off('click').on('click', replayGame)

            // $('#home').off('click').on('click', replayGameInfro)

            $(".replay").on("click", function () {
                playClickThen();
                jumtoPage(5);
            });
            $(".home").on("click", function () {
                playClickThen();
                jumtoPage(1)
            });

            $(".music").on("click", function (event) {
                playClickThen();
                let el = event.currentTarget;
                    toggleAudio(el);
            });

            $('.stay-btn').off('click').on('click', staybtnClickPopup)


            totalObjects = $('#section-' + sectionCnt).find('.object').length;
            correctCount = 0;

            $(".close-btn").on("click", function () {
                playClickThen();
                jumtoPage(1);///change after
            });
            // $("#home,#homeBack").on("click", function(){
            //     jumtoPage(1)
            // });$()

            $("#home").on("click", showHome);
        }
        setCSS(sectionCnt);

    }
//   $("#courseAudio").on("ended", function () {
//     console.log("Course audio was ended");
//     $(".intro-audio").prop('disabled', false);
//   });
    //showVisitedModule();
    if ((bookMarkArray[0] == '1') || (bookMarkArray[0] == 1)) {
        _visitedArr = bookMarkArray;
    }
}


function showHome() {
    playClickThen();
    $("#home-popup").css("display", "flex");
}

function stayPage() {
    playClickThen();
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

    _controller.pageCnt = pageNo;

    _controller.updateViewNow();
}


function onClickAudioHandler(e) {
      $("#courseAudio")[0].pause();
    playClickThen();
    $('.dummy-box').show();
    e.stopPropagation();
    const audioSrc = $(this).data('audio');
    if (!audioSrc) {
        console.log('No audio src found');
        return;
    }

    const audio = document.getElementById('instructionAudio');
    if (!audio) {
        console.log('Audio element not found');
        return;
    }

    audio.src = audioSrc;
    audio.currentTime = 0;

    audio.play().catch(err => {
        console.error('Audio play failed:', err);
    });

    audio.addEventListener('ended', function () {
        console.log('Audio finished playing');
        $('.dummy-box').hide();
    });
}

function onClickAudioHandler2(e) {
    playClickThen();
    //alert("Success");
    e.stopPropagation();
    const audioSrc = $(this).data('audio');
    if (!audioSrc) {
        console.log('No audio src found');
        return;
    }

    const audio = document.getElementById('instructionAudio');
    if (!audio) {
        console.log('Audio element not found');
        return;
    }

    audio.src = audioSrc;
    audio.currentTime = 0;

    audio.onended = function () {
        onAudioEndedCallback();
    };


    audio.play().catch(err => {
        console.error('Audio play failed:', err);
    });
}

function onAudioEndedCallback() {
    console.log("not workings");
    $(".greetingsPop").css("display", "none");
    $(".greetingsPop").css("opacity", "0");
    $('.game-completed').removeClass("show");
    $(".game-completed-popup").css("display", "flex")
    $(".game-completed-popup").css("opacity", "1")
}

/* ================= DRAG START ================= */
$(document).on('dragstart', '.object', function (e) {
    e.originalEvent.dataTransfer.setData('text/plain', this.id);
});

/* ================= DRAG OVER ================= */
$(document).on('dragover', '.drop-area', function (e) {
    e.preventDefault();
});

/* ================= DROP ================= */

function replayGame() {
    playClickThen();
    location.reload();
}

function replayGameInfro() {
    $('.overlay').css("display", "flex");
}

function staybtnClickPopup() {
    
    $('.overlay').css("display", "none");
}

$(document).on('drop', '.drop-area', function (e) {
    e.preventDefault();

    const draggedId = e.originalEvent.dataTransfer.getData('text/plain');
    const draggedEl = $('#' + draggedId);
    const dropType = $(this).data('type');

    if (!draggedEl.length) return;

    if (draggedEl.data('type') === dropType) {

        if (!draggedEl.hasClass('correct')) {
            correctCount++;
            onClickAudioHandler2.call($('.completed-correct')[0], new Event('click'));
            // onAudioEndedCallback();
        }

        $(this).append(draggedEl);
        draggedEl.removeClass('wrong').addClass('correct');

        if (correctCount === totalObjects) {
            $('.game-completed').show();
            setTimeout(function () {
                $(".greetingsPop").css("display", "flex");
                $(".greetingsPop").css("opacity", "1");
            }, 300);
            setTimeout(function () {
                $('.game-completed').addClass("show");
            }, 1000)
            onClickAudioHandler2.call($('.completed-audio')[0], new Event('click'));
        }

    }
    else {
        draggedEl.addClass('wrong');
        setTimeout(() => draggedEl.removeClass('wrong'), 800);
        onClickAudioHandler2.call($('.completed-wrong')[0], new Event('click'));
        //alert("Incorrect");
    }
});



function setCSS($sectionCnt) {
    _wrapperWidth = $('#f_wrapper').outerWidth()
    _wrapperHeight = $('#f_wrapper').outerHeight()
    // ---- checking device width and height ----
    if (_wrapperWidth > 768) {
        for (var i = 0; i < _pageData.imgCollage.desktop.length; i++) {
            $('#section-' + $sectionCnt).find('.bg-img').eq(i).css({
                'background-image': 'url(' + _pageData.imgCollage.desktop[$sectionCnt - 1].imageSRC + ')',
                'background-size': 'cover'
            })
        }
    } else {
        for (var j = 0; j < _pageData.imgCollage.portrait.length; j++) {
            $('#section-' + $sectionCnt).find('.bg-img').eq(j).css({
                'background-image': 'url(' + _pageData.imgCollage.portrait[j].imageSRC + ')',
                'background-size': 'cover'
            })
        }
    }
}

function showVisitedModule() {
    getModuleLevelpageVisited();
    console.log("Raj-------------", getModuleLevelPageCount);

    var pageCnter = 0;
    var sectionArray = _pageData.sections[sectionCnt - 1].content.sectionArray;
    //$('#box-'+ ( _controller.pageCnt + 1)).addClass('active');

    $(".image-container").find(".box").removeClass('active');

    setTimeout(function () {
        pageVisited();
        for (let i = 0; i < sectionArray.length; i++) {

            console.log(_controller.pageCnt + 1, sectionArray[i].sectionID, "Controoler")
            if ((_controller.pageCnt + 1) == sectionArray[i].sectionID) {
                console.log(sectionArray[i].sectionIndx, sectionArray[i].sectionID, "Controoler", i)
                $('#box-' + sectionArray[i].sectionIndx).addClass('active');
                $('#box-' + sectionArray[i].sectionIndx).find('img').attr('src', sectionArray[i].imgActive)
                $('#box-' + sectionArray[i].sectionIndx).attr("disabled", false);
                $('#box-' + sectionArray[i].sectionIndx).css({
                    pointerEvents: "auto",
                    cursor: "pointer"
                })

                let currentDiv = '#box-' + sectionArray[i].sectionIndx;
                // console.log('#box-' + sectionArray[i].sectionIndx, currentDiv, "visited", ('#arrow-' + (sectionArray[i].sectionIndx)))

                if ($(currentDiv).hasClass("visited")) {
                    console.log((sectionArray[i].sectionIndx + 1), "Visited")
                    $('#box-' + (sectionArray[i].sectionIndx + 1)).attr("disabled", false);
                    $('#box-' + (sectionArray[i].sectionIndx + 1)).css({
                        pointerEvents: "auto",
                        cursor: "pointer"
                    })

                }
                loadAudio(sectionArray[i])
                // console.log("Audio Count", audioCount);
                // console.log(_pageData.mainAudio+' '+audioCount);
            }

            for (let j = 0; j < getModuleLevelPageCount.length; j++) {
                let count = 0;
                if (Array.isArray(getModuleLevelPageCount[j])) {
                    for (let k = 0; k < getModuleLevelPageCount[j].length; k++) {
                        if (getModuleLevelPageCount[j][k] == 1) {
                            count++;
                        }
                    }

                    console.log('count ', count, getModuleLevelPageCount[j].length, getModuleLevelPageCount[j])
                    if (count == getModuleLevelPageCount[j].length) {
                        console.log(getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]), "Values")
                        $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]) - 1)).find(".moduleVisited").show();
                        $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]) - 1)).addClass('visited')



                        $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]) - 1)).css({
                            pointerEvents: "auto",
                            cursor: "pointer"
                        })

                        $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]))).css({
                            pointerEvents: "auto",
                            cursor: "pointer"
                        })
                        $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]))).attr("disabled", false);



                        let boxElement = $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]))).find(".moduleVisited")
                        var id = $(boxElement).attr('id');
                        var arr = id.split('-')
                        var num1 = Number(arr[arr.length - 1]) - 1;
                        $("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]))).find("img").attr('src', sectionArray[num1].imgVisisted);


                        //$("#box-" + (getModuleLevelPageCount.indexOf(getModuleLevelPageCount[j]))).addClass('active');
                    }
                }

            }
        }
    }, 200)

}

function getModuleLevelpageVisited() {
    console.log(getModuleLevelPageCount, "Module Level count start")

    var sectionArray = _pageData.sections[sectionCnt - 1].content.sectionArray;

    for (let i = 0; i < sectionArray.length; i++) {
        if (Array.isArray(getModuleLevelPageCount[sectionArray[i].sectionIndx])) {
            let count = sectionArray[i].sectionID
            for (let j = 0; j < getModuleLevelPageCount[sectionArray[i].sectionIndx].length; j++) {
                if ((_visitedArr[count] == '1') || (_visitedArr[count] == 1)) {
                    getModuleLevelPageCount[sectionArray[i].sectionIndx][j] = 1;
                }
                count++
            }
        }
    }
    console.log(getModuleLevelPageCount, "Module Level count end")

}

function toggleAudio(el) {
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

function onClickHandler(evt) {
    var eventType = evt.type;
    // var targetButton = $(this);
    // var count = 0;
    // var id = $(this).attr('id');
    // var arr = id.split('-')
    // var num = Number(arr[arr.length - 1]) - 1;

    var body = $('#section-' + sectionCnt).find('.content-holder').find('.col-mid').find('.content').find('.content-bg').find('.body')
    //var sectionArray = _pageData.sections[sectionCnt - 1].content.sectionArray;
    // var jumpToPage = [1, 2, 3, 4];
    // console.log("Jump to page", jumpToPage[num])
    //var jumpToPage = sectionArray.sectionID

    //console.log(' == num ', num, sectionCnt,  _pageData.sections[sectionCnt-1].content[num].terms.iconHoverImage)
    switch (eventType) {
        case "click":
            //pageVisited();
            _controller.pageCnt = jumpToPage[num];

            // $("#f_preventor").show();
            _controller.updateViewNow();
            break;
        case "mouseenter":
            break;
        case "mouseleave":
            break;
    }
}


function loadAudio(aud) {
    _audioId = aud.audioSRC;
    _audioIndex = aud.audioIndex;
    // console.log(_audioIndex)
    _currentAudioIndex = _audioIndex

    assignAudio(_audioId, _audioIndex, _pageAudioSync, _forceNavigation, _videoId, _popupAudio, _reloadRequired);

}


function removeTags(str) {
    if ((str === null) || (str === '')) {
        return false;
    } else {
        str = _controller.removeTags(str);
        return str
    }
} function initPageAnimations() {
    if (_tweenTimeline) {
        _tweenTimeline.kill();
    }
    _tweenTimeline = new TimelineLite();


    mainAnimation();
    if (_pageAudioSync && !_pageData.mainAudio.isEmptyAudio) {
        withAudioSync()
    } else {
        withoutAudioSync()
    }

}

function mainAnimation() {
    $(".f_page_content").animate({
        'opacity': 1
    }, 300);
}



function withAudioSync() {

    _tweenTimeline.play();
    console.log("With Audio", _currentAudioIndex)
    _tweenTimeline.add(animateFadeIn($('.col-left'), 0.5).play(), 0.5)
    var body = $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.body');
    _tweenTimeline.add(animateFadeIn($('h1'), 0.5).play(), 2)
    _tweenTimeline.add(animateFadeIn(body.find('.text-container'), 0.5).play(), 1)
    _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('p'), 0.5).play(), 1.5)
    // var iconTimings = [3];
    // var textTimings = [3,5,7];
    // for (var k = 0; k < iconTimings.length; k++) {
    //    _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('p').eq(k), 0.5, 0).play(), iconTimings[k])
    // }
    var rightListTiming = [1, 2];
    for (var k = 0; k < rightListTiming.length; k++) {
        _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('li').eq(k), 0.5, 0).play(), rightListTiming[k])
    }

    var boxTiming1 = [0.5, 0.9, 1.2, 1.5]
    _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('.ins-txt '), 0.5).play(), 1)
    _tweenTimeline.add(animateFadeOut(body.find('.dummy-box'), 0.5).play(), 6)
    for (var k = 0; k < boxTiming1.length; k++) {
        _tweenTimeline.add(animateFadeIn(body.find('.box').eq(k), 0.5, 0).play(), boxTiming1[k])
    }

    // if (_currentAudioIndex == 0) {
    //     var boxTiming1 = [0.5, 0.9, 1.2, 1.5]
    //     _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('.ins-txt '), 0.5).play(), 1)
    //     _tweenTimeline.add(animateFadeOut(body.find('.dummypatch '), 0.5).play(), 1)
    //     for (var k = 0; k < boxTiming1.length; k++) {
    //         _tweenTimeline.add(animateFadeIn(body.find('.box').eq(k), 0.5, 0).play(), boxTiming1[k])
    //     }
    // } else if (_currentAudioIndex == 1) {
    //     var boxTiming2 = [0.5, 0.9, 1.2, 1.5]
    //     _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('.ins-txt '), 0.5).play(), 4.5)
    //     _tweenTimeline.add(animateFadeOut(body.find('.dummypatch '), 0.5).play(), 1)
    //     for (var k = 0; k < boxTiming2.length; k++) {
    //         _tweenTimeline.add(animateFadeIn(body.find('.box').eq(k), 0.5, 0).play(), boxTiming2[k])
    //     }
    // }
    // else if (_currentAudioIndex == 2) {
    //     var boxTiming3 = [0.5, 0.9, 1.2, 1.5]
    //     _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('.ins-txt '), 0.5).play(), 4.5)
    //     _tweenTimeline.add(animateFadeOut(body.find('.dummypatch '), 0.5).play(), 1)
    //     for (var k = 0; k < boxTiming3.length; k++) {
    //         _tweenTimeline.add(animateFadeIn(body.find('.box').eq(k), 0.5, 0).play(), boxTiming3[k])
    //     }
    // }
    // else if (_currentAudioIndex == 3) {
    //     var boxTiming3 = [0.5, 0.9, 1.2, 1.5]
    //     _tweenTimeline.add(animateFadeIn(body.find('.text-container').find('.ins-txt '), 0.5).play(), 4.5)
    //     _tweenTimeline.add(animateFadeOut(body.find('.dummypatch '), 0.5).play(), 1)
    //     for (var k = 0; k < boxTiming3.length; k++) {
    //         _tweenTimeline.add(animateFadeIn(body.find('.box').eq(k), 0.5, 0).play(), boxTiming3[k])
    //     }
    // }

    //var iconTimings = [1.5,2,2.5,3,3.5];
    //var textTimings = [3,5,7];
    // for (var k = 0; k < iconTimings.length; k++) {
    //      _pageThis["_tweenTimeline" + courseIdNameRef].add(animateFadeIn($(courseIdNameRef + '').find('.icon').eq(k), 0.5, 0).play(), iconTimings[k])
    // }
    /*  
     for (var l = 0; l < textTimings.length; l++) {
          _pageThis["_tweenTimeline" + courseIdNameRef].add(animateFadeIn($(courseIdNameRef + '').find('.text').eq(l), 0.5, 0).play(), textTimings[l])
     } */
}
function withoutAudioSync() {
    _tweenTimeline.play();
    console.log("Out Audio")
    _tweenTimeline.add(animateFadeIn($('h1'), 0.5).play(), 0.5)
    _tweenTimeline.add(animateFromMarginLeft($('.animat-container'), 0.5, 0).play(), 1)
    let time = 1, t = 0, pTag = 0, listTag = 0, divTag = 0;
    for (let i = 0; i < _pageData.sections[0].content.text.length; i++) {
        t = time + (i * 0.5)
        if (Array.isArray(_pageData.sections[0].content.text[i])) {
            let time1 = t + 0.5
            for (let j = 0; j < _pageData.sections[0].content.text[i].length; j++) {
                t = time1 + (j * 0.5)
                _tweenTimeline.add(animateFadeIn($(courseIdNameRef + '').find('ul li').eq(listTag), 0.5, 0).play(), t);
                listTag++
            }
            time = time1
        } else {
            _tweenTimeline.add(animateFadeIn($(courseIdNameRef + '').find('p').eq(pTag), 0.5, 0).play(), t);
            pTag++
        }

    }

}





