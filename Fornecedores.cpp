#include "Fornecedores.h"
#include <iostream>

using namespace std;

Fornecedor::Fornecedor(string nome, int nif, string morada,
		vector<Imovel*> ofertas) {
	unsigned int size=ofertas.size();

	this->nome = nome;
	this->nif = nif;
	this->morada = morada;
	this->ofertas = ofertas;

	cout << "Construtor Fornecedor Chamado Com Sucesso!" << endl;
}

string Fornecedor::getNome() const {
	return nome;
}

string Fornecedor::getMorada() const {
	return morada;
}

bool Fornecedor::adicionaOferta(Imovel* novo) {
	ofertas.push_back(novo);
	return true;
}
