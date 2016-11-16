#include "Broker.h"
#include "Menus.h"

using namespace std;

Broker::Broker(std::string nome) {
	this->nome = nome;
}

vector<Cliente> Broker::getClientes() const {
	return clientes;
}

vector<Imovel*> Broker::getMontra() const {
	return montra;
}

vector<Fornecedor> Broker::getFornecedores() const {
	return fornecedores;
}

float Broker::getReceita() const {
}

bool Broker::adicionaClientes() {
/*	Cliente C = criaCliente();

	clientes.push_back(C); */
}

bool Broker::adicionaFornecedor() {
/*	Fornecedor F = criaFornecedor();

	fornecedores.push_back(F);
	atualizaMontra();*/
}

bool Broker::adicionaImovel() {
/*	Imovel *I = criaImovel();

	montra.push_back(I);
	atualizaMontra();
	*/
}

bool Broker::atualizaMontra() {
	int size = fornecedores.size();
	vector<Imovel *> m;

	for (unsigned int i=0; i<size; i++){
		int fsize = fornecedores.at(i).getOfertas().size();
		for (unsigned int j=0; j<fsize; j++){
			m.push_back(fornecedores.at(i).getOfertas().at(j));
		}
	}
	if (montra == m)
		return false;
	else
		montra = m;
	return true;
}

bool Broker::efectuaReserva() {
}

void Broker::taxa() {
	int size = montra.size();

	for (unsigned int i=0; i < size; i++){
		receita += montra.at(i)->getTaxa();
	}
}

vector<Imovel*> Broker::Pesquisa() {
}
