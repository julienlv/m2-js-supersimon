// Define constantes
const COLORS = ["green","red","yellow","blue"];
const USER_ANIMATION_DURATION = 100;
const DURATION_BETWEEN_SEQUENCES = 400;
const FAST_LEVEL = 150;
const MEDIUM_LEVEL = FAST_LEVEL*2;
const SLOW_LEVEL = FAST_LEVEL*3;

// Default level
var speed_level = MEDIUM_LEVEL;

// Initialize scores
var currentScore = 0;
var maxScore = 0;

// Initialize sequences
var sequence = new Array();
var userSequence = new Array();

// Get elements
let start_slow = document.getElementById('start_slow');
let start_medium = document.getElementById('start_medium');
let start_fast = document.getElementById('start_fast');
var panels = document.getElementsByClassName('panel');
var center_circle_text = document.getElementById('center_circle_text');
var score = document.getElementById('score');
var max_score = document.getElementById('max_score');

// Create listeners
start_slow.addEventListener("click", () => {start_game(SLOW_LEVEL)});
start_medium.addEventListener("click", () => {start_game(MEDIUM_LEVEL)});
start_fast.addEventListener("click", () => {start_game(FAST_LEVEL)});

/*
 * GAME LOGIC
 */

// Start game
function start_game(speed) {
    speed_level = speed;
    console.log("DEBUG : speed : "+speed);
    console.log("DEBUG : currentScore : "+currentScore);
    // Disable click and start buttom
    disableClicks();
    disableStartButtons();
    
    // Clear sequences
    sequence = new Array();
    userSequence = new Array();
    // Launch sequence animation
    sequence_step(0, speed);
}

// Execute one step of random sequence
function sequence_step(step, speed) {
    if (step<=currentScore) {
        let randomPanel = Math.floor(Math.random() * 4);
        sequence.push(randomPanel);
        console.log("DEBUG : randomPanel=" + randomPanel);
        switch (randomPanel) {
            case 0: setTimeout("change_panel_color(0)", speed); setTimeout("change_panel_color(0)", speed*2); break;
            case 1: setTimeout("change_panel_color(1)", speed); setTimeout("change_panel_color(1)", speed*2); break;
            case 2: setTimeout("change_panel_color(2)", speed); setTimeout("change_panel_color(2)", speed*2); break;
            case 3: setTimeout("change_panel_color(3)", speed); setTimeout("change_panel_color(3)", speed*2); break;
        }
        setTimeout("sequence_step("+step+" + 1, "+speed+")", speed*3);
    } else {
        // Clear user sequence
        userSequence = new Array();
        // Enable clicks
        enableClicks();
    }
}

function check_user_choice(choice) {
    if (sequence[userSequence.length] != choice) {
        perdu();
    } else if (userSequence.length+1==sequence.length) {
        gagne();
    } else {
        console.log("DEBUG : bien");
        userSequence.push(choice);
    }
}

function perdu() {
    console.log("DEBUG : perdu");
    currentScore=0;
    center_circle_text.innerHTML="1";
    score.innerHTML="0";
    // Clear user sequence
    userSequence = new Array();
    // Enable start buttons
    enableStartButtons();
}

function gagne() {
    console.log("DEBUG : gagne !");
    currentScore++;
    center_circle_text.innerHTML = (currentScore+1).toString();
    console.log("DEBUG : currentScore : "+currentScore);
    score.innerHTML = currentScore.toString();
    if (currentScore>maxScore) {
        maxScore = currentScore;
        max_score.innerHTML = maxScore.toString();
    }
    // Continue game
    setTimeout("start_game("+speed_level+")", DURATION_BETWEEN_SEQUENCES);
}

/*
 * ANIMATIONS
 */

// Change panel color
function change_panel_color(idPanel) {
    let color = COLORS[idPanel];
    switch (panels[idPanel].style.backgroundColor) {
        case 'white': default: panels[idPanel].style.backgroundColor = color; break;
        case color: panels[idPanel].style.backgroundColor = 'white'; break;
    }
}

/*
 * EVENTS LISTENERS
 */

function click_div1() {
    click_div(0);
}
function click_div2() {
    click_div(1);
}
function click_div3() {
    click_div(2);
}
function click_div4() {
    click_div(3);
}
function click_div(idPanel) {
    let color = COLORS[idPanel];
    check_user_choice(idPanel);
    setTimeout("change_panel_color("+idPanel+", '"+color+"')", idPanel);
    setTimeout("change_panel_color("+idPanel+", '"+color+"')", USER_ANIMATION_DURATION);
    console.log("DEBUG : user click :"+idPanel);
}

/*
 * ENABLE/DISABLE EVENTS
 */

function enableClicks() {
    panels[0].addEventListener("click", click_div1);
    panels[1].addEventListener("click", click_div2);
    panels[2].addEventListener("click", click_div3);
    panels[3].addEventListener("click", click_div4);
}

function disableClicks() {
    panels[0].removeEventListener("click", click_div1);
    panels[1].removeEventListener("click", click_div2);
    panels[2].removeEventListener("click", click_div3);
    panels[3].removeEventListener("click", click_div4);
}

function enableStartButtons() {
    start_slow.disabled = false;
    start_medium.disabled = false;
    start_fast.disabled = false;
}

function disableStartButtons() {
    start_slow.disabled = true;
    start_medium.disabled = true;
    start_fast.disabled = true;
}
