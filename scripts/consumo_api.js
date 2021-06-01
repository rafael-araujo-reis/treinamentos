const URL_BASE = 'https://servicodados.ibge.gov.br/api/v1/localidades';
const ESTADOS = '/estados';
const CIDADES = '/municipios';
const ORDER_BY = '?orderBy=nome';

let URL_ESTADO = `${URL_BASE}${ESTADOS}${ORDER_BY}`;

let respondeJSON = '';

const comboEstados = document.querySelector('#comboEstados');
const listaCidades = document.querySelector('#listaCidades');

const requestAPI = async (url) => {
  const response = await fetch(url, {
    method: 'GET'
  });

  this.responseJSON = await response.json();
  return responseJSON;
};

requestAPI(URL_ESTADO)
  .then(data => estadosJSON = data);


function carregarComboEstados() {
  for (let index = 0; index < estadosJSON.length; index++) {
    const estado = estadosJSON[index];
    const id = `${estado.sigla}${estado.id}`;
    const value = estado.id;
    const nome = estado.nome;

    const option = document.createElement('option');
    option.setAttribute('id', id.toLocaleLowerCase());
    option.setAttribute('value', value);
    option.innerHTML = nome;
    comboEstados.append(option);
  }
}

comboEstados.addEventListener('change', () => {
  idEstado = comboEstados.options[comboEstados.selectedIndex].value;
  atualizarListaCidades(idEstado);
});

function atualizarListaCidades(idEstado) {
  let URL_CIDADE = `${URL_BASE}${ESTADOS}/${idEstado}${CIDADES}${ORDER_BY}`;

  requestAPI(URL_CIDADE)
    .then(data => cidadesJSON = data);

  setTimeout(() => {
    carregarListaCidades();
  }, 2000);
}

function carregarListaCidades() {
  listaCidades.innerHTML = '';
  for (let index = 0; index < cidadesJSON.length; index++) {
    const cidade = cidadesJSON[index];
    const id = cidade.id;
    const value = cidade.id;
    const nome = cidade.nome;

    const li = document.createElement('li');
    li.setAttribute('id', id);
    li.setAttribute('value', value);
    li.innerHTML = nome;

    listaCidades.append(li);
  }
}

setTimeout(() => {
  carregarComboEstados();
  idEstado = comboEstados.options[comboEstados.selectedIndex].value;
  atualizarListaCidades(idEstado);
}, 1000);