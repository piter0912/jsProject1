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
        const newElement = addElement(incomeName, incomeAmount, editIncome, deleteIncome);
        const incomeList = document.querySelector("#income_list");
        incomeList.appendChild(newElement);
        blankFields("income");
    }
    console.log("Dodanie przychodu");
}

function deleteIncome(id) {
    console.log("Kasowanie przychodu");
}

function editIncome(id) {
    console.log("Edycja przychodu");
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
        const newElement = addElement(expenseName, expenseAmount, editExpense, deleteExpense);
        const expenseList = document.querySelector("#expense_list");
        expenseList.appendChild(newElement);
        blankFields("expense");
    }
    console.log("Dodanie przychodu");
}

function addElement(name, amount, editFunction, deleteFunction) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('listElement');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    const newLi = document.createElement("li");
    newLi.classList.add('elementName');
    newLi.innerText = `${name} - ${amount}zł`;
    const editBtn = document.createElement('button');
    editBtn.addEventListener('click',editFunction);
    editBtn.classList.add('elementButton');    
    editBtn.innerText = "Edytuj";    
    const delBtn = document.createElement('button');
    delBtn.addEventListener('click',deleteFunction);
    delBtn.classList.add('elementButton');
    delBtn.innerText = "Usuń";        
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(delBtn);
    newDiv.appendChild(newLi);
    newDiv.appendChild(buttonsDiv);
    return newDiv;
}

function deleteExpense(id) {
    console.log("Kasowanie wydatku");
}

function editExpense(id) {
    console.log("Edycja wydatku");
}

function blankFields(type) {
    const nameField = document.querySelector("#"+type+"_new_name");
    const amountField = document.querySelector("#"+type+"_new_amount");
    nameField.value = '';
    amountField.value = '';
}