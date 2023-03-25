const PUT = (id, cuerpo) => {
  const requestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo)
  }

  fetch('http://localhost:3001/api/'+ id, requestInit)
    .then(response => response.json())
    .then(data => console.log(data))
}

export default PUT;