"use strict";

//Importação do json
const alunos = require("../jsons/alunos.js");

// Função que retorna todos os alunos com todas as informações referentes aqueles alunos,
// sem as informações referente ao curso do aluno, somente com as informações dos alunos em si
const getTodosAlunosEscola = function () {
  return alunos.alunos;
};

// Exportando função
module.exports = {
  getTodosAlunosEscola,
};
