
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

const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
  [0, 4, 8], [2, 4, 6]             // Diagonal
];

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
    //hier wird mit einem ternary operator geprüft, wer gerade an der reihe ist
    renderTable();
    if (checkWinner()) {
      setTimeout(() => showWinner(currentPlayer), 1000); // Nach 5 Sekunden den Gewinner anzeigen
    }
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; 
  }
}

function checkWinner() {
  for (let combination of winCombinations) {
    //Die for ... of Schleife wird verwendet, um über iterable Objekte wie Arrays zu iterieren. 
    //In diesem Fall iteriert sie über jedes Element des winCombinations Arrays.
      let [a, b, c] = combination;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
        //hier wird überprüft, ob alle 3 Felder gleich sind
          markWinningLine(combination);
      return true;
    }
  }
  return false;
  }


function markWinningLine(combination) {
  const content = document.getElementById('content');
  let table = document.getElementById('gameTable');
  const tableCells = document.getElementsByTagName('td');
  const tableRect = document.getElementById('gameTable').getBoundingClientRect();
  
  // Sicherstellen, dass nur genau drei Felder übergeben werden
  if (combination.length === 3) {
    const [a, b, c] = combination;

    // Positionen der Zellen mittig ermitteln
    const posA = {
      top: tableCells[a].offsetTop + tableCells[a].offsetHeight / 2,
      left: tableCells[a].offsetLeft + tableCells[a].offsetWidth / 2
    };
    const posB = {
      top: tableCells[b].offsetTop + tableCells[b].offsetHeight / 2,
      left: tableCells[b].offsetLeft + tableCells[b].offsetWidth / 2
    };
    const posC = {
      top: tableCells[c].offsetTop + tableCells[c].offsetHeight / 2,
      left: tableCells[c].offsetLeft + tableCells[c].offsetWidth / 2
    };

    // Erzeuge eine Linie als DIV-Element
    const line = document.createElement('div');
    line.classList.add('win-line');

    // Berechne die Position und Dimensionen der Linie
    if (posA.top === posB.top && posB.top === posC.top) {
      // Horizontal
      line.style.top = `${posA.top-5}px`; // etwas über der Mitte der Zelle
      // line.style.left = `${Math.min(posA.left, posB.left, posC.left)}px`;
      line.style.width = `${Math.abs(posC.left - posA.left + tableCells[a].offsetWidth)}px`;
      line.style.height = '5px';
    } else if (posA.left === posB.left && posB.left === posC.left) {
      // Vertikal
      line.style.top = `0px`;
      line.style.left = `${posA.left - 20}px`; // etwas links der Mitte der Zelle
      line.style.height = `${Math.abs(posC.top - posA.top + tableCells[a].offsetHeight)}px`;
      line.style.width = '5px';
    } else {
      // Diagonal
      const slope = (posC.top - posA.top) / (posC.left - posA.left);
      //steigungsberechnung
      const angle = Math.atan(slope) * (180 / Math.PI); // Umrechnung in Grad
      //winkelberechnung
      //Math.atan ist die Funktion, die den Arkustangens (also den Winkel) einer gegebenen Steigung in Bogenmaß (Radians) berechnet.
      //gradumrechnung
      //Die transform: rotate()-CSS-Eigenschaft benötigt den Winkel in Grad, nicht in Bogenmaß. Daher müssen wir von Bogenmaß zu Grad umrechnen (1 Rad = 180/π Grad).
      const length = Math.sqrt(Math.pow(posC.left - posA.left, 2) + Math.pow(posC.top - posA.top, 2));
      //längenberechnung
      //Dies ist die Distanz zwischen den beiden Punkten (posA und posC).
      line.style.width = `${length +40 }px`;
      line.style.height = '5px';
      if(winCombinations[7]){
        line.style.top = `0px`;
        line.style.left = `0px`;
      }else if (winCombinations[8]){
        line.style.top = none; //beschreibt die obere Startposition der linie
        line.style.left = `${posA.left - 5}px`; //setzt die linke Position der linie
      }
      line.style.transform = `rotate(${angle}deg)`;
      //Dreht die Linie um den berechneten Winkel, sodass sie diagonal ausgerichtet wird.
      line.style.transformOrigin = 'top left';
      //Setzt den Ursprung der Transformation (Drehung) auf die obere linke Ecke der Linie. 
      //Dies ist wichtig, damit die Drehung relativ zur oberen linken Ecke der Linie stattfindet.
    }

    table.appendChild(line);
  }
}


function showWinner(winner) {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Löscht die aktuelle Tabelle und die Gewinnlinie

  const winnerMessage = document.createElement('div');
  winnerMessage.className = 'winner-message';
  winnerMessage.innerHTML = `
    <h1>${currentPlayer === 'circle' ? 'Cross' : 'Circle'} Wins!</h1>
    <p>Congratulations!</p>
    <div class="trophy"></div>
    <button onclick="restartGame()">Play Again</button>
  `;
  content.appendChild(winnerMessage);
}


function restartGame() {
  fields.fill(null);
  currentPlayer = 'circle';
  render();
}


// Initialrenderung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
  render();
});
