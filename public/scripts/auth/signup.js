window.addEventListener('DOMContentLoaded', async function () {
  const signUpForm = document.querySelector('.sign-up-form');
  signUpForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formFields = [
      { id: 'email', value: document.querySelector('#email').value },
      { id: 'password', value: document.querySelector('#password').value },
    ];

    const response = await fetch(signUpForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formFields: formFields }),
      credentials: 'include',
      mode: 'same-origin',
    });

    const data = await response.json();

    if (data.status !== 'OK') {
      for (let i = 0; i < data.formFields.length; i++) {
        alert(`${data.formFields[i].id} ${data.formFields[i].error}`);
      }
      return;
    }

    await storeNewUser(data.user.id);
    window.location.href = '/';
  });
});

async function storeNewUser(supertokensUserId) {
  const fields = {
    email: document.querySelector('#email').value,
    firstname: document.querySelector('#firstname').value,
    lastname: document.querySelector('#lastname').value,
    supertokensUserId: supertokensUserId
  };

  await fetch('/api/v1/users', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
}