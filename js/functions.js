function addListener(element, type) {
    document.querySelector('#'+element).addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          if(type==="income"){
              addNewIncome();
          } else {
              addNewExpense();
          }
        }
    });
}

addListener('income_new_name','income');
addListener('income_new_amount','income');
addListener('expense_new_name','expense');
addListener('expense_new_amount','expense');


function addElement(name, amount, editFunction, deleteFunction, amountClass) {
    const id = parseInt(Math.floor(Math.random()*Math.pow(10,6)));

    const newDiv = document.createElement('div');
    newDiv.id = 'div'+id;
    newDiv.classList.add('listElement');

    const newLi = document.createElement('li');
    newLi.classList.add('elementName');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
 
    const elementName = document.createElement('span');
    elementName.innerText = name;
    elementName.classList.add(id, 'item');
    elementName.id = 'name'+id;
    elementName.readOnly = true;
    
    const span1 = document.createElement('span');
    span1.innerText = ' - ';

    const elementAmount = document.createElement('span');
    elementAmount.innerText = amount;
    elementAmount.classList.add(id, 'item', amountClass);
    elementAmount.id = 'amount'+id;
    elementAmount.readOnly = true;

    const span2 = document.createElement('span');
    span2.innerText = 'zł';

    newLi.appendChild(elementName);
    newLi.appendChild(span1);
    newLi.appendChild(elementAmount);
    newLi.appendChild(span2);

    const editBtn = document.createElement('button');
    editBtn.addEventListener('click',editFunction);
    editBtn.classList.add('elementButton');   
    editBtn.id = 'edit'+id; 
    editBtn.innerText = 'Edytuj';    
    const delBtn = document.createElement('button');
    delBtn.addEventListener('click',deleteFunction);
    delBtn.classList.add('elementButton');
    delBtn.id = 'delete'+id;
    delBtn.innerText = 'Usuń';        
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(delBtn);
    newDiv.appendChild(newLi);
    newDiv.appendChild(buttonsDiv);
    return newDiv;
}

function addNewExpense() {
    const expenseName = document.querySelector('#expense_new_name');
    const expenseAmount = document.querySelector('#expense_new_amount');
    const expenseText = expenseName.value;
    const expenseValue = parseFloat(expenseAmount.value);
    if(checkFields(expenseName, expenseAmount, expenseText, expenseValue, 'wydatku', '1px solid black')) {        
        const newElement = addElement(expenseText, expenseValue, editElement, deleteElement, 'expenseValue');
        const expenseList = document.querySelector('#expense_list');
        expenseList.appendChild(newElement);
        blankFields('expense');
        updateHeading();
    }
}

function addNewIncome() {
    const incomeName = document.querySelector('#income_new_name');
    const incomeAmount = document.querySelector('#income_new_amount');
    const incomeText = incomeName.value;
    const inocmeValue = parseFloat(incomeAmount.value)
    if(checkFields(incomeName, incomeAmount, incomeText, inocmeValue, 'przychodu', '1px solid black')) {        
        const newElement = addElement(incomeText, inocmeValue, editElement, deleteElement, 'incomeValue');
        const incomeList = document.querySelector('#income_list');
        incomeList.appendChild(newElement);
        blankFields('income');
        updateHeading();
    }
}

function blankFields(type) {
    const nameField = document.querySelector('#'+type+'_new_name');
    const amountField = document.querySelector('#'+type+'_new_amount');
    nameField.value = '';
    amountField.value = '';
}

function calculate(type) {
    const list = document.querySelectorAll('.'+type+'Value');
    let total = 0;
    for(const element of list) {
        total += parseFloat(element.innerText);
    }
    return total;
}


function checkAmount(amount) {
    return !isNaN(Number(amount)) && Number(amount) > 0;
}

function checkFields(nameField, amountField, nameValue, amountValue, type, originalStyle) {
    const nameOk = checkName(nameValue);
    const amountOk = checkAmount(amountValue);
    if(!nameOk && !amountOk) {
        alert(`Należy podać poprawną nazwę (min. 3 znaki) oraz kwotę (większą od zera) ${type}`);
        setBorderAndAddFocus(amountField,'3px solid red',false);
        setBorderAndAddFocus(nameField,'3px solid red',true);
    } else if(!nameOk) {
        alert(`Nazwa ${type} musi mieć min. 3 znaki.`);
        setBorderAndAddFocus(amountField,'3px solid lightgreen',false);
        setBorderAndAddFocus(nameField,'3px solid red',true);
    } else if(!amountOk) {
        alert(`Kwota ${type} musi być większa od zera`);
        setBorderAndAddFocus(nameField,'3px solid lightgreen',false);
        setBorderAndAddFocus(amountField,'3px solid red',true);
    } else {
        setBorderAndAddFocus(nameField,originalStyle,true);
        setBorderAndAddFocus(amountField,originalStyle,false);
        return true;
    }
    return false;
}

function checkName(name) {
    return name.length>=3;
}

function deleteElement(event) {
    const id = getId(event.target.id, 'delete');
    const div = document.querySelector('#div'+id);
    div.remove();
    updateHeading();
}

function editElement(event) {
    const id = getId(event.target.id, 'edit');
    const name = document.querySelector('#name'+id);
    const amount = document.querySelector('#amount'+id);
    const edit = document.querySelector('#edit'+id);
    if(event.target.innerText === 'Edytuj') {        
        name.contentEditable = true;
        name.style.border = '3px solid blue';
        amount.contentEditable = true;
        amount.style.border = '3px solid blue';
        edit.innerText = 'Zapisz';
    } else if(checkFields(name, amount, name.innerText, amount.innerText, '', 'none')) {
        name.contentEditable = false;
        name.style.border = 'none';
        amount.contentEditable = false;
        amount.style.border = 'none'; 
        edit.innerText = 'Edytuj';
        updateHeading();       
    }    
}

function setBorderAndAddFocus(element, border, ifFocus) {
    element.style.border = border;
    ifFocus && element.focus();
}

function getId(oldId, name) {
    const len = name.length;
    const newId = oldId.slice(len);
    return(newId);
}

function updateHeading() {
    const income = calculate('income');
    updateFooter('income', income);
    const expense = calculate('expense');
    updateFooter('expense', expense);
    const total = income - expense;
    let title = '';
    if(total > 0) {
        title = `Możesz jeszcze wydać ${total} złotych.`;
    } else if(total === 0) {
        title = 'Bilans wynosi zero';
    } else {
        title = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(total)} złotych.`;
    }
    const heading = document.querySelector('#header_title');
    heading.innerText = title; 
}

function updateFooter(type, total) {
    const footer = document.querySelector('#'+type+'_footer_amount');
    footer.innerText = total>0 ? total+'zł' : '';
}