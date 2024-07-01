  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button-add').addEventListener('click', inseriInteresse);
    document.getElementById('button-clear').addEventListener('click', limparLista)


    carregarInteressesSalvos()
    setInterval(carregarInteressesSalvos, 1000)
    noticias()


    function inseriInteresse() {
        const input = document.getElementById('interesse-input');
        const interesse = input.value.trim();

        if (interesse !== '') {
            adicionarInteresse(interesse);
            salvaInteresse(interesse)
            input.value = ''; 
        } else {
            alert("Insira um interesse");
        }
    }
    function adicionarInteresse(interesse) {
        const lista = document.getElementById('lista-interesses');
        const li = document.createElement('li');
        li.textContent = interesse;
        lista.appendChild(li);
    }
});


function salvaInteresse(interesse) {
  const interesses = JSON.parse(localStorage.getItem('meus-interesses')) || [];
  interesses.push(interesse);
  localStorage.setItem('meus-interesses', JSON.stringify(interesses));
}


function carregarInteressesSalvos() {
       const listaInteresses = document.getElementById('lista-interesses');
       listaInteresses.innerHTML = '';

       let interessesSalvos = JSON.parse(localStorage.getItem('meus-interesses')) || [];

      interessesSalvos.forEach(interesse => {
          const li = document.createElement('li');
          li.textContent = interesse;
          listaInteresses.appendChild(li);
      });
  }

function limparLista() {
localStorage.removeItem('meus-interesses');   
listaInteresses.innerHTML = '';
}
 


const url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release';


async function noticias() {
  try {
  
    const response = await fetch(url);
    
     if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText);
    }   
    const data = await response.json();
     const primeiraNoticia = data.items[0];
     const titulo = primeiraNoticia.titulo;
    
     const titleElement = document.querySelector('.title-news-today');
     titleElement.textContent = titulo;
       
    return titulo;
  } catch (error) {
    // Exibindo erro no console
    console.error('Algum erro ocorreu', error);
  }
}

