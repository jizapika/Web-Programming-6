window.addEventListener("DOMContentLoaded", async function() {
  const addPostForm = document.querySelector(".add-post-form");
  addPostForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formFields = {
      text: document.querySelector("#text").value,
    };

    const response = await fetch(addPostForm.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
      credentials: "include",
      mode: "same-origin"
    });

    const data = await response.json();

    if (data.result !== "ok") {
      alert("Не удалось сохранить изменённые данные профиля.")
    }

    window.location.href = "/";
  });
});