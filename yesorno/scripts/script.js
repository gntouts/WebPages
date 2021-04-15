var rep;
var xhr = new XMLHttpRequest();
var url = 'https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8';
xhr.open('GET', url, true);
xhr.send();
xhr.onreadystatechange = processRequest;

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        showButton();
        if ((response.data % 2) == 0) {
            rep = 'yes';
        } else if ((response.data % 2) == 1) {
            rep = 'no';
        }
        // answer('rep');
    }
}

function clickThis() {
    answer(rep);
}

function showButton() {
    document.getElementById('btn').style.visibility = 'visible';
}

function answer(xd) {
    let good;
    let bad;

    if (xd == 'yes') {
        good = 'yes'.concat('-col');
        bad = 'no'.concat('-col');
    } else {
        bad = 'yes'.concat('-col');
        good = 'no'.concat('-col');
    }
    noSize(good, bad);
}

function noSize(good, bad) {
    var goodElement = document.getElementById(good);
    var badElement = document.getElementById(bad);
    badElement.style.width = '0%';
    goodElement.style.width = '100%';
    document.getElementById('btn').style.visibility = 'hidden';
    window.setTimeout(function () {
        badElement.removeChild(badElement.childNodes[1]);
    }, 10);
    window.setTimeout(function () {
        badElement.classList.remove('is-visible');
    }, 280);
}