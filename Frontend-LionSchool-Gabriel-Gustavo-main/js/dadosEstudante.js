"use strict";

//Função criada para retornar o aluno selecionado, trazendo a foto e o nome do aluno
const alunoSelecionadoMatricula = async function (matricula) {

  // Link da API que retorna os dados especificos de um estudante
  const dadosEstudanteFiltradoMatricula = `http://localhost:8080/v1/lion-school/alunos-matricula?matricula=${matricula}`;

  const response = await fetch(dadosEstudanteFiltradoMatricula);
  const data = await response.json();

  return {
    image: data.aluno[0].foto,
    name: data.aluno[0].nome,
  };
};

let registroEstudante = localStorage.getItem("numeroRegistro");

//As Funções criadas abaixo são para retornar os alunos de uma disciplina especifica
const estudanteEDisciplinas = async function (matricula) {

  // Link da API que retorna dados das disciplinas do aluno filtrado
  const dadosAlunoFiltradoMatricula = `http://localhost:8080/v1/lion-school/alunos-disciplinas?matricula=${matricula}`;

  const response = await fetch(dadosAlunoFiltradoMatricula);
  const data = await response.json();

  return {
    nome: data.disciplinas.map((disciplina) => disciplina.nome),
    average: data.disciplinas.map((disciplina) => disciplina.media),
  };
};

const filtragemDadosCurso = async function () {

  const dadosReferentesAluno = await estudanteEDisciplinas(registroEstudante);
  const dadosAluno = await alunoSelecionadoMatricula(registroEstudante);

  const containerAluno = document.querySelector(".container_aluno_selecionado");

  const imagemAluno = document.createElement("img");
  imagemAluno.classList.add("imagem_aluno");
  imagemAluno.setAttribute("src", dadosAluno.image);

  const nomeAluno = document.createElement("span");
  nomeAluno.classList.add("nome_aluno");
  nomeAluno.textContent = dadosAluno.name;

  containerAluno.append(imagemAluno, nomeAluno);

  let filtragemNomesAlunos = [];

  for (let i = 0; i < dadosReferentesAluno.nome.length; i++) {

    let nomesAlunos = dadosReferentesAluno.nome[i];

    nomesAlunos = nomesAlunos.split(" ");

    let acronimo = "";

    nomesAlunos.forEach((nomeAluno) => {

      let arrayNomesSeparadamente = [];
      arrayNomesSeparadamente.push(nomeAluno);

      acronimo += arrayNomesSeparadamente[0][0];
    });

    filtragemNomesAlunos.push(acronimo.toUpperCase());
  }

  //Função criada para a criação de containers que contem os status do aluno com base no desempenho do mesmo em cada matéria
  const containerGraficoDisciplinas = document.querySelector(".container_grafico_desempenho_aluno");

  let cardGrades;
  let containerGrade;
  let barraDesempenho;
  let gradeTitulosDisciplinas;
  let containerGradeTitulosDisciplinas;
  
  
  for (let i = 0; i < dadosReferentesAluno.average.length; i++) {
    cardGrades = document.createElement("div");
    cardGrades.classList.add("grade");

    gradeTitulosDisciplinas = document.createElement("span");
    gradeTitulosDisciplinas.classList.add("grade_titulo");
    gradeTitulosDisciplinas.textContent = dadosReferentesAluno.average[i];

    containerGrade = document.createElement("div");
    containerGrade.classList.add("container_grade");

    barraDesempenho = document.createElement("div");
    barraDesempenho.classList.add("barras_grade");

    containerGrade.append(barraDesempenho);

    containerGradeTitulosDisciplinas = document.createElement("div");
    containerGradeTitulosDisciplinas.classList.add("atributos_nome_grade");
    containerGradeTitulosDisciplinas.textContent = filtragemNomesAlunos[i];

    cardGrades.append(gradeTitulosDisciplinas, containerGrade, containerGradeTitulosDisciplinas);
    containerGraficoDisciplinas.append(cardGrades);
  }

  const grades = document.querySelectorAll(".grade_titulo");

  const barras = document.querySelectorAll(".barras_grade");

  //Funções para selecionar as cores das materias dos estudantes conforme seu desempenho
  //Função para deixar as informações do gráfico na vertical (Feito para Celular)
  const graficoVertical = function () {

    grades.forEach((grade, indice) => {

      // Validação para caso o desempenho do aluno for menor ou igual a 49, o aluno tera uma nota baixa
      if (grade.textContent <= 49) {

        //Validação para cor vermelho, para alunos com baixo desempenho
        let gradeBaixoDesempenho = grade.textContent;

        // grade com barras da cor vermelha
        grade.style.color = "#ff0000";
        barras[indice].style.backgroundColor = "#ff0000";
        barras[indice].style.boxShadow = "0px 0px 24px #ff0000";
        barras[indice].style.height = `${gradeBaixoDesempenho}%`;
        barras[indice].style.width = "100%";

        // Validação para caso o desempenho do aluno ficar entre 50 e 69, o aluno tera uma nota média
      } else if (grade.textContent >= 50 && grade.textContent <= 69) {

        //Validação para cor amarela, para alunos com desempenho médio
        let gradeMedioDesempenho = grade.textContent;

        // grade com barras da cor amarela
        grade.style.color = "#ffff00";
        barras[indice].style.backgroundColor = "#ffff00";
        barras[indice].style.boxShadow = "0px 0px 24px #ffff00";
        barras[indice].style.height = `${gradeMedioDesempenho}%`;
        barras[indice].style.width = "100%";

        // Validação para caso o desempenho do aluno for maior ou igual 70, o aluno tera uma nota ótima
      } else if (grade.textContent >= 70) {

        //Validação para cor azul, para alunos com alto desempenho
        let gradeOtimoDesempenho = grade.textContent;

        // grade com barras da cor ciano
        grade.style.color = "#00ffff";
        barras[indice].style.backgroundColor = "#00ffff";
        barras[indice].style.boxShadow = "0px 0px 24px #00ffff";
        barras[indice].style.height = `${gradeOtimoDesempenho}%`;
        barras[indice].style.width = "100%";
      }
    });
  };

  

  //Função para deixar as informações do gráfico na horizontal (Feito para Desktop)
  const graficoHorizontal = function () {

    grades.forEach((grade, indice) => {

      // Validação para caso o desempenho do aluno for menor ou igual a 49, o aluno tera uma nota baixa
      if (grade.textContent <= 49) {

        //Validação para cor vermelho, para alunos com baixo desempenho
        let gradeBaixoDesempenho = grade.textContent;

        // grade com barras da cor vermelha
        grade.style.color = "#ff0000";
        barras[indice].style.backgroundColor = "#ff0000";
        barras[indice].style.boxShadow = "0px 0px 24px #ff0000";
        barras[indice].style.width = `${gradeBaixoDesempenho}%`;
        barras[indice].style.height = "100%";

        // Validação para caso o desempenho do aluno ficar entre 50 e 69, o aluno tera uma nota média
      } else if (grade.textContent >= 50 && grade.textContent <= 69) {

        //Validação para cor amarela, para alunos com desempenho médio
        let grandeMedioDesempenho = grade.textContent;

        // grade com barras da cor amarela
        grade.style.color = "#ffff00";
        barras[indice].style.backgroundColor = "#ffff00";
        barras[indice].style.boxShadow = "0px 0px 24px #ffff00";
        barras[indice].style.width = `${grandeMedioDesempenho}%`;
        barras[indice].style.height = "100%";
        
        // Validação para caso o desempenho do aluno for maior ou igual 70, o aluno tera uma nota ótima
      } else if(grade.textContent >= 70) {

        //Validação para cor azul, para alunos com alto desempenho
        let gradeOtimoDesempenho = grade.textContent;

        // grade com barras da cor ciano
        grade.style.color = "#00ffff";
        barras[indice].style.backgroundColor = "#00ffff";
        barras[indice].style.boxShadow = "0px 0px 24px #00ffff";
        barras[indice].style.width = `${gradeOtimoDesempenho}%`;
        barras[indice].style.height = "100%";

      }
    });
  };

  let tamanhoTela = window.matchMedia("(max-width: 600px)");

  const getDadosGraficos = function () {
    if (tamanhoTela.matches) {
      graficoHorizontal();
    } else {
      graficoVertical();
    }
  };

  window.addEventListener("resize", getDadosGraficos);

  if (tamanhoTela.matches) {
    graficoHorizontal();
  } else {
    graficoVertical();
  }
};

filtragemDadosCurso();
