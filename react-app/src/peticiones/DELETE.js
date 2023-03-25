const DELETE = (id) => {
  const requestInit = {
    method: 'DELETE'
  }

  fetch('http://localhost:3001/api/'+ id, requestInit)
    .then(response => response.json())
    .then(data => console.log(data))
}

export default DELETE;