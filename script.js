
let currentPlayer = 'circle';
const fields = [
  null, null, null,
  null, null, null,
  null, null, null
];

function render() {
  renderPlayerIcon();
  renderTable();
}

function renderPlayerIcon() {
  let row = document.getElementById('row');
  row.innerHTML = ''; // Löscht den Inhalt von #row

  let playerIcons = document.createElement('div');
  playerIcons.id = 'playerIcons';
  playerIcons.className='playerIcons';

  if (currentPlayer === 'circle') {
    playerIcons.innerHTML = '<div class="circle"></div><div class="cross"></div>';
  } else {
    playerIcons.innerHTML = '<div class="cross"></div><div class="circle"></div>';
  }

  row.appendChild(playerIcons);
  //appendchild um die div playericons in die div row einzufügen
}

function renderTable() {
  let content = document.getElementById('content');
  content.innerHTML = ''; // Löscht den Inhalt von #content

  let table = document.createElement('table');
  table.id = 'gameTable';

  for (let row = 0; row < 3; row++) {
    let tr = document.createElement('tr'); //erstellung der reihen
    for (let col = 0; col < 3; col++) {
      let td = document.createElement('td'); //erstellung der spalten
      let index = row * 3 + col;//jeder reihe wird eine spalte hinzugefügt
      td.textContent = ''; // Hier kannst du den Initialwert setzen (leer)
      td.onclick = function() { makeMove(index); }; //auf das klicken der einzelnen felder gelangt man zur nächsten funktion
      td.innerHTML = renderField(fields[index]);//jede td erhält einen indexwert
      tr.appendChild(td); //die tds werden nun in die trs eingebracht
    }
    table.appendChild(tr);//die tr werden in die table eingefügt
  }

  content.appendChild(table);//in den container wird nun die tabelle eingefügt
}

function renderField(value) {
  if (value === 'circle') {
    return '<div class="circle"></div>';
  } else if (value === 'cross') {
    return '<div class="cross"></div>';
  } else {
    return '';
  }
}

function makeMove(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; 
    //hier wird mit einem ternary operator geprüft, wer gerade an der reihe ist
    renderTable();
  }
}

// Initialrenderung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
  render();
});
