const addTaskBtn = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const taskList = document.querySelector('.app__form-textarea');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const ulTask = document.querySelector('.app__section-task-list');
const confirmBtn = document.querySelector('.app__form-footer__button--confirm');
const paragrafoDescTask = document.querySelector('.app__section-active-task-description');
const removeCompleteTaskBtn = document.querySelector('#btn-remover-concluidas')
const removeTasks = document.querySelector('#btn-remover-todas');

var selectedTask = null;
var liSelectedTask = null;





// ** Funções e eventos dos botoes **

function refreshTask () {
    localStorage.setItem('tasks', JSON.stringify(tasks)) 
};

function AddTaskEl (task) {
    const li = document.createElement('li')
    li.classList.add("app__section-task-list-item");
    
    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
            fill="#01080E"></path>`

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = task.descTask;

    const btn = document.createElement('button');
    btn.classList.add('app_button-edit')
    const imagemBtn = document.createElement('img');

    btn.onclick = () => {
        
        const newDesc = prompt("Qual o novo nome da tarefa?");
        
        if (newDesc) {
            paragrafo.textContent = newDesc;
            task.descTask = newDesc;
            refreshTask();
        }
    }

    imagemBtn.setAttribute('src', '/imagens/edit.png');
    btn.append(imagemBtn);

    li.append(svg);
    li.append(paragrafo);
    li.append(btn);
    
    if (task.complete){
        li.classList.add('app__section-task-list-item-complete');
        btn.setAttribute('disabled', true);
    } else {
    li.onclick = () => {
        
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach( el => {
            el.classList.remove('app__section-task-list-item-active')
        })

        if (selectedTask == task) {
            paragrafoDescTask.textContent = '';
            selectedTask = null;
            liSelectedTask = null;
            return
        }

        selectedTask = task
        liSelectedTask = li
        paragrafoDescTask.textContent = task.descTask;

        li.classList.add('app__section-task-list-item-active');
        
    }};

    return li
};



addTaskBtn.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

confirmBtn.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

formAddTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const task = {
        descTask: taskList.value
    }
    tasks.push(task)
    const elTask = AddTaskEl(task);
    ulTask.append(elTask);
    refreshTask()
    taskList.value = '';
    formAddTask.classList.add('hidden');
});

tasks.forEach(task => {
    const el = AddTaskEl(task);
    ulTask.append(el);
});

document.addEventListener('focoFinalizado', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', true);
        selectedTask.complete = true;
        refreshTask();
        
    }
});

const removeCompleteTask = (complete) => {
    const selector = complete ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(selector).forEach(el => {
        el.remove();
    });
    tasks = complete ? tasks.filter(el => !el.complete) : [];
    refreshTask();
};

removeCompleteTaskBtn.onclick = () => removeCompleteTask(true);
removeTasks.onclick = () => removeCompleteTask(false);
