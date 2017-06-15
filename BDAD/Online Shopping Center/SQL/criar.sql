.mode columns
.headers on

-- Apaga as tabelas caso existam

DROP TABLE IF EXISTS ENTREGA;
DROP TABLE IF EXISTS COMPRAPRODUTO;
DROP TABLE IF EXISTS COMPRA;
DROP TABLE IF EXISTS FUNCIONARIO;
DROP TABLE IF EXISTS ESPECIALIDADE;
DROP TABLE IF EXISTS ARMAZENADOS;
DROP TABLE IF EXISTS LOJA;
DROP TABLE IF EXISTS CLIENTE;
DROP TABLE IF EXISTS CODIGOPOSTAL;
DROP TABLE IF EXISTS PRODUTO;
DROP TABLE IF EXISTS CATEGORIA;

-- Cria tabelas

CREATE TABLE Categoria (
idCategoria NUMBER PRIMARY KEY,
nome NVARCHAR2(50) NOT NULL);

CREATE TABLE Produto (
codigo NUMBER PRIMARY KEY NOT NULL,
nome NVARCHAR2(50) NOT NULL,
custoUnitario NUMBER(9,3) CHECK (custoUnitario >= 0),
idCategoria NUMBER REFERENCES Categoria(idCategoria));

CREATE TABLE CodigoPostal (
codigoPostal CHAR(4) PRIMARY KEY NOT NULL,
localidade NVARCHAR2(30) NOT NULL);

CREATE TABLE Cliente (
nif NUMBER PRIMARY KEY CHECK (nif > 0),
nome NVARCHAR2(50) NOT NULL, 
email NVARCHAR2(50) NOT NULL,
genero NVARCHAR2(10),
telefone CHAR(9) CHECK (telefone > 0),
morada NVARCHAR2(50) NOT NULL,
codigoPostal CHAR(4) REFERENCES CodigoPostal(codigoPostal));

CREATE TABLE Loja (
idLoja NUMBER PRIMARY KEY,
morada NVARCHAR2(50) NOT NULL);

CREATE TABLE Armazenados (
codigo NUMBER NOT NULL REFERENCES Produto(codigo),
idLoja NUMBER REFERENCES Loja(idLoja),
quantidade NUMBER(7,0) CHECK (quantidade >= 0),
CONSTRAINT pk_armazenados PRIMARY KEY (codigo, idLoja));

CREATE TABLE Especialidade (
idEspecialidade NUMBER PRIMARY KEY,
nome NVARCHAR2(50) NOT NULL,
custoHorario NUMBER(9,3) CHECK (custoHorario >= 0));

CREATE TABLE Funcionario (
idFuncionario NUMBER PRIMARY KEY,
nome NVARCHAR2(50) NOT NULL,
morada NVARCHAR2(50) NOT NULL,
telefone CHAR(9),
idEspecialidade NUMBER REFERENCES Especialidade(idEspecialidade),
codigoPostal CHAR(4) REFERENCES CodigoPostal(codigoPostal));

CREATE TABLE Compra (
idCompra NUMBER PRIMARY KEY,
dataInicio DATE,
horaInicio HOUR,
dataFim DATE,
horaFim HOUR,
idFuncionario NUMBER REFERENCES Funcionario(idFuncionario),
nif NUMBER REFERENCES Cliente(nif));

CREATE TABLE CompraProduto (
idCompra NUMBER REFERENCES Compra(idCompra),
codigo NUMBER NOT NULL REFERENCES Produto(codigo),
quantidade NUMBER(7,0) CHECK (quantidade >= 0),
idLoja NUMBER REFERENCES Loja(idLoja),
CONSTRAINT pk_compra_produto PRIMARY KEY (idCompra, codigo));

CREATE TABLE Entrega (
idEntrega NUMBER PRIMARY KEY,
portes NUMBER(9,3) CHECK (portes > 0),
distancia NUMBER(9,3) CHECK (distancia > 0),
idCompra NUMBER REFERENCES Compra(idCompra),
idFuncionario NUMBER REFERENCES Funcionario(idFuncionario));
