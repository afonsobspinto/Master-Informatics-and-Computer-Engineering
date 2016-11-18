#include "Broker.h"
#include "Menus.h"
#include "Interacao.h"
#include "utils.h"
#include <iostream>

using namespace std;

Broker::Broker(std::string nome) {
	this->nome = nome;
	clientes = leFicheiroClientes();
	fornecedores = leFicheiroFornecedores();
	atualizaMontra();
}

vector<Registado> Broker::getClientes() const {
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

bool Broker::adicionaCliente() {
	unsigned int size = getClientes().size();
	Registado C = criaCliente();

	if(C.getNome()=="" || C.getPassword()=="")
		return false;

	for (unsigned int i = 0; i < size; i++){
		try{
			if(C.getNome() == getClientes().at(i).getNome()){
					throw UtilizadorJaExistente(C.getNome());
				}
			}
			catch (UtilizadorJaExistente &e) {
				cout << "Apanhou excecao." << e.getNome() << " já foi utilizado. \n";
				return false;
			}
	}

	clientes.push_back(C);
	return true;
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

bool Broker::cancelaReserva(Data& atual) {

}

vector<Imovel*> Broker::Pesquisa() {
}
