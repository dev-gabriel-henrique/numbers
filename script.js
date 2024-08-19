// Pegando os elementos em que serão alterados
const form = document.querySelector("form");
const drawnNumbers = document.getElementById("drawnNumbers");
const fromNumber = document.getElementById("fromNumber");
const toNumber = document.getElementById("toNumber");
const drawn = document.getElementById("drawn");
let repeat = document.getElementById("repeat");
const sort = document.querySelector(".sort");

// Alterando estado do checkbox repeat
function toggle() {
  const labelRepeat = document.getElementById("label-repeat");
  if (repeat.checked) {
    labelRepeat.textContent = "Repetir números";
  } else {
    labelRepeat.textContent = "Não repetir números";
  }
}

repeat.addEventListener("change", toggle);

// Preve o movimento padrão do formulário
form.onsubmit = (event) => {
  event.preventDefault();
};

//Evento que sorteia os números.
drawn.addEventListener("click", () => {
  let drawnValue = parseInt(drawnNumbers.value);
  let fromValue = parseInt(fromNumber.value);
  let toValue = parseInt(toNumber.value);

  // Valida o campo input
  try {
    if (
      isNaN(drawnValue) ||
      isNaN(fromValue) ||
      isNaN(toValue) ||
      drawnValue <= 0 ||
      drawnValue > 50 ||
      toValue <= 0 ||
      fromValue <= 0
    ) {
      throw new Error("Valor indisponivel, verifique os numeros digitados");
    }

    const RandomNumbers = new Set();
    const ResultRandom = [];

    if (drawnValue > 1) {
      while (ResultRandom.length < drawnValue) {
        let randomNum = randomNumber(fromValue, toValue);

        if (!repeat.checked && RandomNumbers.has(randomNum)) {
          continue;
        }

        if(drawnValue > toValue - fromValue +1 && !repeat.checked) {
          throw new Error("Quantidade de números não compatível. Favor verifique a quantidade de números sorteados e tente novamente")
        }

        if(toValue > 10000) {
          throw new Error("Valor máximo de números atingido! Favor verifique e tente novamente!")
        }

        RandomNumbers.add(randomNum);
        ResultRandom.push(randomNum);
      }
      
    } else {
      ResultRandom.push(randomNumber(fromValue, toValue));
    }

    sort.innerHTML = "";

    const h2Result = document.createElement("h2");
    h2Result.textContent = "RESULTADO DO SORTEIO";
    h2Result.style.textAlign = "center";

    const pResult = document.createElement("p");
    pResult.textContent = `Resultado`;
    pResult.style.textAlign = "center";

    sort.append(h2Result, pResult);

    form.innerHTML = "";

    const results = document.createElement("div");
    results.classList.add("result");

    ResultRandom.forEach((number, index) => {
      // Tempos de animação
      const boxDelay = index * 4000; // Atraso entre as caixas
      const pDelay = 600; // Atraso de animação do texto
      const boxRemoveDelay = 3000; // Tempo antes da caixa desaparecer

      // Animação da box
      setTimeout(() => {
        const box = document.createElement("div");
        box.classList.add("box");

        const pNumbers = document.createElement("p");
        pNumbers.textContent = number;

        box.appendChild(pNumbers);
        results.appendChild(box);
        box.classList.add("animate-box");

        // Animação do texto
        setTimeout(() => {
          pNumbers.classList.add("move-number");
        }, pDelay);

        // Remoção da box após animação e modificando flexbox do results
        setTimeout(() => {
          box.style.backgroundColor = "transparent";
          pNumbers.style.color = "var(--content-brand)";
        }, boxRemoveDelay);
      }, boxDelay);
    });

    const drawnAgain = document.createElement("button");
    drawnAgain.id = "drawn-again";
    drawnAgain.classList = "flex";
    drawnAgain.innerHTML = `Sortear Novamente 
    <svg id="repeat" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C6.89136 2.75 2.75 6.89136 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 17.937 17.937 22.75 12 22.75C6.06293 22.75 1.25 17.937 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.7937 1.25 17.339 2.31639 19.25 4.06269V2.5C19.25 2.08579 19.5858 1.75 20 1.75C20.4142 1.75 20.75 2.08579 20.75 2.5V6C20.75 6.41421 20.4142 6.75 20 6.75H16.5C16.0858 6.75 15.75 6.41421 15.75 6C15.75 5.58579 16.0858 5.25 16.5 5.25H18.3246C16.6699 3.69872 14.446 2.75 12 2.75Z" fill="white"/>          
    <path d="M15.9453 12.3577C15.7686 12.9844 14.9333 13.4273 13.2629 14.3131C11.648 15.1693 10.8406 15.5975 10.1899 15.4254C9.9209 15.3542 9.6758 15.2191 9.47812 15.0329C9 14.5827 9 13.7094 9 11.9629C9 10.2163 9 9.34307 9.47812 8.89284C9.6758 8.7067 9.9209 8.57157 10.1899 8.50042C10.8406 8.32833 11.648 8.75646 13.2629 9.61272C14.9333 10.4985 15.7686 10.9414 15.9453 11.5681C16.0182 11.8268 16.0182 12.099 15.9453 12.3577Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> `;

    form.append(results, drawnAgain);

    drawnAgain.addEventListener("click", () => {
      location.reload();
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


