window.addEventListener("DOMContentLoaded", async function() {
  const editProfileForm = document.querySelector(".user-facts");
  editProfileForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formFields = {
      // id: document.querySelector("#id").value,
      lastname: document.querySelector("#lastname").value,
      firstname: document.querySelector("#firstname").value,
      surname: document.querySelector("#surname").value,
      city: document.querySelector("#city").value,
      school: document.querySelector("#school").value,
      university: document.querySelector("#university").value
    };

    const response = await fetch(editProfileForm.action, {
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