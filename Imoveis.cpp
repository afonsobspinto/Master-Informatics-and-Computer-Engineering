#include "Imoveis.h";
#include <iostream>

using namespace std;


Imovel::Imovel(string localidade, vector<Data> indisponiveis) {
	this->localidade = localidade;
	this->reservas = indisponiveis;

	cout << "Construtor Imovel Chamado Com Sucesso!" << endl;
}

Hotel::Hotel(std::string localidade, std::vector<Data> indisponiveis,
		int cama, bool cama_extra):Imovel(localidade, indisponiveis) {
	this->cama=cama;
	this->cama_extra=cama_extra;
	setTipo("Hotel");

	cout << "Construtor Hotel Chamado Com Sucesso!" << endl;
}

Apartamento::Apartamento(std::string localidade,
		std::vector<Data> indisponiveis, int cama, bool suite, bool cozinha, bool sala_de_estar):Imovel(localidade, indisponiveis) {
	this->cama = cama;
	this->suite = suite;
	this->cozinha = cozinha;
	this->sala_de_estar=sala_de_estar;
	setTipo("Apartamento");

	cout << "Construtor Apartamento Chamado Com Sucesso!" << endl;
}

Flat::Flat(std::string localidade, std::vector<Data> indisponiveis):Imovel(localidade, indisponiveis) {
	setTipo("Flat");
	cout << "Construtor Flat Chamado Com Sucesso!" << endl;
}

SharedHouse::SharedHouse(std::string localidade,
		std::vector<Data> indisponiveis):Imovel(localidade, indisponiveis) {
	setTipo("SharedHouse");
	cout << "Construtor SharedHouse Chamado Com Sucesso!" << endl;
}

BB::BB(std::string localidade, std::vector<Data> indisponiveis):Imovel(localidade, indisponiveis) {
	setTipo("BB");
	cout << "Construtor BB Chamado Com Sucesso!" << endl;
}

void Imovel::setTipo(std::string tipo) {
	this->tipo = tipo;
}

std::string Imovel::getTipo() const {
	return tipo;
}
