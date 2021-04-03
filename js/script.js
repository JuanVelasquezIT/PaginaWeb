const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

let erronea1 = 'Hola'
let erronea2 = 'Familia';

document.getElementById('check_button').onclick = function () {
  let won = validacion();
  if (won) {
      alert('You Won 😎');
  } else {
      alert('You lose 😞👌')
  }
}

function validacion() {
  const answers = document.querySelectorAll('.answers p')

  if (answers.length != 2) return false

  for(const answer of answers) {
      if (answer.innerHTML == erronea1 || answer.innerHTML == erronea2) {
          return false
      }
  }
  
  return true
  
}


draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}