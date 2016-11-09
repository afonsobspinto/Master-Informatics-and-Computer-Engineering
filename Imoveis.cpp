#include "Imoveis.h";
#include <iostream>

using namespace std;


Imovel::Imovel(string localidade, int owner, unsigned int id, float preco, float taxa, vector<Reserva> indisponiveis) {
	this->localidade = localidade;
	this->owner = owner;
	this->id = id;
	this->preco = preco;
	this->reservas = indisponiveis;
	this->taxa = taxa;
	counter++;

	cout << "Construtor Imovel Chamado Com Sucesso!" << endl;
}


Hotel::Hotel(std::string localidade, int owner, unsigned int id, float preco, std::vector<Reserva> indisponiveis,
		int cama, bool cama_extra):Imovel(localidade, owner, id, preco, 10,  indisponiveis) {
	this->cama=cama;
	this->cama_extra=cama_extra;
	setTipo("Hotel");

	cout << "Construtor Hotel Chamado Com Sucesso!" << endl;
}

Apartamento::Apartamento(std::string localidade, int owner, unsigned int id, float preco,
		std::vector<Reserva> indisponiveis, int cama, bool suite, bool cozinha, bool sala_de_estar):Imovel(localidade, owner, id, preco, 8, indisponiveis) {
	this->cama = cama;
	this->suite = suite;
	this->cozinha = cozinha;
	this->sala_de_estar=sala_de_estar;
	setTipo("Apartamento");

	cout << "Construtor Apartamento Chamado Com Sucesso!" << endl;
}


Flat::Flat(std::string localidade, int owner, unsigned int id, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, id, preco, 5, indisponiveis) {
	setTipo("Flat");
	cout << "Construtor Flat Chamado Com Sucesso!" << endl;
}

BB::BB(std::string localidade, int owner, unsigned int id, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, id, preco, 3, indisponiveis) {
	setTipo("BB");
	cout << "Construtor BB Chamado Com Sucesso!" << endl;
}

Shared::Shared(std::string localidade, int owner, unsigned int id, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, id, preco, 1, indisponiveis) {
	setTipo("Shared");
	cout << "Construtor Shared Chamado Com Sucesso!" << endl;
}

void Imovel::setTipo(std::string tipo) {
	this->tipo = tipo;
}

std::string Imovel::getTipo() const {
	return tipo;
}

unsigned int Imovel::getID() const {
	return id;
}

float Imovel::getTaxa() const {         // Precos ainda random
	return taxa;
}


