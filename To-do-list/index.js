
const data = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let inputElement = document.getElementById("search-bar");
  let text = inputElement.value.trim();

  if (text === "") {
    alert("Please Enter a task.");
    return; 
  }

  let objtask = {task : text , finished : false};

  displayTask(objtask);

  /* when i write a task and click the add button 
  automaticly the input will be the empty for next task */
  inputElement.value = ""; 

  data.push(objtask);

  saveTasks();
  countTask();
   
}

function saveTasks(){
  localStorage.setItem("tasks" , JSON.stringify(data));
}

function displayTask(taskData){

    let finsh = taskData.finished;
    let check = finsh ? "checked" : "";
    let linethrough = finsh ? "style='text-decoration: line-through;'" : "";

    let taskHTML = `
          <div class="wrap-row">
            <input class="checkbox" onchange="checkboxFinshed(this)" type="checkbox" ${check} />
            <p class="text" ${linethrough}>${taskData.task}</p>
            <button class="trash" onclick="removeTask(this)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </button>
          </div>`;

  document.getElementById("list").insertAdjacentHTML("beforeend", taskHTML);
  

}

function checkboxFinshed(box){
  
  let task = box.nextElementSibling;
  let finished = task.innerText;
  // console.log(finished);
  let index = data.findIndex(item => item.task === finished);

  data[index].finished = box.checked;
  
  task.style.textDecoration = box.checked ? "line-through" : "none";
 
  saveTasks();
  countTask();
}

function removeTask(elements){
  let uiRow = elements.parentElement;
  let taskText = uiRow.querySelector(".text").innerText;
  // console.log("task = "+taskText);
  let index = data.findIndex(item => item.task === taskText);
  //console.log("Index"+index);
  if(index > -1){
    data.splice(index,1);
  }

   saveTasks();
   uiRow.remove();
   countTask();
}

function countTask(){

  let countTask = data.length;
  let checkboxes = document.querySelectorAll(".checkbox");

  let finishedTask = 0;
  let unfinishedTask = 0;

  checkboxes.forEach(function(box){
    if(box.checked){
      finishedTask++;
    } else{
      unfinishedTask++;
    }
  
  });

    document.getElementById("count-number").innerHTML = countTask;
    document.getElementById("finTask-number").innerHTML = finishedTask;
    document.getElementById("unFinTask-number").innerHTML = unfinishedTask;
}

data.forEach(function(taskData){
   displayTask(taskData);
});

countTask();
