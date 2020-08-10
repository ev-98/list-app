//Selectors
let dateBox = document.getElementById("date-display");
let timeBox = document.getElementById("time-display");
let quoteBox = document.getElementById("quote-display");
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
var audio = document.getElementById('audio');
var playButton = document.getElementById('play-button');
//to check mute, unmute status
var count=0;

//Event listeners
document.addEventListener('DOMContentLoaded', playAudio);
document.addEventListener('DOMContentLoaded', displayDate);
document.addEventListener('DOMContentLoaded', displayClock);
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getTodos);
playButton.addEventListener('click', muteUnmute);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions

function addTodo(event){
    event.preventDefault();
    
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
  
    //adds to local storage
    saveLocalTodos(todoInput.value);

    //check btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list, clear for next input
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //delete
    if(item.classList[0] == 'trash-btn'){
        const todo = item.parentElement;
    //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //checkmark
    if(item.classList[0] == 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;

            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //checks for status of local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    todos.push(todo);
    //saves todo
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //checks for status of local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    todos.forEach(function(todo){
    //code from addTodo that reposts each todo on refresh
                    //todo div
                const todoDiv = document.createElement('div');
                todoDiv.classList.add("todo");

                //create li
                const newTodo = document.createElement('li');
                newTodo.innerText = todo;
                newTodo.classList.add('todo-item');
                todoDiv.appendChild(newTodo);
            
                //check btn
                const completedButton = document.createElement('button');
                completedButton.innerHTML='<i class="fas fa-check"></i>';
                completedButton.classList.add("complete-btn");
                todoDiv.appendChild(completedButton);

                //trash btn
                const trashButton = document.createElement('button');
                trashButton.innerHTML='<i class="fas fa-trash"></i>';
                trashButton.classList.add("trash-btn");
                todoDiv.appendChild(trashButton);

                //append to list
                todoList.appendChild(todoDiv);
                });
}

function removeLocalTodos(todo){
    //checks for status of local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    //splices todo element at list index
    const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function playAudio(){
    audio.mute = false;
    audio.loop = true;
}

function muteUnmute(){
    if(count==0){
        count=1;
        audio.play();
        playButton.innerHTML= '<i class="fas fa-volume-up"></i>';
    }
    else{
        count=0;
        audio.pause();
        playButton.innerHTML= '<i class="fas fa-volume-mute"></i>';
    }
}

function displayDate(){

    var today = new Date();

     //for date
     var month = today.getMonth() + 1;
     var date = today.getDate();
     var year = today.getFullYear();

     //displaying date
     let cur_date = `${month}.${date}.${year}`;
     console.log(cur_date);
     dateBox.innerHTML = cur_date;
}
function displayClock(){

    var rtClock = new Date();

    //for time
    var hours = rtClock.getHours();
    var minutes = rtClock.getMinutes();
    var seconds = rtClock.getSeconds();

    //AM PM calculation
    var amPm = (hours < 12) ? "AM" : "PM";
    hours = (hours > 12) ? hours - 12: hours;

    //formatting time
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    //displaying time
    var cur_time = hours + "  :  " + minutes + "  :  " + seconds + " " + amPm;
    timeBox.innerHTML = cur_time; 
    var t = setTimeout(displayClock, 500);
}

function getQuote(){
    var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
    quoteBox.innerHTML = randomQuote;
}

//Quote data
var quotes =[
    "昨日の我に、今日は勝つべし -柳生石舟斎",
    "為せば成る 為さねば成らぬ何事も 成らぬは人の為さぬなりけり -上杉鷹山",
    "I attribute my success to this: I never gave or took any excuse. –Florence Nightingale",
    "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed. –Michael Jordan",
    "The most difficult thing is the decision to act, the rest is merely tenacity. –Emelia Earhart",
    "We become what we think about. –Earl Nightingale",
    "Life is 10% what happens to me and 90% of how I react to it. –Charles Swindoll",
    "The most common way people give up their power is by thinking they don’t have any. –Alice Walker",
    "The mind is everything. What you think you become.  –Buddha",
    "The best time to plant a tree was 20 years ago. The second best time is now. –Chinese Proverb",
    "An unexamined life is not worth living. –Socrates",
    "多一些宽容谅解就快乐 -谢娜",
    "Your time is limited, so don’t waste it living someone else’s life. –Steve Jobs",
    "Winning isn’t everything, but wanting to win is. –Vince Lombardi",
    "あきらめたらそこで試合終了ですよ…？ -安西監督 ",
    "Every child is an artist.  The problem is how to remain an artist once he grows up. –Pablo Picasso",
    "You can never cross the ocean until you have the courage to lose sight of the shore. –Christopher Columbus",
    "The best revenge is massive success. –Frank Sinatra",
    "There is only one way to avoid criticism: do nothing, say nothing, and be nothing. –Aristotle",
    "The only person you are destined to become is the person you decide to be. –Ralph Waldo Emerson",
    "Certain things catch your eye, but pursue only those that capture the heart. – Ancient Indian Proverb",
    "継続は力なり -住岡夜晃",
    "When I let go of what I am, I become what I might be. –Lao Tzu",
    "어디든 가치가 있는 곳으로 가려면 지름길은 없다. -Anonymous",
    "你可以不用那么雄心勃勃先定一个小目标挣它亿 -王健林 ",
    "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained. –Marie Curie",
]
