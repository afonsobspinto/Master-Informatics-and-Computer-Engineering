#include "Broker.h"

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
}

bool Broker::adicionaFornecedor() {
}

bool Broker::adicionaImovel(Fornecedor F) {
}

bool Broker::atualizaMontra() {
}

bool Broker::efectuaReserva(Imovel* I, Cliente C) {
}

void Broker::taxa() {
}

std::vector<Imovel*> Broker::Pesquisa(std::string localidade, Data inicio,
		Data fim) {
}
