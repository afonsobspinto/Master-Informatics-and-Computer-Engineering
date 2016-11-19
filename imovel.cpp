#include <iostream>
#include "imovel.h"

using namespace std;

unsigned int Imovel::counter = 0;


Imovel::Imovel(string localidade, int owner, float preco, float taxa, vector<Reserva> indisponiveis) {
	this->localidade = localidade;
	this->owner = owner;
	this->preco = preco;
	this->reservas = indisponiveis;
	this->taxa = taxa;
	counter++;

	cout << "Construtor Imovel Chamado Com Sucesso!" << endl;
}


Hotel::Hotel(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis,
		int cama, bool cama_extra):Imovel(localidade, owner, preco, 10,  indisponiveis) {
	this->cama=cama;
	this->cama_extra=cama_extra;
	setTipo("Hotel");

	cout << "Construtor Hotel Chamado Com Sucesso!" << endl;
}

Apartamento::Apartamento(std::string localidade, int owner, float preco,
		std::vector<Reserva> indisponiveis, int cama, bool suite, bool cozinha, bool sala_de_estar):Imovel(localidade, owner, preco, 8, indisponiveis) {
	this->cama = cama;
	this->suite = suite;
	this->cozinha = cozinha;
	this->sala_de_estar=sala_de_estar;
	setTipo("Apartamento");

	cout << "Construtor Apartamento Chamado Com Sucesso!" << endl;
}


Flat::Flat(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 5, indisponiveis) {
	setTipo("Flat");
	cout << "Construtor Flat Chamado Com Sucesso!" << endl;
}

BB::BB(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 3, indisponiveis) {
	setTipo("BB");
	cout << "Construtor BB Chamado Com Sucesso!" << endl;
}

Shared::Shared(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 1, indisponiveis) {
	setTipo("Shared");
	cout << "Construtor Shared Chamado Com Sucesso!" << endl;
}

void Imovel::setTipo(std::string tipo) {
	this->tipo = tipo;
}

std::string Imovel::getTipo() const {
	return tipo;
}

float Imovel::getTaxa() const {         // Precos ainda random
	return taxa;
}

std::string Imovel::getLocalidade() const {
	return localidade;
}

unsigned int Imovel::getOwner() const {
	return owner;
}

float Imovel::getPreco() const {
	return preco;
}

std::vector<Reserva> Imovel::getReservas() const {
	return reservas;
}

bool Imovel::operator <(const Imovel& rhs) const {
	return this->getPreco()<rhs.getPreco();
}

int Hotel::getCama() const {
	return cama;
}

bool Hotel::getCama_extra() const {
	return cama_extra;
}

bool Apartamento::getSuite() const {
	return suite;
}

bool Apartamento::getCozinha() const {
	return cozinha;
}

bool Apartamento::getSala_de_estar() const {
	return sala_de_estar;
}

int Apartamento::getCama() const {
	return cama;
}

bool Imovel::getSuite() const {
	return false;
}

bool Imovel::getCozinha() const {
	return false;
}

bool Imovel::getSala_de_estar() const {
	return false;
}

int Imovel::getCama() const {
	return 0;
}

bool Imovel::getCama_extra() const {
	return false;
}
