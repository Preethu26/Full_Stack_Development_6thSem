const API_URL="http://localhost:5000/api/tasks"


const taskForm=document.getElementById("taskForm")
const taskList=document.getElementById("taskList")
const descriptionInput=document.getElementById("description");
const titleInput=document.getElementById("title");




async function fetchTasks(){
    try{
        const response=await fetch(API_URL);
        const tasks=await response.json();


        taskList.innerHTML=""


        tasks.forEach(task=>{
            const taskDiv=document.createElement("div");
            taskDiv.classList.add("task-item");




            taskDiv.innerHTML=`<h3>${task.title}</h3>
                                <p>${task.description}</p>
                                <small>Status:${task.status}</small>
                                <hr>
                                `;
                             taskList.appendChild(taskDiv);  
        })


    }
    catch(error){
        console.error("Error Fetching Tasks:",error);
    }
}
// ADDING NEW TASK


taskForm.addEventListener("submit",async(e)=>{
    e.preventDefault();


    const title=titleInput.value.trim();
    const description=descriptionInput.value.trim();


    if(!title){
        alert("Title is Required");
        return;
    }
    try{
        const response=await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title,description})
        });
        if(!response.ok){
            throw new Error("Failed to add");
        }
        titleInput.value="";
        descriptionInput.value="";
        fetchTasks();
    }
    catch(error){
        console.error("Eroor",error);
    }
});
fetchTasks()

