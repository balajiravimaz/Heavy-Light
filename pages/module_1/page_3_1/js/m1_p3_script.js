
// ---------- setting start ---------------
var _preloadData, _pageData
var _pagePreloadArray = {
    image: 1,
    audio: -1,
    video: 1,
    data: -1
}; // item not availble please assign value 1.
var jsonSRC = 'pages/module_1/page_3/data/m1_p3_data.json?v=';
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
        // _forceNavigation = true;

    }
    addSectionData();
    //assignAudio(_audioId, _audioIndex, _pageAudioSync, _forceNavigation, _videoId, _popupAudio, _reloadRequired);
    pagePreLoad();
    setTimeout(function () {
        initPageAnimations();
        showVisitedModule();
    }, 1500)


}

// ------------------ common function end ------------------------------------------------------------------------


// -------- adding slide data ------------
function addSectionData() {
    totalSection = _pageData.sections.length;
    for (let n = 0; n < _pageData.sections.length; n++) {
        sectionCnt = n + 1;
        let titleText = '', insText = '';
        if (sectionCnt == 1) {

            let sectionData = _pageData.sections[sectionCnt - 1];

            let htmlObj = '', imgObj = '';

            imgObj =

  "<div class='top-alignText'>" +

    "<div class='instruction'><button class='ins-click instruction_1' id='instruction_1'></button><button class='ins_1 i-txt-toolTip' data-tooltip='Information'></button></div>" +
    "<div class='instruction'><button class='ins-click instruction_2' id='instruction_2'></button><button class='ins_2 i-txt-toolTip' data-tooltip='Information'></button></div>" +
    



  "</div>" +   
  "<div class='inst-1-audio' id='audio-1' data-audio='" + sectionData.audio1 + "'> </div>" +
  "<div class='inst-2-audio' id='audio-2' data-audio='" + sectionData.audio2 + "'> </div>" +
//   "<div class='instruction-footer '>" + sectionData.footer + "</div>";
"</div>";

            const container = $('#section-' + sectionCnt)
            .find('.content-holder')
            .find('.col-left')
            .find('.content')
            .find('.content-bg');
        
        container.append(`
            <div class="body">
                <div class="dummypatch"></div>
                <div class="image-container">${imgObj}</div>
                
                
                
            </div>'<audio id="instructionAudio"></audio>'
        `);
        
        $('#section-' + sectionCnt)
            .find('.bg-img').append(`
            <video
                id="bgVideo"
                autoplay
                muted
                loop
                playsinline
                preload="auto"
            >
                <source src="pages/module_1/page_2/video/video_1.mp4" type="video/mp4">
            </video>
        `);
        
         $('#section-' + sectionCnt)
            .find('.content-holder').append(`<div class='header-container'><div class='home'><button data-tooltip="Back" class='home-go-to'></button><button data-tooltip="Music" class='music playing'></button></div></div>`);

            $('.content-holder') .append(`<div class="overlay">

            <div class="overlay-style">
                <!-- Mute Icon -->
                <div class="audio-style">
                    <div id="play" class="audio-toggle play"></div>
                    <div id="pause" class="audio-toggle pause"></div>
                </div>

                <div class="popup-circle">
                </div>
                
                <!-- Close Button -->
                    <div class="close-btn">X</div> 
            </div>

</div>`)

const popup = _pageData.popup; 
const popup2 = _pageData.popup2; 

const container_popup = $('#section-' + sectionCnt).find('.content-holder');
      container_popup .append(`<div class="ins_1_popup">
        
        <div class="overlay-layer">
            <div class="audio-style">
                <div class="mute" id="ins-1-audio-mute"></div>
                <div class="unmute" id="ins-1-audio-unmute"></div> 
            </div>    
            <div class="text-pos"></div>
            <div class="close_ins_1_popup">${popup.close}</div>
        </div> 

        </div>`);

        container_popup .append(`<div class="ins_2_popup">
        
            <div class="overlay-layer">
                <div class="audio-style">
                    <div class="mute" id="ins-2-audio-mute"></div>
                    <div class="unmute" id="ins-2-audio-unmute"></div> 
                </div>    
                <div class="text-pos"></div>
                <div class="close_ins_2_popup">${popup2.close}</div>
            </div> 

        </div>`);

     

            $('.ins-click').off('click').on('click', onClickHandler)

            $('.information-icon').off('click').on('click', onClickinfo)
            
            $('.close-btn').off('click').on('click', onClickinfoClose)

            $('.header-container-play').off('click').on('click', onClickinGotoPage)
            
            $('.close_ins_1_popup').off('click').on('click', onClickins_1_popup)
            $('.close_ins_2_popup').off('click').on('click', onClickins_2_popup)

            $('.ins_1').off('click').on('click', onClickins_1_popup_show)
            
            $('.ins_2').off('click').on('click', onClickins_2_popup_show)
            
            
            $('.completed-audio').off('click').on('click', onClickAudioHandler2);

            //audio
            $('#ins-1-audio-mute').off('click').on('click', onClickpauseAudio1);
            $('#ins-1-audio-unmute').off('click').on('click', onClickplayAudio1);
            
            //audio
            $('#ins-2-audio-mute').off('click').on('click', onClickpauseAudio2);
            $('#ins-2-audio-unmute').off('click').on('click', onClickplayAudio2);

            $(".home-go-to").on("click", jumpToPage);
            $(".music").on("click", toggleAudio);

           
        }
        setCSS(sectionCnt);

    }

    //showVisitedModule();
    if ((bookMarkArray[0] == '1') || (bookMarkArray[0] == 1)) {
        _visitedArr = bookMarkArray;
    }


}

function onClickinfo(){
    $('.overlay').show();
}

function onClickinfoClose(){
    $('.overlay').hide();
}

function onClickinGotoPage(){
    alert("go to next page")
}

function jumpToPage(){
      _controller.pageCnt = 0;
      _controller.updateViewNow();
}

function toggleAudio(event) {
    const el = event.currentTarget; 
    const audio = document.getElementById("audio_src");

    console.log(el, "Target class");

    if (audio.paused) {
        audio.muted = false;
        audio.play();
        el.classList.remove("mute");
        el.classList.add("playing");
    } else {
        audio.pause();
        el.classList.remove("playing");
        el.classList.add("mute");
    }
}






// Ins_1

function onClickins_1_popup(){
    if (currentAudio) {
        currentAudio.pause();   
        //alert('Audio Paused');  
    } else {
        console.log('No audio is currently playing');
    }

    $('.ins_1_popup').hide();
}

function onClickins_1_popup_show(){
    $('.ins_1_popup').css("display","flex");
    onClickAudioHandler2.call($('.inst-1-audio')[0], new Event('click'));
}

function onClickpauseAudio1(){
    if (currentAudio) {
        currentAudio.pause();   
        //alert('Audio Paused');  
    } else {
        console.log('No audio is currently playing');
    }

    $("#ins-1-audio-unmute").show();
    $('#ins-1-audio-mute').hide();
}

function onClickplayAudio1(){
    if (currentAudio) {
        currentAudio.play();   
        //alert('Audio Playing');  
    } else {
        console.log('No audio is currently available');
    }

    $("#ins-1-audio-mute").show();
    $("#ins-1-audio-unmute").hide();
}
//Ins_2
function onClickins_2_popup_show(){
    
    onClickAudioHandler2.call($('.inst-2-audio')[0], new Event('click'));
    $('.ins_2_popup').show();
}
function onClickins_2_popup(){
    if (currentAudio) {
        currentAudio.pause();   
        //alert('Audio Paused');  
    } else {
        console.log('No audio is currently playing');
    }
    $('.ins_2_popup').hide();
}

function onClickpauseAudio2(){
    if (currentAudio) {
        currentAudio.pause();   
        //alert('Audio Paused');  
    } else {
        console.log('No audio is currently playing');
    }

    $("#ins-2-audio-unmute").show();
    $('#ins-2-audio-mute').hide();
}

function onClickplayAudio2(){
    if (currentAudio) {
        currentAudio.play();   
        //alert('Audio Playing');  
    } else {
        console.log('No audio is currently available');
    }

    $("#ins-2-audio-mute").show();
    $("#ins-2-audio-unmute").hide();
    
}


var currentAudio = null; // Global reference to the current audio

function onClickAudioHandler2(e) {
    e.stopPropagation();
    const audioSrc = $(this).data('audio');
    if (!audioSrc) {
        console.log('No audio src found');
        return;
    }

    // Get or create the audio element
    const audio = document.getElementById('instructionAudio') || new Audio();
    currentAudio = audio;  // Store the current audio element for future control
    
    // Set audio source and play
    audio.src = audioSrc;
    audio.currentTime = 0;

    audio.play().catch(err => {
        console.error('Audio play failed:', err);
    });
}

function onClickHandler(evt) {
    var eventType = evt.type;
    console.log("clicked")
    var targetButton = $(this);
    var count = 0;
    var id = $(this).attr('id');
    var arr = id.split('_')
    var num = Number(arr[arr.length - 1]) - 1;
    console.log(id,num, "Number");

    var body = $('#section-' + sectionCnt).find('.content-holder').find('.col-mid').find('.content').find('.content-bg').find('.body')
    //var sectionArray = _pageData.sections[sectionCnt - 1].content.sectionArray;
    var jumpToPage = [5,4];
    // console.log(jumpToPage[num], "working apges");

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
        _tweenTimeline.add(animateFadeOut(body.find('.dummypatch '), 0.5).play(), 1)
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




