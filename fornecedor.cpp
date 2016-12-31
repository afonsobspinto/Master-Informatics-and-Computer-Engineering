#include <iostream>
#include "fornecedor.h"

using namespace std;

Fornecedor::Fornecedor(string nome, int nif,string password, string morada,
		vector<Imovel*> ofertas) {
	unsigned int size=ofertas.size();

	this->nome = nome;
	this->nif = nif;
	this->password = password;
	this->morada = morada;
	this->ofertas = ofertas;
}

string Fornecedor::getNome() const {
	return nome;
}

string Fornecedor::getMorada() const {
	return morada;
}

vector<Imovel*> Fornecedor::getOfertas() const {
	return ofertas;
}

int Fornecedor::getNif() const {
	return nif;
}

bool Fornecedor::adicionaOferta(Imovel* novo) {

	ofertas.push_back(novo);

	return true;
}

std::string Fornecedor::getPassword() const {
	return password;
}

std::vector<Imovel*>* Fornecedor::getOfertasRef() {
	return &ofertas;
}
