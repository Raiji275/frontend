const apiUrl = 'http://localhost:8000/api/v1/Professions';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const professionTypeSelect = document.getElementById('rprofession-type');
    const professionSelect = document.getElementById('rprofession');

    professionTypeSelect.addEventListener('change', (e) => {
      const chosenValue = e.target.value;
      const professionOptions = data.find((item) => item.name === chosenValue).values;

      professionSelect.innerHTML = '';
      professionOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        professionSelect.appendChild(optionElement);
      });
    });

    // initial population of profession select
    const initialProfessionTypeValue = professionTypeSelect.value;
    const initialProfessionOptions = data.find((item) => item.name === initialProfessionTypeValue).values;
    initialProfessionOptions.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.text = option;
      professionSelect.appendChild(optionElement);
    });
  })
  .catch(error => console.error(error));