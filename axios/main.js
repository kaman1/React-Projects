/** @format */

//Axios Global for multiple protected routes
axios.defaults.headers.common["X-Auth-Token"] = "fgh41dgh564BOSSdh451d6fh4";

// GET REQUEST
function getTodos() {
  axios
    .get(
      "https://jsonplaceholder.typicode.com/todos",
      { timeout: 5000 },
      {
        params: {
          _limit: 2,
        },
      }
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Update todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Update todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "someToken",
    },
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New todo",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello From Earth",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss")
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      if (err.response.status === 404) {
        alert("Error page not found");
      } else if (err.request) {
        //request was made no response
        console.log(err.request);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request Cancel!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } on this date ${new Date()} }`
    );
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  //other custome setting
  baseURL: "https://jsonplaceholder.typicode.com",
});

// axiosInstance.get("/comments").then((res) => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);