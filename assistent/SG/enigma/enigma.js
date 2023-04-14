"use strict";
window.addEventListener('load', init);
 // vul hier de parameters voor de matrixen in

const tabellen = 3;
const rows = 3;
const cellsPerRow = 3;
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
const cssStyles = ['br','lbr','lb','tbr','ltbr','ltb','tr','ltr','lt'];
 
function init () {

    createMatrix();
    matrixCellStart();
    createFieldButton();     
}  

function createMatrix () {

    // bouwt de hele matrix en vult de dropdownmenus    
    
        const body = document.querySelector('body');
        const div = document.createElement('div');
        
        const labelMatrixSelector = document.createElement('label');
        labelMatrixSelector.id = "labelmatrixselector"
        labelMatrixSelector.setAttribute('for', 'matrixselector');
        labelMatrixSelector.textContent = 'Sleutel: ';
    
        const createMatrixSelector = document.createElement('select');
        createMatrixSelector.id = 'matrixselector';
        createMatrixSelector.addEventListener('click',matrixCellStart);
       
    
        body.appendChild(div);
        div.appendChild(labelMatrixSelector);
        div.appendChild(createMatrixSelector);
    
        const labelCellStartSelector = document.createElement('label');
        labelCellStartSelector.id = "labelcellstartselector"
        labelCellStartSelector.setAttribute('for', 'cellstartselector');
        labelCellStartSelector.textContent = ' : ';
        
        const cellStartSelector = document.createElement('select');
        cellStartSelector.id ='cellstartselector';
        cellStartSelector.addEventListener('click',matrixCellStart);
      
        
        div.appendChild(labelCellStartSelector);
        div.appendChild(cellStartSelector);
    
        
    for (let i = 0; i < rows*cellsPerRow; i++) {
    
        const cellStartOption = document.createElement('option');
        cellStartOption.value = 'Cel ' + (i + 1) ;
        cellStartOption.textContent ='Cel ' + (i + 1) ;
        cellStartSelector.appendChild(cellStartOption);    
    }  
    
    for ( let i = 0; i < tabellen; i++) {
            
            createOptions(i,createMatrixSelector);
            const tabel = createTables(i);    
    
            // creert de rijen in de tabel
    
            for ( let j = 0; j < rows; j++) {
                const row = document.createElement('tr');
                tabel.appendChild(row);
            
                // creert de cellen in de tabel en geeft als class het matrixnummer
    
                for ( let k = 0; k < cellsPerRow; k++) {
                    const cell = document.createElement('td');
                    cell.className = i+1;
                    cell.classList.add('matrixcells');
                    cell.style.padding = '15px';
                    row.appendChild(cell);
                    // let uniqueIdInMatrix  = k + (j * cellsPerRow);       
                    // console.log(uniqueIdInMatrix)     ;
    
                }
            }
    }
       // vult alle matrixcellen met letters en stijlen
    
    const allCells = document.getElementsByClassName('matrixcells');   
    
    for ( let i = 0; i < allCells.length; i++) {
    
            allCells[i].id = i;     
            let matrixNumber = allCells[i].classList[0] - 1;
            let celBinnenMatrix = allCells[i].id - (matrixNumber*(rows*cellsPerRow));
            allCells[i].classList.add(cssStyles[celBinnenMatrix]);       
            
        }    
}

function matrixCellStart () {

// bepaalt waar je begint in de matrix met het alfabet

    const allCells = document.getElementsByClassName('matrixcells'); 
    let a = matrixChoice();
    let b = cellChoice();
    let c = (a * (rows * cellsPerRow)) + b;
    

    for (let i=0; i < allCells.length; i++) {
       
        allCells[i].id = i;
        const cellInvullen = document.getElementById(i);
        let arrayStartPoint = (i + c) % allCells.length;
        allCells[arrayStartPoint].textContent = alphabet[i];
      
        }
}
function matrixChoice () {
    const matrixSelector = document.getElementById('matrixselector'); 
    const chosenMatrix = matrixSelector.selectedIndex;
    
    return chosenMatrix;
}

function cellChoice () {
    const cellStartSelector = document.getElementById('cellstartselector'); 
    const chosenStartCell = cellStartSelector.selectedIndex;
    
    return chosenStartCell;
}
  
    
// creert label, invoerveld en button

function createFieldButton () {

    // creert label, invoerveld en button
        
        // label

        const body = document.querySelector('body');
        const div = document.createElement('div');

        const labelInputField = document.createElement('label');
        labelInputField.setAttribute('for', 'textmessage');
        labelInputField.id = "instructie";
        labelInputField.style.fontFamily = "Arial, Helvetica, sans-serif";
        labelInputField.style.fontStyle = "oblique";
        labelInputField.style.fontSize = "0.8em";
        labelInputField.style.marginLeft = "15px";
        labelInputField.style.display = "block";
        const textNodeLabel = document.createTextNode('Vul je boodschap in:');
        
        body.appendChild(div);
        div.appendChild(labelInputField);
        labelInputField.appendChild(textNodeLabel);   
        
        // invoerveld

        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.id = 'textmessage';
        inputField.style.marginLeft = '15px';
        inputField.style.fontSize = '0.8em';
        inputField.style.backgroundColor = 'lightcyan';

        div.appendChild(inputField);        

        // button 
      
        const generatorButton = document.createElement('button');        
        const textNodeButton = document.createTextNode('Genereer code');
                
        div.appendChild(generatorButton);
        generatorButton.appendChild(textNodeButton);
        generatorButton.addEventListener('click', codeMessage);
}

function codeMessage () {

// codeert boodschap

    const message = document.getElementById("textmessage").value;
    const corrArray = [];

    for ( let i = 0; i < message.length; i++) { 

        let correspondingCell = checkInput(message[i]);

        if (correspondingCell == null) {

            alert('Gebruik alleen letters of spaties.');
            return;
            
        } 
        else {
            corrArray.push(correspondingCell);

        }
    }
    const outputTable = document.createElement("table");
    outputTable.id ='codeertabel';    
    
    for (let i = 0; i < corrArray.length; i++) {
        
        let outputCell = codeCharacter(corrArray[i]); 
        document.body.appendChild(outputTable);        
        outputTable.appendChild(outputCell); 
    }
}


function checkInput (controleChar) {      

// checkt of de invoer geldig is 

    const tableCells = document.getElementsByClassName('matrixcells');
      
            for ( let j = 0; j < tableCells.length; j++) {
            
                if ( controleChar == tableCells[j].textContent) {   

                    return tableCells[j];                      
                }  
            }                 
       
    return null;
}  


function codeCharacter (correspondingCell) { 
    
// creert enigmacode voor een karakter
    
    let cellId = correspondingCell.id;
    let matrixNumber = correspondingCell.classList[0] - 1;
    let celBinnenMatrix = cellId - (matrixNumber*(rows*cellsPerRow));
    
    const outputCell = document.createElement("td");

    outputCell.className = cssStyles[celBinnenMatrix];               
    outputCell.textContent = correspondingCell.classList[0];

    return outputCell;                
  
}

function createOptions (i,createMatrixSelector) {

    // creeert de matrix opties

    const matrixOption = document.createElement('option');
    matrixOption.value = 'Matrix ' + (i + 1) ;
    matrixOption.textContent ='Matrix ' + (i + 1) ;
    createMatrixSelector.appendChild(matrixOption);

}

function createTables(i) {
       
        // creert de matrixen

        const tabel = document.createElement('table');
        tabel.id = 'matrix ' + (i + 1);
        tabel.className = 'matrixes';
        tabel.style.margin = '10px';
        tabel.style.display = 'inline-block';
        
        const body = document.querySelector('body');        
        body.appendChild(tabel);
      
        // creert de header per matrix

        const tableHeader = document.createElement('th');
        tableHeader.className ="headers";
        tableHeader.setAttribute('colspan', cellsPerRow);
        tableHeader.style.fontFamily = 'Arial, Helvetica, sans-serif';
       
        const tableCanvas = document.getElementById('matrix ' + (i+ 1));
        tableCanvas.appendChild(tableHeader);
        
        // vult elke header met tekst

        const textNode = document.createTextNode('Matrix ' + (i + 1));
        tableHeader.appendChild(textNode);

        return tabel;
  
        
}