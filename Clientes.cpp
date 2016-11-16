#include "Clientes.h"

unsigned int Cliente::counter = 0;

Cliente::Cliente(std::string nome) {
	this->nome = nome;
	pontos = 0;
	valor = 0;
	counter ++;

}

std::string Cliente::getNome() const {
	return nome;
}

unsigned int Cliente::getTotalClientes(){
	return counter;
}

Registado::Registado(std::string nome, std::string password):Cliente(nome) {
	this->password = password;
}
