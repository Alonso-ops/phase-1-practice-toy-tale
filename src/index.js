let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

    fetchToys ();
    
    const form = document.querySelector(".add-toy-form");
    form.addEventListener("submit", e => {
      e.preventDefault();

      const name = e.target.name.value;
      const image = e.target.image.value;

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
        }) 
        })
        .then(res => res,json())
        .then(newToy => {
          renderToy(newToy);
          form.reset();
        });
      });
    });
    function fetchToys() {
      fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toys => {
        toys.forEach(toy => renderToy(toy));
      });
    }
    function renderToy(toy) {
      const toyCollection = document. getElementById("toy-collection");

      const card = document.createElement("div");
      card.className = "card";

  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  const likeBtn = card.querySelector("button");
  likeBtn.addEventListener("click", () => handleLike(toy, card));

    toyCollection.appendChild(card);
  }
  function handleLike(toy, card) {
    const newLikes = toy.likes + 1;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
    .then((res) => res.json())
    .then((updatedToy) => {
      toy.likes = updatedToy.likes;
      const p = card.querySelector("p");
      p.textContent = `${updatedToy.likes} Likes`;
    });
  }
