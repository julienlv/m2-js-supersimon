/*let pList = document.getElementsByTagName('p');
for (let p of pList) {
    p.style.color = 'white';
    p.style.backgroundColor = 'black';
}
console.log(pList[0]);*/

// Define constantes
const USER_ANIMATION_DURATION = 100;
const DURATION_BETWEEN_SEQUENCES = 200;
const FAST_LEVEL = 150;
const MEDIUM_LEVEL = FAST_LEVEL*2;
const SLOW_LEVEL = FAST_LEVEL*3;

// Initialize scores
var currentScore = 0;
var maxScore = 0;

// Initialize sequences
var sequence = new Array();
var userSequence = new Array();

// Get elements
let start = document.getElementById('start');
let speed_level = document.getElementById('speed_level');
var panels = document.getElementsByClassName('panel');
var score = document.getElementById('score');
var max_score = document.getElementById('max_score');
score.innerHTML="0";
max_score.innerHTML="0";
/*let div1 = document.getElementById('div1');
let div2 = document.getElementById('div2');
let div3 = document.getElementById('div3');
let div4 = document.getElementById('div4');*/

// Create listeners
start.addEventListener("click", start_sequence);

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

function start_sequence() {
    //console.log("speed_level="+speed_level.);
    console.log("currentScore : "+currentScore);
    // Disable click and start buttom
    disableClicks();
    start.disabled = true;
    // Clear sequences
    sequence = new Array();
    userSequence = new Array();
    // Launch sequence animation
    sequence_step(0, MEDIUM_LEVEL);
}

function sequence_step(step, speed) {
    if (step<=currentScore) {
        let randomPanel = Math.floor(Math.random() * 4);
        sequence.push(randomPanel);
        console.log("randomPanel=" + randomPanel);
        switch (randomPanel) {
            case 0: setTimeout("change_div(0, 'green')", speed); setTimeout("change_div(0, 'green')", speed*2); break;
            case 1: setTimeout("change_div(1, 'red')", speed); setTimeout("change_div(1, 'red')", speed*2); break;
            case 2: setTimeout("change_div(2, 'yellow')", speed); setTimeout("change_div(2, 'yellow')", speed*2); break;
            case 3: setTimeout("change_div(3, 'blue')", speed); setTimeout("change_div(3, 'blue')", speed*2); break;
        }
        setTimeout("sequence_step("+step+" + 1, "+speed+")", speed*3);
    } else {
        // Clear user sequence
        userSequence = new Array();
        // Enable clicks
        enableClicks();
    }
}

function change_div(idPanel, color) {
    switch (panels[idPanel].style.backgroundColor) {
        case 'white': default: panels[idPanel].style.backgroundColor = color; break;
        case color: panels[idPanel].style.backgroundColor = 'white'; break;
    }
}

function check_user_choice(choice) {
    console.log(sequence.length);
    console.log(userSequence.length);
    if (sequence[userSequence.length] != choice) {
        perdu();
    } else if (userSequence.length+1==sequence.length) {
        gagne();
    } else {
        console.log("bien");
        userSequence.push(choice);
    }
}

function perdu() {
    console.log("perdu");
    currentScore=0;
    score.innerHTML="0";
    // Clear user sequence
    userSequence = new Array();
    // Enable start
    start.disabled = false;
}

function gagne() {
    console.log("gagne !");
    currentScore++;
    console.log("currentScore : "+currentScore);
    score.innerHTML = currentScore.toString();
    if (currentScore>maxScore) {
        maxScore = currentScore;
        max_score.innerHTML = maxScore.toString();
    }
    // Continue game
    setTimeout("start_sequence()", DURATION_BETWEEN_SEQUENCES);
}

function click_div1() {
    check_user_choice(0);
    setTimeout("change_div(0, 'green')", 0); setTimeout("change_div(0, 'green')", USER_ANIMATION_DURATION);
    console.log("0");
}
function click_div2() {
    check_user_choice(1);
    setTimeout("change_div(1, 'red')", 0); setTimeout("change_div(1, 'red')", USER_ANIMATION_DURATION);
    console.log("1");
}
function click_div3() {
    check_user_choice(2);
    setTimeout("change_div(2, 'yellow')", 0); setTimeout("change_div(2, 'yellow')", USER_ANIMATION_DURATION);
    console.log("2");
}
function click_div4() {
    check_user_choice(3);
    setTimeout("change_div(3, 'blue')", 0); setTimeout("change_div(3, 'blue')", USER_ANIMATION_DURATION);
    console.log("3");
}

/*function generateRandomNumber(min, max) {
    return Math.floor((Math.random()*(max-min)))+min;
}
function fill_random_array(n, min, max) {
    let arr = new Array(n);
    for (let i=0;i<n;i++) {
        arr[i] = generateRandomNumber(min, max);
    }
    return arr;
}
function maxMin(arr, max) {
    let maxMin=arr[0];
    for (let i=1;i<arr.length;i++) {
        if ((max && arr[i]>maxMin) || (!max && arr[i]<maxMin)) {
            maxMin = arr[i];
        }
    }
    return maxMin;
}
function fibonacci(n) {
    if (n==0) {
        return 0;
    } else if (n==1) {
        return 1;
    } else {
        return fibonacci(n-1)+fibonacci(n-2);
    }
}
function fibonacci_arr(n) {
    let arr = new Array(n);
    if (n<=0) {
        return arr;
    } else if (n==1) {
        arr[0] = 1;
        return arr;
    } else {
        arr[0] = 1;
        arr[1] = 1;
        for (let i=2;i<n;i++) {
            arr[i] = arr[i-1]+arr[i-2];
        }
        return arr;
    }
}
function comment_age(age) {
    if (age<18) {
        console.log("Mineur.");
    } else {
        console.log("Majeur.");
    }

    if (age<10) {
        console.log("Enfant.");
    } else if (age >= 40 && age < 50) {
        console.log("Quarantaine.");
    } else if (age>60) {
        console.log("Retraite.");
    }
}

function distributeBankNotes(bankNotesTypes, amount) {
    let remainingAmount = amount;
    let wallet = new Array();
    for (bankNotesType in bankNotesTypes) {
        wallet.push(Math.floor(remainingAmount / bankNotesTypes[bankNotesType]));
        remainingAmount = remainingAmount%bankNotesTypes[bankNotesType];
    }
    return wallet;
}

function printIsoscelesTriangle(base, full) {
    let currentRayon=0;
    let maxRayon=Math.floor(base/2);
    let first= (base % 2 == 1);
    while (currentRayon<=maxRayon) {
        let line = "";
        for (let i=0;i<base;i++) {
            if (currentRayon==maxRayon) {
                line += "_";
            } else if (i==(maxRayon-currentRayon)) {
                if (first) {
                    line += ".";
                    first=false;
                } else {
                    line += "/";
                }
            } else if (i==(base-maxRayon+currentRayon-1)) {
                line += "\\";
            } else if (
                (full && (i>(maxRayon-currentRayon) && i<(base-maxRayon+currentRayon-1)))
            ) {
                line += "#";
            } else {
                line += " ";
            }
        }
        console.log(line);
        currentRayon++;
    }
}*/
/*let arr = fill_random_array(15,0,100);
console.log(arr);
console.log("max: "+maxMin(arr, true));
console.log("min: "+maxMin(arr, false));
console.log(fibonacci(11));
console.log(fibonacci_arr(11));
let villes = ["Montpellier", "Tolosa", "Lyon", "Bordeaux", "Paris"];
villes.push("Limoges");
console.log(villes);
console.log(villes.slice(1,3));
console.log(villes.toString());

let age = generateRandomNumber(1,80);
console.log(age+" ans.");
comment_age(age);*/
/*let bankNotesTypes = [500,200,100,50,20,10,5,2,1];
console.log(bankNotesTypes);
console.log(distributeBankNotes(bankNotesTypes, 1725));
printIsoscelesTriangle(15, true);
printIsoscelesTriangle(11, false);
printIsoscelesTriangle(16, false);*/
