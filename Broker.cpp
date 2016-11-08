#include "Broker.h"
#include "Menus.h"

Broker::Broker(std::string nome) {
	this->nome = nome;
}

std::vector<Cliente> Broker::getClientes() const {
	return clientes;
}

std::vector<Imovel*> Broker::getMontra() const {
	return montra;
}

std::vector<Fornecedor> Broker::getFornecedores() const {
	return fornecedores;
}

float Broker::getReceita() const {
}

bool Broker::adicionaClientes() {
/*	Cliente C = criaCliente();

	clientes.push_back(C);
	atualizaMontra(); */
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
}

bool Broker::efectuaReserva() {
}

void Broker::taxa() {
	int size = montra.size();

	for (unsigned int i; i < size; i++){
		receita += montra.at(i)->getTaxa();
	}
}

std::vector<Imovel*> Broker::Pesquisa() {
}
