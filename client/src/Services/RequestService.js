//Helper Functions
function wait(time) {
  return new Promise(function(resolve, reject) {
      setTimeout(resolve, time);
  })
}
function printResponse(res){
  res.json()
  .then((body)=>{
    console.log(body)
  })
}
async function getResponse(res){
  let response
  await res.json()
  .then((body)=>{
    response = body
  })
  return response
}


//Exported functions
export const RequestService = {
  addItem: async (to, from, description, location, weight)=>{

    await fetch("http://localhost:8000/api/v1/item",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            to:to,
            from:from,
            description:description,
            location: location,
            weight: weight
          })})
      // status = (await getResponse(status)).status;
      // console.log("read", status)
      return 0
  },
  deleteItem: async (id) => {
    await fetch("http://localhost:8000/api/v1/item",
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: id
        })
      })
    return 0
  },
  editItem: async (id, to, from, description, location, weight) => {
    await fetch("http://localhost:8000/api/v1/item",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          to: to,
          from: from,
          description: description,
          location: location,
          weight: weight
        })
      })
    return 0
  },
  getItems: async () => {
    var body = '';
    await fetch("http://localhost:8000/api/v1/item", { method: "GET", headers: { 'Accept': 'application/json', 'Content-type': 'application/json'}})
    .then ((res)=>{
      body = res
    })
    await body.json().then((res) => {
      body = res.body
    });
    return body;
  },
  addLoc: async (location) => {
    console.log(location)
    await fetch("http://localhost:8000/api/v1/location",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location })
      })
    return 0
  },
  deleteLoc: async (location) => {
    await fetch("http://localhost:8000/api/v1/location",
      {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ location: location })
      })
    return 0
  },
  getLocations: async () => {
    var body = '';
    await fetch("http://localhost:8000/api/v1/location", { method: "GET", headers: { 'Accept': 'application/json', 'Content-type': 'application/json' } })
      .then((res) => {
        body = res
      })
    await body.json().then((res) => {
      body = res.body
    });
    return body;
  }
}


