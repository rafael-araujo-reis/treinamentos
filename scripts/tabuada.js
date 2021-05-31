const tabuadaContainer = document.querySelector('#tabuadas');
const header = document.querySelector('header');

function gerarTabuadas(qntdTabuadas) {
  const tabuadasArray = [];
  for (let tabuada = 1; tabuada <= qntdTabuadas; tabuada++) {
    tabuadasArray.push(calcularTabuada(tabuada));
  }
  return tabuadasArray;
}

function calcularTabuada(tabuada) {
  const tamanhoTabuada = 10;
  const tabuadaRetorno = [];

  for (let contador = 1; contador <= tamanhoTabuada; contador++) {
    let resultado = tabuada * contador;
    tabuadaRetorno.push({
      'tabuada': tabuada,
      'contador': contador,
      'resultado': resultado
    });
  }
  return tabuadaRetorno;
}

function montarTabuadaHTML() {

  const qntdTabuadas = 30;
  const tabuadas = gerarTabuadas(qntdTabuadas);
  const tituloHeader = document.createElement('h1');

  tituloHeader.innerHTML = `Tabuadas <span>do 1 ao ${tabuadas.length}</span>`;
  header.appendChild(tituloHeader);

  for (let index = 0; index < tabuadas.length; index++) {
    const object = tabuadas[index];
    const tabuada = object[0].tabuada;


    const tituloTabuada = `Tabuada do ${tabuada}`;

    const lista = document.createElement('ul');
    const titulo = document.createElement('h2');

    lista.setAttribute('id', `tabuada_${tabuada}`);

    lista.classList.add('card');

    titulo.innerHTML = tituloTabuada;
    lista.appendChild(titulo);
    tabuadaContainer.appendChild(lista);

    for (let i = 0; i < object.length; i++) {
      const tabuada = object[i].tabuada;
      const contador = object[i].contador;
      const resultado = object[i].resultado;

      const linha = document.createElement('li');

      linha.innerHTML = `${tabuada} x ${contador} = <span>${resultado}</span>`;

      lista.appendChild(linha);
    }
  }
}

montarTabuadaHTML();