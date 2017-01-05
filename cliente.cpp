#include "cliente.h"
#include "reserva.h"
#include "utils.h"


unsigned int Cliente::counter = 0;

Cliente::Cliente(std::string nome) {
	this->nome = nome;
	valor = 0;
	counter ++;
	setUltima(Data(0,0,0));
}

Cliente::Cliente(std::string nome, int pontos, float valor) {
	this->nome = nome;
	this->valor = valor;
	setUltima(Data(0,0,0));
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

}


Data Registado::getUltima() const{
	return ultima;
}

Registado::Registado(std::string nome, std::string password, std::string morada):Cliente(nome) {
	this->password = password;
	pontos = 0;
	this->morada = morada;
	this->ultima = string2data("00/00/0000");
}

Registado::Registado(std::string nome, int pontos, float valor, std::string password, std::string morada, Data ultima):Cliente(nome,pontos,valor) {
	this->password = password;
	this->pontos = pontos;
	this->morada = morada;
	this->ultima = ultima;
}

std::string Registado::getPassword() const {
	return password;
}

void Cliente::addValor(int preco) {
	valor += preco;
}

bool Cliente::operator <(const Cliente& rhs) {
	if (this->getNome() < rhs.getNome())
		return true;
	else
		return false;
}

bool Cliente::getAtualizou() const {
	return atualizou;
}

void Cliente::setAtualizou(bool status) {
	atualizou=status;
}

bool Cliente::operator ==(const  Cliente& rhs) {
	if (this->getNome() == rhs.getNome())
		return true;
	else
		return false;
}

void Cliente::setPontos(int pontos) {
}

int Registado::getPontos() const {
	return pontos;
}

void Registado::setPontos(int pontos) {
	this->pontos += pontos;
}


bool Registado::operator <(Registado& rhs) {
	if (this->pontos < rhs.getPontos())
		return true;
	else
		return false;
}

void Cliente::setUltima(Data ultima) {

}

void Registado::setUltima(Data ultima) {
	this->ultima = ultima;
}

std::string Registado::getMorada() const {
	return morada;
}

std::string Cliente::getMorada() const {
}

void Cliente::setMorada(std::string morada) {
}

void Registado::setMorada(std::string morada) {
	this->morada = morada;
}
