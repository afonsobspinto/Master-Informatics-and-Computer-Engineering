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

	cout << "Construtor Fornecedor Chamado Com Sucesso!" << endl;
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

	cout << "Vou adicionar Oferta" << endl;
	cout << this->getOfertas().size() << endl;

	ofertas.push_back(novo);

	cout << "Adicionei Oferta" << endl;
	cout << this->getOfertas().size() << endl;

	cout << "O 1º elemento das ofertas é do tipo " << this->getOfertas().at(0)->getTipo() << endl;
	return true;
}

std::string Fornecedor::getPassword() const {
	return password;
}

