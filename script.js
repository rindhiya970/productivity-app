   function enterApp() {
      document.getElementById('splashScreen').style.display = 'none';  
      document.getElementById('mainApp').style.display = 'block';
    }

    const taskInput = document.getElementById('taskInput');  
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const resetAllBtn = document.getElementById('resetAllBtn');             

    addTaskBtn.addEventListener('click', addTask);         
    resetAllBtn.addEventListener('click', resetAllTasks);       

    function addTask() {
      const taskValue = taskInput.value.trim();      
      if (taskValue !== '') {   
        const newTask = createTaskElement(taskValue);     
        taskList.appendChild(newTask);
        taskInput.value = '';       
        saveTasks(); 
        updateProgressBar();
      } else {
        alert('Please enter a task!');      
      }
    }              

    function createTaskElement(taskTextValue) {   
      const li = document.createElement('li');     
      li.classList.add('task-item');         

      const taskText = document.createElement('span');               
      taskText.textContent = taskTextValue;     
      taskText.classList.add('task-text');    

      const completeBtn = document.createElement('button');
      completeBtn.textContent = '✅';      
      completeBtn.classList.add('complete-btn');
      completeBtn.addEventListener('click', function () {
        taskText.classList.toggle('completed');        
        saveTasks();          
        updateProgressBar();   
      });          

      const deleteBtn = document.createElement('button');    
      deleteBtn.textContent = '❌';
      deleteBtn.classList.add('complete-btn');
      deleteBtn.addEventListener('click', function () {      
        li.remove();
        saveTasks();
        updateProgressBar();    
      });

      li.appendChild(taskText);
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
       
      
      return li;
    }
        
    function saveTasks() {      
      const tasks = [];
      document.querySelectorAll('#taskList li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent; 
        const isCompleted = taskItem.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        const taskElement = createTaskElement(task.text);
        if (task.completed) {
          taskElement.querySelector('span').classList.add('completed');
        }
        taskList.appendChild(taskElement);        
      });      
       updateProgressBar();      
    }          

    function resetAllTasks() {              
      if (confirm('Are you sure you want to delete all tasks?')) {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');         
        updateProgressBar();
      }
    }

    function updateProgressBar() {                
      const totalTasks = document.querySelectorAll('#taskList li').length;
      const completedTasks = document.querySelectorAll('.completed').length;

      const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
      document.getElementById('progressBar').style.width = percentage + '%';
      document.getElementById('progressText').textContent = `${completedTasks} of ${totalTasks} tasks completed (${percentage}%)`;

      if (percentage === 100 && totalTasks !== 0) {   
        celebrate();



      }             
    }        
    function celebrate() {        
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      document.getElementById('fireworkSound').play();             
      setTimeout(() => document.getElementById('cheerSound').play(), 700);

      const banner = document.getElementById('celebrationBanner');
      banner.style.display = 'block';
      setTimeout(() => banner.style.display = 'none', 5000);

      setTimeout(() => {   
        alert('Woooohoooo! You nailed it! Every task completed. You are unstoppable!');
      }, 1500);
    }

    window.onload = loadTasks;        

  function updateDate() {     
    const dateElement = document.getElementById('currentDate');
    const today = new Date(); 
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
  }
         
     