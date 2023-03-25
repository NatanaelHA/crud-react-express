const POST = (enviar) => {
  const requestInit = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(enviar)
  }

  fetch('http://localhost:3001/api', requestInit)
    .then(response => response.json())
    .then(data => console.log(data))
}

export default POST;