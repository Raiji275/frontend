// form.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rform');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // ← stop the browser navigating away

    // gather all the field values
    const data = {};
    new FormData(form).forEach((value, key) => {
      data[key] = value;
    });

    try {
      const resp = await fetch('http://localhost:8000/api/v1/elselt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const body = await resp.json();

     if (resp.ok) {
  Swal.fire({
    icon: 'success',
    title: 'Good job!',
    text: body.message || 'Амжилттай!',
    confirmButtonText: 'Хаах',
    // optional styling overrides:
    customClass: {
      popup: 'my-popup',
      title: 'my-title',
      content: 'my-content',
      confirmButton: 'my-confirm-btn'
    }
  });
  form.reset();
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: body.error || body.message,
  });
}
    } catch (err) {
      console.error(err);
      alert('Network error — please try again.');
    }
  });
});
