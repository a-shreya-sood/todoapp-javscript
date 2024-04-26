//create item
function itemTemplate(item) {
  return `
<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
<span class="item-text">${item.text}</span>
<div>
  <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
  <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
</div>
</li>`
}

//initial page load render

let ourHTML = items
  .map(function (item) {
    return itemTemplate(item)
  })
  .join("")
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)
let inputBoxValue = document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault()
  axios
    .post("/create-item", { text: inputBoxValue.value })
    .then(function (response) {
      //create html for a new item
      document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
      inputBoxValue.value = ""
      inputBoxValue.focus()
    })
    .catch(function () {
      console.log("Please try again later")
    })
})
document.addEventListener("click", function (e) {
  //code for deleting
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this post?")) {
      axios.post("/delete-item", { id: e.target.getAttribute("data-id") }).then(function () {
        e.target.parentElement.parentElement.remove()
      })
    }
  }

  //code for updating
  if (e.target.classList.contains("edit-me")) {
    let value = prompt("Enter you desired text:", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if (value) {
      axios
        .post("/update-item", { text: value, id: e.target.getAttribute("data-id") })
        .then(function () {
          e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = value
        })
        .catch(function () {
          console.log("try again later.")
        })
    }
  }
})
