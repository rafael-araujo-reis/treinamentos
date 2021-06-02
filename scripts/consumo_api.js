const URL_BASE = 'https://servicodados.ibge.gov.br/api/v1/localidades';
const ESTADOS = '/estados';
const CIDADES = '/municipios';
const ORDER_BY = '?orderBy=nome';

let URL_ESTADO = `${URL_BASE}${ESTADOS}${ORDER_BY}`;

let respondeJSON = '';

const comboEstados = document.querySelector('#comboEstados');
const listaCidades = document.querySelector('#listaCidades');
const load = document.querySelector('#load');

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
  nomeEstado = comboEstados[comboEstados.selectedIndex].textContent;
  idEstado = comboEstados.options[comboEstados.selectedIndex].value;
  atualizarListaCidades(idEstado, nomeEstado);
});

function atualizarListaCidades(idEstado, nomeEstado) {
  let URL_CIDADE = `${URL_BASE}${ESTADOS}/${idEstado}${CIDADES}${ORDER_BY}`;

  const labelCidade = document.querySelector('#labelCidade');
  labelCidade.innerHTML = `Cidades do estado: <span>${nomeEstado}</span>`;

  requestAPI(URL_CIDADE)
    .then(data => cidadesJSON = data);

  listaCidades.innerHTML = '';

  load.classList.add('active');
  setTimeout(() => {
    carregarListaCidades();
    load.classList.remove('active');
  }, 2000);
}

function carregarListaCidades() {
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

load.classList.add('active');
setTimeout(() => {
  carregarComboEstados();
  idEstado = comboEstados.options[comboEstados.selectedIndex].value;
  nomeEstado = comboEstados[comboEstados.selectedIndex].textContent;
  atualizarListaCidades(idEstado, nomeEstado);
}, 1000);