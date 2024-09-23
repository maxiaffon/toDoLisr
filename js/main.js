let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Seleccionar elementos del DOM
const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");


function renderTareas() {
  ul.innerHTML = ''; 
  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = tarea;

    li.appendChild(p);
    li.appendChild(createDeleteBtn());
    ul.appendChild(li);
  });

  empty.style.display = tareas.length > 0 ? "none" : "block";
}


function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";
  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    const taskText = item.querySelector("p").textContent;

    
    tareas = tareas.filter(tarea => tarea !== taskText);
    
    localStorage.setItem('tareas', JSON.stringify(tareas));

    
    ul.removeChild(item);
    empty.style.display = ul.children.length > 0 ? "none" : "block";
  });
  return deleteBtn;
}


addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const tarea = input.value.trim();
  if (tarea !== "") {
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    renderTareas();
    input.value = "";
  }
});


renderTareas();
