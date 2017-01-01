#include <iostream>
#include "fornecedor.h"

using namespace std;

/*
 * Construtor de um Fornecedor
 */

Fornecedor::Fornecedor(string nome, int nif,string password, string morada,
		vector<Imovel*> ofertas) {
	unsigned int size=ofertas.size();

	this->nome = nome;
	this->nif = nif;
	this->password = password;
	this->morada = morada;
	this->ofertas = ofertas;
}

/*
 * Retorna o nome do Fornecedor
 */

string Fornecedor::getNome() const {
	return nome;
}

/*
 * Retorna a morada do Fornecedor
 */

string Fornecedor::getMorada() const {
	return morada;
}

/*
 * Retorna as ofertas do Fornecedor
 */

vector<Imovel*> Fornecedor::getOfertas() const {
	return ofertas;
}

/*
 * Retorna o NIF do Fornecedor
 */

int Fornecedor::getNif() const {
	return nif;
}

/*
 * Adiciona o Imovel as ofertas do Fornecedor
 */

bool Fornecedor::adicionaOferta(Imovel* novo) {

	ofertas.push_back(novo);

	return true;
}

/*
 * Retorna a password do Fornecedor
 */

std::string Fornecedor::getPassword() const {
	return password;
}

/*
 * Retorna as ofertas referenciadas
 */

std::vector<Imovel*>* Fornecedor::getOfertasRef() {
	return &ofertas;
}
