#include "cliente.h"

unsigned int Cliente::counter = 0;

Cliente::Cliente(std::string nome) {
	this->nome = nome;
	pontos = 0;
	valor = 0;
	counter ++;
}

Cliente::Cliente(std::string nome, int pontos, float valor) {
	this->nome = nome;
	this->pontos = pontos;
	this->valor = valor;
}

std::string Cliente::getNome() const {
	return nome;
}

unsigned int Cliente::getTotalClientes(){
	return counter;
}

int Cliente::getPontos() const {
	return pontos;
}

float Cliente::getValor() const {
	return valor;
}

Registado::Registado(std::string nome, std::string password):Cliente(nome) {
	this->password = password;
}

Registado::Registado(std::string nome, int pontos, float valor,
		std::string password):Cliente(nome,pontos,valor) {
	this->password = password;
}

std::string Registado::getPassword() const {
	return password;
}

