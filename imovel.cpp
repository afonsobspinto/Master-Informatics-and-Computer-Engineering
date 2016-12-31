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
	this->setUltima();
	counter++;
}


Hotel::Hotel(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis,
		int cama, bool cama_extra):Imovel(localidade, owner, preco, 0.2, indisponiveis) {
	this->cama=cama;
	this->cama_extra=cama_extra;
	setTipo("Hotel");

}

Apartamento::Apartamento(std::string localidade, int owner, float preco,
		std::vector<Reserva> indisponiveis, int quartos, bool suite, bool cozinha, bool sala_de_estar):Imovel(localidade, owner, preco, 0.18, indisponiveis) {
	this->quartos = quartos;
	this->suite = suite;
	this->cozinha = cozinha;
	this->sala_de_estar=sala_de_estar;
	setTipo("Apartamento");
}


Flat::Flat(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 0.15, indisponiveis) {
	setTipo("Flat");
}

BB::BB(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 0.13, indisponiveis) {
	setTipo("BB");
}

Shared::Shared(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 1, indisponiveis) {
	setTipo("Shared");
}

void Imovel::setTipo(std::string tipo) {
	this->tipo = tipo;
}

std::string Imovel::getTipo() const {
	return tipo;
}

float Imovel::getTaxa() const {
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

std::vector<Reserva> *Imovel::getReservas() {
	return &reservas;
}

void Imovel::addReservas(Reserva & R) {
	reservas.push_back(R);
}

void Imovel::tirarReserva(Reserva& R) {
	unsigned int size = reservas.size();
	Data Ri = R.getInicio();
	Data Rf = R.getFinal();

	for (unsigned int i=0; i<size; i++){
		Data Di = reservas.at(i).getInicio();
		Data Df = reservas.at(i).getFinal();
		if ((Ri == Di) && (Rf == Df)){
			reservas.erase(reservas.begin()+i);
		}
	}
}

int Imovel::getQuartos() const {
	return 1;
}

Data Imovel::getUltima() const {
	return ultima;
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

int Apartamento::getQuartos() const {
	return quartos;
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

void Imovel::setUltima() {
	unsigned int size = this->getReservas()->size();

	if(size == 0){
		Data D = Data(00,00,0000);
		ultima = D;
		return;
	}


	ultima = this->getReservas()->at(0).getFinal();
	for(unsigned int i = 0; i < size; i++){
		if(!(this->getReservas()->at(i).getFinal()<ultima))
			ultima = this->getReservas()->at(i).getFinal();
	}
}
