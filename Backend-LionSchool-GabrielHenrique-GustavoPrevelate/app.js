/******************************************************************************************
 * Objetivo: Criar APIs para o projeto integrado LionSchool
 * Autor: Gustavo Prevelate e Gabriel Henrique
 * Data: 10/04/2023
 * Versão: 5.0
 ******************************************************************************************/

/**
 * Express --> dependencia do Node, que permite a integração entre o protocolo http com o código
 * Comando para instalação do Express --> npm install express --save
 * 
 * Cors --> Gerenciador de permissões para o protocolo HTTP
 * Comando para instalação do Cors --> npm install cors --save
 * 
 * Body-Parser --> É uma dependencia que permite manipular dados enviados pelo body da requisição
 * Comando para instalação do Body-Parser --> npm install body-parser --save
 * 
 ***/

//import das dependencias para criar a API
//Responsável pelas requisições
const express = require("express");

//Responsável pelas permissões
const cors = require("cors");

//Cria um objeto com as informações da classe express
const app = express();

//Define as permissões no header da API
app.use((request, response, next) => {
  //Permite gerenciar a origem das requisições da API
    // * --> significa que a API será publica
    // IP --> se colocar o IP, a API somente responderá para aquela Máquina/Servidor/Requisição
  response.header("Access-Control-Allow-Origin", "*");

  //Permite gerenciar quais verbos (metodos) poderão fazer requisições
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  //Ativa no cors das requisições as permissões estabelecidas
  app.use(cors());

  next();
});

//EndPoints

// EndPoint: retorna todos os alunos pela matricula
app.get("/v1/lion-school/alunos-matricula", cors(), async function (request, response, next) {

  // Importação modulo pegar todas as disciplinas de um aluno pela matricula do aluno
  const alunos = require("./modulo/JS_alunosMatriculadosEDisciplinas/get-disciplinasAlunosMatricula.js");

  //  Request matricula do aluno
  let numeroMatriculaAluno = request.query.matricula;

  // Status do código
  let statusCode;

  // json
  let dadosAluno = {};
  let aluno;

  // Validações
  if (numeroMatriculaAluno == undefined || numeroMatriculaAluno == "" || isNaN(numeroMatriculaAluno)) {

    statusCode = 400;

    dadosAluno.message = "O Número da matrícula está vazio ou não é um número. Por favor preencha o número da matrícula corretamente";
  } else {
    aluno = alunos.getAlunoMatricula(numeroMatriculaAluno);
    if (aluno) {
      dadosAluno.aluno = aluno;
      statusCode = 200;
    } else {
      statusCode = 404;
    }
  }

  // response status e dados do(a) aluno(a)
  response.status(statusCode);
  response.json(dadosAluno);
}
);

// EndPoint: retorna todos os alunos matriculados em um curso especifico
// Com as informações do ano que o aluno esta cursando e
// Com os informações dos status do aluno
app.get("/v1/lion-school/alunos", cors(), async function (request, response, next) {

    // Importações dos modulos para pegar alunos matriculados na escola,
    // ano de conclusão dos alunos, status dos alunos e status dos alunos conforme o ano
    let alunosMatriculadosCursoEspecifico = require("./modulo/JS_Status_anoCursando_Matriculados/get-alunosCursoEspecifico.js");
    let anoAlunoConcluindo = require("./modulo/JS_Status_anoCursando_Matriculados/get-alunosAnoCursando.js");
    let statusAlunos = require("./modulo/JS_Status_anoCursando_Matriculados/get-alunosStatusAtual.js");
    let statusEAnoConclusaoAlunos = require("./modulo/JS_Status_anoCursando_Matriculados/get-alunosStatusEAnoCursando.js");

    //  Request sigla de um curso especifico
    //  Request status de um aluno
    //  Request ano que o aluno esta concluindo o curso
    let siglaCurso = request.query.curso;
    let statusAluno = request.query.status;
    let anoConclusaoAluno = request.query.ano;

    // json
    let dadosGeraisAluno = {};

    // Status do código
    let statusCode;

    // Validações abaixo
    // validação sigla de um curso
    if (siglaCurso != undefined) {

      if (siglaCurso == undefined) {

        statusCode = 400;

        dadosGeraisAluno.message = "A sigla do curso está inválida ou vazia. Por favor preencha corretamente a sigla de um curso";
      } else {
        
        // Validação ano que o aluno esta concluindo o curso
        if (anoConclusaoAluno != undefined && statusAluno == undefined) {

          if (anoConclusaoAluno == undefined) {

            statusCode = 400;
            
            dadosGeraisAluno.message ="O ano de conclusão do(a) aluno(a) está inválido ou vazio. Por favor preencha corretamente o ano de conclusão do(a) aluno(a)";
          } else {

            let alunosFiltrados; 
            
            alunosFiltrados = anoAlunoConcluindo.getAlunosAnoCursando(siglaCurso, anoConclusaoAluno);

            if (alunosFiltrados) {

              statusCode = 200;

              dadosGeraisAluno.alunos = alunosFiltrados;
            } else {

              statusCode = 404;

            }
          }

          // response status e dados do(a) aluno(a)
          response.status(statusCode);
          response.json(dadosGeraisAluno);

        }

        // Validação dos status dos alunos 
        if (anoConclusaoAluno == undefined && statusAluno != undefined) {

          if (statusAluno == undefined) {

            statusCode = 400;

            dadosGeraisAluno.message = "Os status estão inválidos ou vazios. Por favor preencha os status dos alunos corretamente";

          } else {

            let alunosFiltrados 
            
            alunosFiltrados = statusAlunos.getAlunosStatus(siglaCurso, statusAluno);

            if (alunosFiltrados) {

              statusCode = 200;

              dadosGeraisAluno.alunos = alunosFiltrados;

            } else {
              statusCode = 404;
            }
          }

          // response status e dados do(a) aluno(a)
          response.status(statusCode);
          response.json(dadosGeraisAluno);
        }

        // Validação dos status dos alunos com base no ano que o(a) aluno(a) está concluindo
        if (anoConclusaoAluno != undefined && statusAluno != undefined) {

          if (statusAluno == undefined) {

            statusCode = 400;

            dadosGeraisAluno.message ="Os status e/ou o ano de conclusão do(a) aluno(a) está/estão inválido(s) ou vazio(s). Por favor Preencha corretamente";

          } else {

            let alunosFiltrados 
            
            alunosFiltrados = statusEAnoConclusaoAlunos.getAlunosStatusAno(siglaCurso, statusAluno, anoConclusaoAluno);

            if (alunosFiltrados) {

              statusCode = 200;

              dadosGeraisAluno.alunos = alunosFiltrados;

            } else {
              statusCode = 404;
            }
          }

          // response status e dados do(a) aluno(a)
          response.status(statusCode);
          response.json(dadosGeraisAluno);
        }
        if (anoConclusaoAluno == undefined && statusAluno == undefined) {

          let alunosFiltrados 
          
          alunosFiltrados = alunosMatriculadosCursoEspecifico.getAlunosCursoEspecifico(siglaCurso);

          if (alunosFiltrados) {
            statusCode = 200;
            dadosGeraisAluno.alunos = alunosFiltrados;
          } else {
            statusCode = 404;
          }

          // response status e dados do(a) aluno(a)
          response.status(statusCode);
          response.json(dadosGeraisAluno);
        }
      }
    } else {
      const alunos = require("./modulo/js_TodosAlunos/get-TodosAlunos.js");

      // json 
      let todosAlunosJSON = {};
      let todosAlunos = alunos.getTodosAlunosEscola();

      if (todosAlunos) {

        todosAlunosJSON.alunos = todosAlunos;

        response.json(todosAlunosJSON);
        response.status(200);
      } else {
        response.status(500);
      }
    }
  }
);

// EndPoint: retorna todas as informações das disciplinas de um aluno com base na matricula
app.get("/v1/lion-school/alunos-disciplinas", cors(), async function (request, response, next) {

  //Importação do modulo que pega as disciplinas de um aluno especifico com base na matricula do mesmo 
  const alunosFiltradosMatricula = require("./modulo/JS_alunosMatriculadosEDisciplinas/get-disciplinasAlunosMatricula.js");

  //Request da matricula do aluno 
  let numeroMatriculaAluno = request.query.matricula;

  // Status do código
  let statusCode;

  // json
  let dadosGeraisAluno = {};
  let alunoFiltrado;

  // Validações
  if (numeroMatriculaAluno == undefined || numeroMatriculaAluno == "" || isNaN(numeroMatriculaAluno)) {

    statusCode = 400;

    dadosGeraisAluno.message = "O número da matrícula do(a) aluno(a) está vazio ou não é um número. Por favor preencha o número da matrícula corretamente";
  } else {

    alunoFiltrado = alunosFiltradosMatricula.getDisciplinasAluno(numeroMatriculaAluno);

    if (alunoFiltrado) {

      dadosGeraisAluno.disciplinas = alunoFiltrado;

      statusCode = 200;
    } else {
      statusCode = 404;
    }
  }

  // response status e dados do(a) aluno(a)
  response.status(statusCode);
  response.json(dadosGeraisAluno);
}
);

// EndPoint: retorna uma lista com todos os cursos disponiveis na escola 
app.get("/v1/lion-school/cursos", cors(), async function (request, response, next) {

  // Importação modulo pegar todos os cursos da escola
  const cursos = require("./modulo/js_TodosCursos/get-TodosCursos.js");

  // json
  let cursosEscolaJSON = {};

  // Seleção de cursos da escola
  let cursosEscola = cursos.getTodosCursosEscola();

  if (cursosEscola) {

    cursosEscolaJSON.cursos = cursosEscola;

    response.json(cursosEscolaJSON);
    response.status(200);
  } else {
    response.status(500);
  }
}
);

//Permite carregar os endpoint criados e aguarda as requições
//Pelo protocolo HTTP na porta 8080
app.listen(8080, function () {
  console.log("Servidor aguardando requisições na porta 8080");
});
