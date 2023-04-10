"use strict";

//Importação do json
const alunos = require("../jsons/alunos.js");

// Função criada para retornar  uma lista de alunos com base curso e nos status atuais dos alunos
const getAlunosStatus = function (siglaCurso, statusEspecificoAluno) {

  // array
  let alunosFiltradosStatusAtual = [];

  alunos.alunos.forEach((alunoFiltrado) => {alunoFiltrado.curso.forEach((dadosCurso) => {
      if (alunoFiltrado.status == statusEspecificoAluno && dadosCurso.sigla == siglaCurso) {
        alunosFiltradosStatusAtual.push(alunoFiltrado);
      }
    });
  });
  
  return alunosFiltradosStatusAtual;

};

// Exportando função
module.exports = {
  getAlunosStatus,
};
