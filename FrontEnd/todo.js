const API_URL = "http://localhost:3000/db";
document.getElementById("head").innerHTML = "My To-do List"
const now = new Date();
// document.getElementById("demo").innerText = now.toDateString();

const taskinput = document.getElementById("taskinput");
const taskbtn = document.getElementById("taskbtn");
const todotask = document.getElementById("todotask");
const completedtask = document.getElementById("completedtask");

// get all tasks
async function alltask() {
  const res = await fetch(`${API_URL}/all`);
  const data = await res.json();

  todotask.innerHTML = "";
  completedtask.innerHTML = "";

  data.allTask.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.task;

    if (task.completed) {
      li.classList.add("done");

      const removebutton = document.createElement("button");
      removebutton.innerHTML = `<i class="fas fa-trash"></i>`;
      removebutton.onclick = () => deleteList(task._id);

      li.style.textDecoration = "line-through";
      li.style.color = "gray"
      li.style.borderLeft = "4px solid green"
      removebutton.style.color = "red"

      li.appendChild(removebutton)
      completedtask.appendChild(li);
      document.getElementById("dem").innerText = now.toDateString();

    } else {
      const finishedTask = document.createElement("button");
      finishedTask.innerHTML = `<i class="fas fa-check"></i>`;
      finishedTask.style.color = "green"
      finishedTask.onclick = () => updateList(task._id, true);

      const removebutton = document.createElement("button");
      removebutton.innerHTML = `<i class="fas fa-trash"></i>`;
      removebutton.style.color = "red"
      removebutton.onclick = () => deleteList(task._id);

      li.appendChild(finishedTask);
      li.appendChild(removebutton);
      todotask.appendChild(li);
      li.style.borderLeft = "4px solid orange";
      document.getElementById("demo").innerText = now.toDateString();

    }
  });
}

// add task
taskbtn.addEventListener("click", async () => {
  const work = taskinput.value.trim();
  if (!work) return;

  await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: work }),
  });

  taskinput.value = "";
  alltask();
});

// update
async function updateList(id, completed) {
  await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),

  });
  alltask();
}

// delete
async function deleteList(id) {
  await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
  alltask();
}

alltask();
