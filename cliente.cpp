#include "cliente.h"
#include "reserva.h"


unsigned int Cliente::counter = 0;

Cliente::Cliente(std::string nome) {
	this->nome = nome;
	valor = 0;
	counter ++;
}

Cliente::Cliente(std::string nome, int pontos, float valor) {
	this->nome = nome;
	this->valor = valor;
}

std::string Cliente::getNome() const {
	return nome;
}

unsigned int Cliente::getTotalClientes(){
	return counter;
}

float Cliente::getValor() const {
	return valor;
}

Data Cliente::getUltima() const{
	return ultima;
}
Registado::Registado(std::string nome, std::string password):Cliente(nome) {
	this->password = password;
	pontos = 0;
}

Registado::Registado(std::string nome, int pontos, float valor, std::string password):Cliente(nome,pontos,valor) {
	this->password = password;
	this->pontos = pontos;
}

std::string Registado::getPassword() const {
	return password;
}

void Cliente::addValor(int preco) {
	valor += preco;
}

void Cliente::setPontos(int pontos) {
}

void Cliente::addReserva(Reserva R) {
}

std::vector<Reserva>* Cliente::getReservas() {
}

void Cliente::subValor(int preco) {
	valor -= preco;
}

int Registado::getPontos() const {
	return pontos;
}

void Registado::setPontos(int pontos) {
	this->pontos += pontos;
}

void Registado::addReserva(Reserva R) {
	reservas.push_back(R);
}

std::vector<Reserva>* Registado::getReservas() {
	return &reservas;
}

bool Registado::operator <(Registado& rhs) {
	if (this->pontos < rhs.getPontos())
		return true;
	else
		return false;
}
