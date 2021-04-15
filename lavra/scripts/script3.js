var counter = 0;
var xhr = new XMLHttpRequest();
var button = document.querySelector('button');
var text = document.querySelector('input');
let ul = document.querySelector('ul');
const participants = ['Δωρα Σι', 'Giorgos Nitsou', 'George Pyrros', 'George Sapph', 'Vasilis Shout Tsounis', 'Νικολετα Παπαδοπουλου', 'Georgia Iliopoulou', 'Panos Hz', 'Spyros Katsenos', 'Maria Pirouni', 'Zoe Zavlani', 'εβιτα μανωλιδου', 'Alexandros Lianos', 'Evripidis Avraam', 'Ninet Villalobos', 'δήμητρα χάιδα', 'Jason Tsellos', 'Nikoleta Andriopoulou', 'Zoe Xatzaki', 'Ionas Kyprianos', 'Amalia Papathanasi']
console.log(participants[2]);
console.log(participants.length);

function addUser(name) {
    counter++;
    text.value = '';
    console.log(counter + '. ' + name);
    var p1 = document.createElement('p');
    p1.classList.add('h6');
    var listitem = document.createElement('li');
    listitem.setAttribute('id', 'list' + counter)
    listitem.classList.add("list-group-item");
    listitem.appendChild(p1);
    let text1 = document.createTextNode(counter + '. ' + name);
    p1.appendChild(text1);
    ul.appendChild(listitem);
}

function populate() {
    for (var i = 0, len = participants.length; i < len; i++) {
        console.log(i);
        console.log(participants[i]);
        addUser(participants[i]);
    }
}
populate();

function btnPress() {
    let userInput = text.value;
    if (userInput == '') {
        return;
    } else {
        counter++;
        text.value = '';
        console.log(counter + '. ' + userInput);

        var p1 = document.createElement('p');
        p1.classList.add('h6');
        var listitem = document.createElement('li');
        listitem.setAttribute('id', 'list' + counter)
        listitem.classList.add("list-group-item");
        listitem.appendChild(p1);
        let text1 = document.createTextNode(counter + '. ' + userInput);
        p1.appendChild(text1);
        ul.appendChild(listitem);
    }
}


function letGo() {
    let num = 15;
    let url = 'https://qrng.anu.edu.au/API/jsonI.php?length=' + num + '&type=uint8';
    xhr.open('GET', url, true);
    xhr.send();
    loadAnimation('doing');
    xhr.onreadystatechange = processRequest;
}

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        showRes(makeArray(response.data));
        return response.data;
    }
}

Array.prototype.unique = function() {
    return this.filter(function (value, index, self) { 
      return self.indexOf(value) === index;
    });
  }

function makeArray(array) {
    let res = [];
    array.forEach(function (element) {
        res.push(Math.round(element / 255 * counter) + 1);
    })
    return return4(res);
}

function highlight(num) {
    let cell = document.getElementById('list' + num);
    cell.classList.add('list-group-item-success');
}

function showRes(array) {
    array.forEach(function (element) {
        highlight(element);
        sleep(800);
    });
    loadAnimation('done');
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function loadAnimation(status) {
    if (status == 'done') {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('done').style.display = 'block';
    } else if (status == 'doing') {
        document.getElementById('loader').style.visibility = 'visible';
    }
}

function return4(sez){
    sez = sez.unique();
    console.log(sez);
    return sez.slice(0, 4);
}
