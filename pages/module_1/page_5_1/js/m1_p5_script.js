
// ---------- setting start ---------------
var _preloadData, _pageData
var _pagePreloadArray = {
    image: -1,
    audio: -1,
    video: 1,
    data: -1
}; // item not availble please assign value 1.
var jsonSRC = 'pages/module_1/page_5/data/m1_p5_data.json?v='
_pageAudioSync = true;
_forceNavigation = false;
_audioRequired = true;
_videoRequired = false;
storeCurrentAudioTime = 0;
_popupAudio = false;
_reloadRequired = true;

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
var sectionTopPos = []
var playMainAudio = false;
// ------------------ common function start ------------------------------------------------------------------------
$(document).ready(function () {
    //console.log('Page ready')
    _preloadData = new PagePreload()
    _preloadData.initObj(_pagePreloadArray, jsonSRC);
    _preloadData.addCustomEvent('ready', _pageLoaded);
    //console.log('Page ready 1', _preloadData)
})

function _pageLoaded() {
    //console.log('_pageLoaded')
    _pageData = _preloadData.jsonData
    if (_audioRequired) {
        _audioId = _pageData.mainAudio.audioSRC;
        _audioIndex = _pageData.mainAudio.audioIndex;
    }

    if (_videoRequired)
        _videoId = "courseVideo";

    //addSlideData();
    addSectionData();
    assignAudio(_audioId, _audioIndex, _pageAudioSync, _forceNavigation, _videoId, _popupAudio, _reloadRequired);
    pagePreLoad();
}

// ------------------ common function end ------------------------------------------------------------------------


// -------- adding slide data ------------
function addSectionData() {
    totalSection = _pageData.sections.length;
    for (let n = 0; n < _pageData.sections.length; n++) {
        sectionCnt = n + 1;
        if (sectionCnt == 1) {
            
            $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').append('<div class="inst"><p tabindex="0" aria-label="'+removeTags(_pageData.sections[sectionCnt - 1].iText)+'">'+_pageData.sections[sectionCnt - 1].iText+'</p></div>');

            /* $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').append(_pageData.sections[sectionCnt - 1].headerTitle);*/

            /*let titletext = $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').text()
            $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').find('h1').attr('aria-label', titletext)*/

            // $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style')


            //    let textObject = '', listObject = '';


            // Create the main structure dynamically
            let htmlContent = `
    
    <div class="main-section">

    <div id="formulas-section" class="formulas-section">
    <div class="area"><p tabindex="0" aria-label="Area = L × B">Area = L × B</p></div>
    <div class="perimeter"><p tabindex="0" aria-label="Perimeter = 2(L + B)">Perimeter = 2(L + B)</p></div>                        
    </div>


      <div class="grid-section">
        <div id="grid-wrapper" class="grid-wrapper">
          <div id="grid-container" class="grid-container"></div>
        </div>
      </div>

      <div class="info-panel">
        <div class="info-box">
          <div class="info-area">
          <p><span>Area</span> = <span id="area-value">___</span> sq units</p>
          </div>          
          <div class="info-perimeter">
          <p><span>Perimeter</span> = <span id="perimeter-value">___</span> units</p>
          </div>
        </div>
        
      <div class="tile-source">
      
        <div class="tile-row">
          <div id="draggable-tile" draggable="true" class="draggable-tile">            
          </div>
          <p>ADD UNIT SQUARE</p>
        </div>
        <div class="formula-toggle">
        <label class="checkbox-item">
          <input type="checkbox" id="formula-toggle-button">
          <span class="toggle"></span>
          SHOW FORMULA
          </label>        
        </div>

        <div class="resize-toggle">
        <label class="checkbox-toggle">          
          <span class="toggle"></span>
          RESIZE HANDLES
          </label>        
        </div>

    </div>
        
      </div>
    </div>

    <div class="bottom-controls">
    <button class="btn-skip">Skip</button>
      <button class="btn-next">Next</button>
    </div>
  `;

            $('#section-' + sectionCnt).find('.content-holder').find('.col-left').find('.content').find('.content-bg').find('.content-style').append('<div class="body"><div class="animat-container"> ' + htmlContent + '</div> </div>');

            setCSS(sectionCnt);
            gameStart();
        }



    }


}


function gameStart() {



    // --- CONFIG & CONSTANTS ---
    const GRID_ROWS = 10;
    const GRID_COLS = 20;
    const TILE_SIZE = 32; // Corresponds to w-8/h-8 in Tailwind
    const TILE_COLOR = 'bg-orange-400';

    // --- STATE ---
    let grid = createEmptyGrid();
    let showFormulas = true;
    let showGridLines = true;
    let showDimensions = true;

    // --- DOM ELEMENTS ---
    const gridContainer = document.getElementById('grid-container');
    const gridWrapper = document.getElementById('grid-wrapper');
    const draggableTile = document.getElementById('draggable-tile');
    // const resetButton = document.getElementById('reset-button');
    const formulaToggleButton = document.getElementById('formula-toggle-button');
    // const rememberButton = document.getElementById('remember-button');
    const formulaButtonText = document.getElementById('formula-button-text');
    const formulasSection = document.getElementById('formulas-section');
    // const settingsShowGrid = document.getElementById('settings-show-grid');
    // const settingsShowDimensions = document.getElementById('settings-show-dimensions');

    // Info Panel Elements
    const areaValueEl = document.getElementById('area-value');
    const perimeterValueEl = document.getElementById('perimeter-value');

    // --- FUNCTIONS ---

    function createEmptyGrid() {
        return Array.from({ length: GRID_ROWS }, () =>
            Array.from({ length: GRID_COLS }, () => ({
                filled: false,
                color: '',
                element: null,
            }))
        );
    }

    function calculateMetrics() {
        let filledCellCount = 0;
        let perimeter = 0;

        grid.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell.filled) {
                    filledCellCount++;
                    // Check neighbors to calculate perimeter
                    if (r === 0 || !grid[r - 1][c].filled) { perimeter++; }
                    if (r === GRID_ROWS - 1 || !grid[r + 1][c].filled) { perimeter++; }
                    if (c === 0 || !grid[r][c - 1].filled) { perimeter++; }
                    if (c === GRID_COLS - 1 || !grid[r][c + 1].filled) { perimeter++; }
                }
            });
        });

        return { area: filledCellCount, perimeter };
    }

    function calculateDimensionSegments() {
        const segments = [];
        const processedHorizontalEdges = new Set();
        const processedVerticalEdges = new Set();

        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (!grid[r][c].filled) continue;

                // --- HORIZONTAL SEGMENTS ---
                // Check TOP edge
                if (!grid[r - 1]?.[c]?.filled && !processedHorizontalEdges.has(`${r}-${c}`)) {
                    let length = 0;
                    let k = c;
                    while (grid[r]?.[k]?.filled && !grid[r - 1]?.[k]?.filled) {
                        processedHorizontalEdges.add(`${r}-${k}`);
                        length++;
                        k++;
                    }
                    if (length > 0) segments.push({ type: 'h', side: 'top', r, c, length });
                }
                // Check BOTTOM edge
                if (!grid[r + 1]?.[c]?.filled && !processedHorizontalEdges.has(`${r + 1}-${c}`)) {
                    let length = 0;
                    let k = c;
                    while (grid[r]?.[k]?.filled && !grid[r + 1]?.[k]?.filled) {
                        processedHorizontalEdges.add(`${r + 1}-${k}`);
                        length++;
                        k++;
                    }
                    if (length > 0) segments.push({ type: 'h', side: 'bottom', r, c, length });
                }

                // --- VERTICAL SEGMENTS ---
                // Check LEFT edge
                if (!grid[r]?.[c - 1]?.filled && !processedVerticalEdges.has(`${r}-${c}`)) {
                    let length = 0;
                    let k = r;
                    while (grid[k]?.[c]?.filled && !grid[k]?.[c - 1]?.filled) {
                        processedVerticalEdges.add(`${k}-${c}`);
                        length++;
                        k++;
                    }
                    if (length > 0) segments.push({ type: 'v', side: 'left', r, c, length });
                }
                // Check RIGHT edge
                if (!grid[r]?.[c + 1]?.filled && !processedVerticalEdges.has(`${r}-${c + 1}`)) {
                    let length = 0;
                    let k = r;
                    while (grid[k]?.[c]?.filled && !grid[k]?.[c + 1]?.filled) {
                        processedVerticalEdges.add(`${k}-${c + 1}`);
                        length++;
                        k++;
                    }
                    if (length > 0) segments.push({ type: 'v', side: 'right', r, c, length });
                }
            }
        }
        return segments;
    }


    function render() {
        // Clear old dimension labels first
        gridWrapper.querySelectorAll('.dimension-label').forEach(el => el.remove());

        const { area, perimeter } = calculateMetrics();

        // Update info panel
        areaValueEl.textContent = area;
        perimeterValueEl.textContent = perimeter;

        // Update formula visibility
        formulasSection.style.opacity = showFormulas ? '1' : '0';
        // formulaButtonText.textContent = showFormulas ? 'Hide Formulas' : 'Show Formulas';

        // Update grid visuals for each cell
        grid.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (!cell.element) return;
                const el = cell.element;

                // Reset dynamic classes for a clean slate
                const borderClasses = [
                    'border-t-dotted', 'border-b-dotted', 'border-l-dotted', 'border-r-dotted',
                    'border-t-2', 'border-b-2', 'border-l-2', 'border-r-2', 'border-black'
                ];
                el.classList.remove(...borderClasses, TILE_COLOR, 'cursor-grab', 'grid-cell-lines');

                if (cell.filled) {
                    el.classList.add(cell.color, 'cursor-grab');
                    el.draggable = true;

                    // Border logic
                    const hasTop = grid[r - 1]?.[c]?.filled;
                    const hasBottom = grid[r + 1]?.[c]?.filled;
                    const hasLeft = grid[r]?.[c - 1]?.filled;
                    const hasRight = grid[r]?.[c + 1]?.filled;

                    el.classList.add(
                        hasTop ? 'border-t-dotted' : 'border-t-2',
                        hasBottom ? 'border-b-dotted' : 'border-b-2',
                        hasLeft ? 'border-l-dotted' : 'border-l-2',
                        hasRight ? 'border-r-dotted' : 'border-r-2',
                        'border-black'
                    );

                } else { // Empty Cell
                    if (showGridLines) {
                        el.classList.add('grid-cell-lines');
                    }
                    el.draggable = false;
                }
            });
        });

        // Render dimension labels if toggled on
        if (showDimensions && area > 0) {
            const segments = calculateDimensionSegments();
            segments.forEach(seg => {
                const label = document.createElement('div');
                label.className = 'dimension-label';
                label.textContent = seg.length;

                if (seg.type === 'h') { // Horizontal
                    label.style.left = `${(seg.c + seg.length / 2) * TILE_SIZE}px`;
                    label.style.transform = 'translateX(-50%)';
                    if (seg.side === 'top') {
                        label.style.top = `${seg.r * TILE_SIZE - (TILE_SIZE / 2)}px`;
                    } else { // bottom
                        label.style.top = `${(seg.r + 1) * TILE_SIZE + 4}px`;
                    }
                } else { // Vertical
                    label.style.top = `${(seg.r + seg.length / 2) * TILE_SIZE}px`;
                    label.style.transform = 'translateY(-50%)';
                    if (seg.side === 'left') {
                        label.style.left = `${seg.c * TILE_SIZE - (TILE_SIZE / 2)}px`;
                        label.style.transform += ' translateX(-50%)';
                    } else { // right
                        label.style.left = `${(seg.c + 1) * TILE_SIZE + 4}px`;
                    }
                }
                gridWrapper.append(label);
            });
        }
    }

    // --- EVENT HANDLERS ---

    function handleDropNewTile(row, col) {
        if (!grid[row][col].filled) {
            grid[row][col].filled = true;
            grid[row][col].color = TILE_COLOR;
            render();
        }
    }

    function handleMoveTile(sourceR, sourceC, destR, destC) {
        if (grid[destR][destC].filled || (sourceR === destR && sourceC === destC)) return;

        grid[destR][destC].filled = true;
        grid[destR][destC].color = grid[sourceR][sourceC].color;

        grid[sourceR][sourceC].filled = false;
        grid[sourceR][sourceC].color = '';

        render();
    }

    function handleReset() {
        grid = createEmptyGrid();
        const cells = gridContainer.children;
        let cellIndex = 0;
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                grid[r][c].element = cells[cellIndex++];
            }
        }
        render();
    }

    function handleToggleFormulas() {
        showFormulas = !showFormulas;
        render();
    }

    function handleRememberClick() {
        alert("Here's a tip!\n\nArea: The amount of space inside a shape.\nPerimeter: The total distance around the outside of a shape.");
    }


    function init() {
        // Setup grid container
        gridContainer.style.gridTemplateColumns = `repeat(${GRID_COLS}, ${TILE_SIZE}px)`;
        gridContainer.style.gridTemplateRows = `repeat(${GRID_ROWS}, ${TILE_SIZE}px)`;
        gridContainer.style.gap = '0px';

        // Create grid cells and add event listeners
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const cellEl = document.createElement('div');
                cellEl.className = `w-8 h-8 transition-all duration-150`; // Base classes

                grid[r][c].element = cellEl;

                cellEl.addEventListener('dragstart', (e) => {
                    if (grid[r][c].filled) {
                        e.dataTransfer.setData('text/plain', `grid-tile,${r},${c}`);
                        setTimeout(() => {
                            // Visually "lift" the tile by making the source transparent
                            grid[r][c].element.classList.remove(TILE_COLOR);
                        }, 0);
                    }
                });
                cellEl.addEventListener('dragend', (e) => {
                    // Restore appearance if still in grid
                    if (grid[r][c].filled) {
                        grid[r][c].element.classList.add(TILE_COLOR);
                    }

                    // Check if released outside the grid area
                    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
                    if (!gridContainer.contains(dropTarget)) {
                        // Animate fade/shrink at release point
                        animateAndDeleteTile(e.clientX, e.clientY);

                        // Delete the tile from the grid
                        grid[r][c].filled = false;
                        grid[r][c].color = '';
                        render();
                    }
                });


                cellEl.addEventListener('dragover', (e) => {
                    if (!grid[r][c].filled) {
                        e.preventDefault();
                        cellEl.classList.add('bg-green-300/50');
                    }
                });
                cellEl.addEventListener('dragleave', () => cellEl.classList.remove('bg-green-300/50'));
                cellEl.addEventListener('drop', (e) => {
                    e.preventDefault();
                    cellEl.classList.remove('bg-green-300/50');
                    const data = e.dataTransfer.getData('text/plain');

                    if (data === 'new-tile') handleDropNewTile(r, c);
                    else if (data.startsWith('grid-tile')) {
                        const [, sourceR, sourceC] = data.split(',');
                        handleMoveTile(parseInt(sourceR), parseInt(sourceC), r, c);
                    }
                });

                gridContainer.appendChild(cellEl);
            }
        }

        // Add event listeners to controls
        draggableTile.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', 'new-tile'));
        // resetButton.addEventListener('click', handleReset);
        formulaToggleButton.addEventListener('click', handleToggleFormulas);
        // rememberButton.addEventListener('click', handleRememberClick);
        // settingsShowGrid.addEventListener('change', () => {
        //     showGridLines = settingsShowGrid.checked;
        //     render();
        // });
        // settingsShowDimensions.addEventListener('change', () => {
        //     showDimensions = settingsShowDimensions.checked;
        //     render();
        // });

        // Initial render
        render();
    }

    function animateAndDeleteTile(startX, startY) {
        const ghost = document.createElement('div');
        ghost.className = `${TILE_COLOR} w-8 h-8 rounded-sm absolute`;
        ghost.style.position = 'fixed';
        ghost.style.left = `${startX - TILE_SIZE / 2}px`;
        ghost.style.top = `${startY - TILE_SIZE / 2}px`;
        ghost.style.zIndex = 1000;
        ghost.style.transition = 'all 0.3s ease-out';
        document.body.appendChild(ghost);

        // Force reflow for transition
        ghost.getBoundingClientRect();

        // Animate to shrink + fade
        ghost.style.transform = 'scale(0)';
        ghost.style.opacity = '0';

        setTimeout(() => ghost.remove(), 300);
    }



    init();
}



// -------- update CSS ------------
function setCSS(sectionCnt) {
    _wrapperWidth = $('#f_wrapper').outerWidth()
    _wrapperHeight = $('#f_wrapper').outerHeight()
    // ---- checking device width and height ----
    if (_wrapperWidth > 768) {
        for (var i = 0; i < _pageData.imgCollage.desktop.length; i++) {
            $('#section-1').find('.bg-img').eq(i).css({
                'background-image': 'url(' + _pageData.imgCollage.desktop[i].imageSRC + ')',
                'background-size': 'cover'
            })
        }
    } else {
        for (var j = 0; j < _pageData.imgCollage.portrait.length; j++) {
            $('#section-1').find('.bg-img').eq(j).css({
                'background-image': 'url(' + _pageData.imgCollage.portrait[j].imageSRC + ')',
                'background-size': 'cover'
            })
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
    if ((str === null) || (str === '')) {
        return false;
    } else {
        str = _controller.removeTags(str);
        return str
    }
}
function initPageAnimations() {
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


    _tweenTimeline.add(animateFadeIn($('h1'), 0.5).play(), 0.5)

    _tweenTimeline.add(animateFromMarginLeft($('.animat-container'), 0.5, 0).play(), 1)
    var rightListTiming = [2, 3, 4, 5.5];
    for (var k = 0; k < rightListTiming.length; k++) {
        _tweenTimeline.add(animateFromRight($('.animat-container').find('.list li').eq(k), 0.5, 0).play(), rightListTiming[k])
    }

}

function withoutAudioSync() {
    _tweenTimeline.play();
    _tweenTimeline.add(animateFadeIn($('h1'), 0.5).play(), 0.5)
    _tweenTimeline.add(animateFromMarginLeft($('.animat-container'), 0.5, 0).play(), 1)
    let time = 1, t = 0, pTag = 0, listTag = 0, divTag = 0;
    let time1 = time
    for (let j = 0; j < _pageData.sections[0].content.listText.length; j++) {
        t = time1 + (j * 0.5)
        _tweenTimeline.add(animateFromRight($('.animat-container').find('.list li').eq(listTag), 0.5, 0).play(), t)
        listTag++
    }
}
// -------- resize page details ------------
/*window.onresize = function() {
    //setCSS()
}*/