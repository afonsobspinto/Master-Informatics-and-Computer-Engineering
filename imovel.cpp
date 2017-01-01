#include <iostream>
#include "imovel.h"

using namespace std;

unsigned int Imovel::counter = 0;

/**
 * Construtor de um Imovel
 */

Imovel::Imovel(string localidade, int owner, float preco, float taxa, vector<Reserva> indisponiveis) {
	this->localidade = localidade;
	this->owner = owner;
	this->preco = preco;
	this->reservas = indisponiveis;
	this->taxa = taxa;
	this->desconto = 0;
	this->setUltima();
	counter++;
}

/**
 * Construtor de um Hotel
 */

Hotel::Hotel(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis,
		int cama, bool cama_extra):Imovel(localidade, owner, preco, 0.2, indisponiveis) {
	this->cama=cama;
	this->cama_extra=cama_extra;
	setTipo("Hotel");

}

/**
 * Construtor de um Apartamento
 */

Apartamento::Apartamento(std::string localidade, int owner, float preco,
		std::vector<Reserva> indisponiveis, int quartos, bool suite, bool cozinha, bool sala_de_estar):Imovel(localidade, owner, preco, 0.18, indisponiveis) {
	this->quartos = quartos;
	this->suite = suite;
	this->cozinha = cozinha;
	this->sala_de_estar=sala_de_estar;
	setTipo("Apartamento");
}

/**
 * Construtor de um Flat
 */

Flat::Flat(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 0.15, indisponiveis) {
	setTipo("Flat");
}

/**
 * Construtor de um Bed­n­breakfast
 */

BB::BB(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 0.13, indisponiveis) {
	setTipo("BB");
}

/**
 * Construtor de um Shared House
 */

Shared::Shared(std::string localidade, int owner, float preco, std::vector<Reserva> indisponiveis):Imovel(localidade, owner, preco, 1, indisponiveis) {
	setTipo("Shared");
}

/**
 * Estabelece o tipo do Imovel
 */


void Imovel::setTipo(std::string tipo) {
	this->tipo = tipo;
}

/**
 * Retorna o tipo do Imovel
 */

std::string Imovel::getTipo() const {
	return tipo;
}

/**
 * Retorna a taxa do Imovel
 */

float Imovel::getTaxa() const {
	return taxa;
}

/**
 * Retorna a localidade do Imovel
 */

std::string Imovel::getLocalidade() const {
	return localidade;
}

/**
 * Retorna o dono do Imovel
 */

unsigned int Imovel::getOwner() const {
	return owner;
}

/**
 * Retorna o preco do Imovel
 */

float Imovel::getPreco() const {
	return preco;
}

/**
 * Retorna as reservas do Imovel
 */

std::vector<Reserva> *Imovel::getReservas() {
	return &reservas;
}

/**
 * Adiciona R as reservas do Imovel
 */

void Imovel::addReservas(Reserva & R) {
	reservas.push_back(R);
}

/**
 * Remove R das reservas do Imovel
 */

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

/**
 * Retorna o numero de quartos do Imovel
 */

int Imovel::getQuartos() const {
	return 1;
}

/**
 * Retorna a data da ultima vez que o Imovel foi reservado
 */

Data Imovel::getUltima() const {
	return ultima;
}

/**
 * Estabelece o preco do Imovel
 */

void Imovel::setPreco(float preco) {
	this->preco = preco;
}

/**
 * Atualiza os descontos do Imovel
 */

void Imovel::setDesconto(float desconto) {
	this->desconto = desconto;
}

/**
 * Retorna o desconto do Imovel
 */

float Imovel::getDesconto() const {
	return desconto;
}

/**
 * Compara dois Imoveis por preco
 */

bool Imovel::operator <(const Imovel& rhs) const {
	return this->getPreco()<rhs.getPreco();
}

/**
 * Retorna se o numero de camas do Hotel
 */

int Hotel::getCama() const {
	return cama;
}

/**
 * Retorna true se o Hotel possui cama adicional
 */

bool Hotel::getCama_extra() const {
	return cama_extra;
}

/**
 * Retorna true se o Apartamento possui suite
 */

bool Apartamento::getSuite() const {
	return suite;
}

/**
 * Retorna true se o Apartamento possui cozinha
 */

bool Apartamento::getCozinha() const {
	return cozinha;
}

/**
 * Retorna true se o Apartamento possui sala de estar
 */

bool Apartamento::getSala_de_estar() const {
	return sala_de_estar;
}

/**
 * Retorna o numero de quartos do Apartamento
 */

int Apartamento::getQuartos() const {
	return quartos;
}

/**
 * Retorna se possui suite
 */

bool Imovel::getSuite() const {
	return false;
}

/**
 * Retorna se possui cozinha
 */

bool Imovel::getCozinha() const {
	return false;
}

/**
 * Retorna se possui sala de estar
 */

bool Imovel::getSala_de_estar() const {
	return false;
}

/**
 * Retorna o numero de camas
 */

int Imovel::getCama() const {
	return 0;
}

/**
 * Retorna se possui cama adicional
 */

bool Imovel::getCama_extra() const {
	return false;
}

/**
 * Atualiza a ultima data em que o Imovel foi reservado
 */

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
