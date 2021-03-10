function updateHeadContent() {
    console.log("Aktualizacja nagłówka");
}

function updateIncomeTotal() {
    console.log("Aktualizacja sumy przychodów");
}

function updateExpenseTotal() {
    console.log("Aktualizacja sumy wydatków");
}

function addNewIncome() {
    const incomeName = document.querySelector("#income_new_name").value;
    const incomeAmount = parseInt(document.querySelector("#income_new_amount").value);
    console.log(incomeAmount);
    if(incomeName === '' & ( isNaN(incomeAmount) | incomeAmount === 0)) {
        alert("Należy ppodać nazwę oraz kwotę przychodu");
    } else if(incomeName === '') {
        alert("Nie podano nazwy przychodu");
    } else if(isNaN(incomeAmount) | incomeAmount=== 0) {
        alert("Nie podano kwoty przychodu");
    } else {        
        const newElement = addElement(incomeName, incomeAmount, editElement, deleteElement);
        const incomeList = document.querySelector("#income_list");
        incomeList.appendChild(newElement);
        blankFields("income");
    }
    console.log("Dodanie przychodu");
}

function deleteElement(event) {
    const id = getId(event.target.id, 'delete');
    const div = document.querySelector('#div'+id);
    div.remove();
}

function editElement(event) {
    const id = getId(event.target.id, 'edit');
    const name = document.querySelector('#name'+id);
    const amount = document.querySelector('#amount'+id);
    const edit = document.querySelector('#edit'+id);
    if(event.target.innerText === "Edytuj") {        
        name.contentEditable = true;
        name.style.border = "3px solid blue";
        amount.contentEditable = true;
        amount.style.border = "3px solid blue";
        edit.innerText = "Zapisz";
    } else if(!checkName(name.innerText) && !checkAmount(amount.innerText)) {
        alert("Należy podać co najmniej 3 znakową nazwę oraz poprawną kwotę.");
        name.style.border = "3px solid red";
        amount.style.border = "3px solid red";
        name.focus();
    } else if(!checkName(name.innerText)) {
        alert("Należy podać co najmniej 3 znakową nazwę.")
        name.style.border = "3px solid red";
        amount.style.border = "3px solid lightgreen";
        name.focus();
    } else if(!checkAmount(amount.innerText)) {
        alert("Należy podać poprawną kwotę.")
        name.style.border = "3px solid lightgreen";
        amount.style.border = "3px solid red";
        amount.focus();
    } else {
        name.contentEditable = false;
        name.style.border = "none";
        amount.contentEditable = false;
        amount.style.border = "none"; 
        edit.innerText = "Edytuj";       
    }    
}

function addNewExpense(name, amount) {
    const expenseName = document.querySelector("#expense_new_name").value;
    const expenseAmount = parseInt(document.querySelector("#expense_new_amount").value);
    if(expenseName === '' & ( isNaN(expenseAmount) | expenseAmount === 0)) {
        alert("Należy ppodać nazwę oraz kwotę wydatku");
    } else if(expenseName === '') {
        alert("Nie podano nazwy wydatku");
    } else if(isNaN(expenseAmount) | expenseAmount === 0) {
        alert("Nie podano kwoty wydatku");
    } else {        
        const newElement = addElement(expenseName, expenseAmount, editElement, deleteElement);
        const expenseList = document.querySelector("#expense_list");
        expenseList.appendChild(newElement);
        blankFields("expense");
    }
    console.log("Dodanie przychodu");
}

function addElement(name, amount, editFunction, deleteFunction) {
    const id = parseInt(Math.floor(Math.random()*Math.pow(10,6)));

    const newDiv = document.createElement('div');
    newDiv.id = 'div'+id;
    newDiv.classList.add('listElement');

    const newLi = document.createElement("li");
    newLi.classList.add('elementName');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
 
    const incomeN = document.createElement("span");
    incomeN.innerText = name;
    incomeN.classList.add(id);
    incomeN.id = "name"+id;
    incomeN.readOnly = true;
    
    const span1 = document.createElement("span");
    span1.innerText = " - ";

    const incomeA = document.createElement("span");
    incomeA.innerText = amount;
    incomeA.classList.add(id);
    incomeA.id = "amount"+id;
    incomeA.readOnly = true;

    const span2 = document.createElement("span");
    span2.innerText = "zł";

    newLi.appendChild(incomeN);
    newLi.appendChild(span1);
    newLi.appendChild(incomeA);
    newLi.appendChild(span2);

    // newLi.innerText = `${name} - ${amount}zł`;
    const editBtn = document.createElement('button');
    editBtn.addEventListener('click',editFunction);
    editBtn.classList.add('elementButton');   
    editBtn.id = 'edit'+id; 
    editBtn.innerText = "Edytuj";    
    const delBtn = document.createElement('button');
    delBtn.addEventListener('click',deleteFunction);
    delBtn.classList.add('elementButton');
    delBtn.id = 'delete'+id;
    delBtn.innerText = "Usuń";        
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(delBtn);
    newDiv.appendChild(newLi);
    newDiv.appendChild(buttonsDiv);
    return newDiv;
}

function blankFields(type) {
    const nameField = document.querySelector("#"+type+"_new_name");
    const amountField = document.querySelector("#"+type+"_new_amount");
    nameField.value = '';
    amountField.value = '';
}

function getId(oldId, name) {
    const len = name.length;
    const newId = oldId.slice(len);
    return(newId);
}

function checkName(name) {
    return name.length>=3
}

function checkAmount(amount) {
    return !isNaN(Number(amount))
}