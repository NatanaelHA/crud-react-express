const GET = () => (
  fetch('http://localhost:3001/api')
  .then(response => response.json())
  .then(data => {return data})
)

export default GET;
