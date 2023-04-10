"use strict";

// Função que retorna todos os alunos de um curso especifico, com os status especifico daqueles alunos
//Função criada para selecionar os status dos alunos que estão cursando
const statusAlunos = async function (siglaCurso, statusAluno) {

  // Link da API que retorna os status de um aluno conforme o curso do aluno
  const dadosAluno = `http://localhost:8080/v1/lion-school/alunos?curso=${siglaCurso}&status=${statusAluno}`;

  const response = await fetch(dadosAluno);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

// Função que retorna todos os alunos de um curso especifico, Com o ano que o aluno esta cursando
// Função criada para a selecionar o ano que os alunos estão cursando
const anoConclusãoAlunos = async function (siglaCurso, anoConclusaoAluno) {

  const dadosAluno = `http://localhost:8080/v1/lion-school/alunos?curso=${siglaCurso}&ano=${anoConclusaoAluno}`;

  const response = await fetch(dadosAluno);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

// Função que retorna todos os alunos de um curso especifico, com os status dos alunos e com o ano que o aluno esta cursando
// Função criada para a selecionar o ano e os status dos alunos estão cursando
const filtragemAlunoStatusEAnoConclusao = async function (siglaCurso, status, anoConclusao) {

  const dadosAluno = `http://localhost:8080/v1/lion-school/alunos?curso=${siglaCurso}&status=${status}&ano=${anoConclusao}`;

  const response = await fetch(dadosAluno);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

// Função que retorna todos os alunos de um curso especifico,sem definição dos status ou do ano que o aluno esta cursando
const todosAlunosCursoEspecifico = async function (siglaCursoEspecificado) {

  // Link da API que retorna todos os dados dos alunos de um curso especifico
  const dadosTodosAlunosCursoEspecifico = `http://localhost:8080/v1/lion-school/alunos?curso=${siglaCursoEspecificado}`;

  const response = await fetch(dadosTodosAlunosCursoEspecifico);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

//Função que retorna o titulo do curso que os alunos estão cursando
const filtragemNomesCursos = async function () {

  let nomeCurso = localStorage.getItem("nome_curso");

  const ordemCurso = /[0-9]/g;

  nomeCurso = nomeCurso.replace(ordemCurso, "").replace("-", "").trim();

  let tituloCurso = document.querySelector(".titulo_curso");

  tituloCurso.textContent = nomeCurso;
};

filtragemNomesCursos();

//Funções para validação do aluno selecionado conforme o ano
const filtragemAnoConclusao = async function () {

  let anoConclusao = localStorage.getItem("acronym");

  //As duas funções abaixo são para validação do ano, para comparar e selecionar o ano selecionado do curso 
  //e o aluno que ainda esta cursando naquele ano
  const dadosAluno = await todosAlunosCursoEspecifico(anoConclusao);

  // Array
  let anosCursos = [];

  dadosAluno.conclusion.forEach((item) => {
    anosCursos.push(item[0]);
  });

  anosCursos.sort();

  const filtragemAno = anosCursos.filter(
    (ano, indice) => anosCursos.indexOf(ano) === indice
  );

  //Função para caixa de seleção que filtra os alunos pelo ano 
  const anoFiltrado = document.querySelector(".ano__filtragem");

  let caixaFiltragem;

  filtragemAno.forEach((item) => {
    caixaFiltragem = document.createElement("option");
    caixaFiltragem.classList.add("tipo_filtragem");
    caixaFiltragem.setAttribute("value", item);
    caixaFiltragem.textContent = item;

    anoFiltrado.append(caixaFiltragem);
  });

  // Array
  let alunosReferenteAnoFiltrado = [];

  dadosAluno.conclusion.forEach((item) => {
    alunosReferenteAnoFiltrado.push(item[0]);
  });
};

filtragemAnoConclusao();

//As duas funções abaixo são para retornar os status do aluno
const filtragemStatus = document.querySelector(".filtragem__status");

const getStatusSelecionadoAluno = function () {
  const status = filtragemStatus.options[filtragemStatus.selectedIndex].value;
  return status;
};

//Funções para filtrar o ano selecionado
const filtragemAno = document.querySelector(".ano__filtragem");

const getAnoFiltrado = function () {
  const ano = filtragemAno.options[filtragemAno.selectedIndex].value;
  return ano;
};

//Função para validação da busca pelo aluno conforme os status e o ano do mesmo
const filtragemDadosAlunos = async function () {

  let aluno = localStorage.getItem("acronym");

  let dadosALuno;

  //Validações filtragem aluno, aluno é filtrado pelo ano de conclusão e os status atual do aluno
  if (getAnoFiltrado() != "" && getStatusSelecionadoAluno() == "") {

    dadosALuno = await anoConclusãoAlunos(aluno, getAnoFiltrado());

  } else if (getAnoFiltrado() == "" && getStatusSelecionadoAluno() != "") {

    dadosALuno = await statusAlunos(aluno, getStatusSelecionadoAluno());

  } else if (getAnoFiltrado() != "" && getStatusSelecionadoAluno() != "") {
    
    dadosALuno = await filtragemAlunoStatusEAnoConclusao(aluno, getStatusSelecionadoAluno(), getAnoFiltrado());

  } else {

    dadosALuno = await todosAlunosCursoEspecifico(aluno);
  }

  //Função para retornar o container dos alunos
  const containerAlunos = document.querySelector(".container_alunos");

  let alunoEspecifico;
  let imagemAluno;
  let nomeAluno;

  containerAlunos.innerHTML = "";

  //Retorna a imagem e o nome dos alunos
  for (let i = 0; i < dadosALuno.image.length; i++) {

    alunoEspecifico = document.createElement("a");
    alunoEspecifico.setAttribute("href", "./alunoEspecifico.html");
    alunoEspecifico.classList.add("aluno");
    alunoEspecifico.dataset.index = i;

    imagemAluno = document.createElement("img");
    imagemAluno.classList.add("imagem_aluno");
    imagemAluno.setAttribute("src", dadosALuno.image[i]);

    nomeAluno = document.createElement("span");
    nomeAluno.classList.add("nome_aluno");
    nomeAluno.textContent = dadosALuno.name[i];

    //Validação se o aluno ainda esta cursando ou se esta finalizado
    if (dadosALuno.status[i] == "Cursando") {

      // Aluno cursando
      alunoEspecifico.style.backgroundColor = "#3347B0";

    } else {

      // Aluno finalizado
      alunoEspecifico.style.backgroundColor = "#E5B657";
      
    }
    alunoEspecifico.append(imagemAluno, nomeAluno);

    containerAlunos.append(alunoEspecifico);
  }

  //As duas funções abaixos server para que ao clicar no aluno vai para uma pagina com as informações do mesmo, sendo usado get de outras funções
  const getIndiceAlunos = function (event) {

    const getRegistrarAlunosOrdem = function () {
      localStorage.setItem("numeroRegistro", dadosALuno.registration[event.currentTarget.dataset.index]);
    };

    getRegistrarAlunosOrdem();
  };

  const cardIndividualAlunos = document.querySelectorAll(".aluno");

  cardIndividualAlunos.forEach((studentCard) => {
    studentCard.addEventListener("click", getIndiceAlunos);
  });
};

filtragemDadosAlunos();

filtragemStatus.addEventListener("change", getStatusSelecionadoAluno);
filtragemStatus.addEventListener("change", filtragemDadosAlunos);

filtragemAno.addEventListener("change", getAnoFiltrado);
filtragemAno.addEventListener("change", filtragemDadosAlunos);
