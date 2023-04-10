"use strict";

// Função que filtra o aluno pela matricula

//Importação do json
const alunos = require("../jsons/alunos.js");

const getAlunoMatricula = function (matricula) {

  let alunoFiltradoMatricula; 
  
  alunoFiltradoMatricula = alunos.alunos.filter((aluno) => {
    return aluno.matricula == matricula;
  });

  return alunoFiltradoMatricula;

};

// Função que filtra os dados das disciplinas aluno pela sua matricula
const getDisciplinasAluno = function (matricula) {

  //array
  let disciplinasAluno = [];

  alunos.alunos.forEach((aluno) => {

    if (aluno.matricula == matricula) {aluno.curso.forEach((todosDadosCurso) => { 
        disciplinasAluno.push(todosDadosCurso.disciplinas);
      });
    }
  });

  return disciplinasAluno[0];
};

// Exportando funções
module.exports = {
  getAlunoMatricula,
  getDisciplinasAluno,
};
