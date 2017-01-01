#include "cliente.h"
#include "reserva.h"


unsigned int Cliente::counter = 0;

/**
 * Construtor do Cliente
 */

Cliente::Cliente(std::string nome) {
	this->nome = nome;
	valor = 0;
	counter ++;
	setUltima(Data(0,0,0));
}

/**
 * Construtor do Cliente
 */

Cliente::Cliente(std::string nome, int pontos, float valor) {
	this->nome = nome;
	this->valor = valor;
	setUltima(Data(0,0,0));
}

/**
 * Retorna o nome do Cliente
 */

std::string Cliente::getNome() const {
	return nome;
}

/**
 * Retorna o número total de clientes
 */

unsigned int Cliente::getTotalClientes(){
	return counter;
}

/**
 * Retorna a quantia total que o cliente gastou
 */

float Cliente::getValor() const {
	return valor;
}

/**
 * Retorna a data da ultima vez que o cliente efetuou uma reserva
 */

Data Cliente::getUltima() const{
	return ultima;
}

/**
 * Construtor de um Cliente Registado
 */

Registado::Registado(std::string nome, std::string password, std::string morada):Cliente(nome) {
	this->password = password;
	pontos = 0;
	this->morada = morada;
}

/**
 * Construtor de um Cliente Registado
 */

Registado::Registado(std::string nome, int pontos, float valor, std::string password, std::string morada):Cliente(nome,pontos,valor) {
	this->password = password;
	this->pontos = pontos;
	this->morada = morada;
}

/**
 * Retorna a password do Cliente Registado
 */

std::string Registado::getPassword() const {
	return password;
}

/**
 * Adiciona o preco a quantia gasta pelo Cliente Registado
 */

void Cliente::addValor(int preco) {
	valor += preco;
}

/**
 * Compara os clientes por ordem alfabetica
 */

bool Cliente::operator <(const Cliente& rhs) {
	if (this->getNome() < rhs.getNome())
		return true;
	else
		return false;
}

/**
 * Retorna se o cliente foi atualizado ou nao
 */

bool Cliente::getAtualizou() const {
	return atualizou;
}

/**
 * Estabelece se o cliente foi atualizado ou nao
 */

void Cliente::setAtualizou(bool status) {
	atualizou=status;
}

/**
 * Verifica se os clientes sao iguais
 */

bool Cliente::operator ==(const  Cliente& rhs) {
	if (this->getNome() == rhs.getNome())
		return true;
	else
		return false;
}

/**
 * Estabelece os pontos do Cliente
 */

void Cliente::setPontos(int pontos) {
}

/**
 * Retorna os pontos do Cliente Registado
 */

int Registado::getPontos() const {
	return pontos;
}

/**
 * Estabelece os pontos do Cliente Registado
 */

void Registado::setPontos(int pontos) {
	this->pontos += pontos;
}

/**
 * Compara os Clientes Registados por pontos
 */

bool Registado::operator <(Registado& rhs) {
	if (this->pontos < rhs.getPontos())
		return true;
	else
		return false;
}

/**
 * Atualiza a ultima data em que o Cliente efetuou uma reserva
 */

void Cliente::setUltima(Data ultima) {
	this->ultima = ultima;
}

/**
 * Retorna a morada do Cliente Registado
 */

std::string Registado::getMorada() const {
	return morada;
}

/**
 * Retorna a morada do Cliente
 */

std::string Cliente::getMorada() const {
}

/**
 * Atualiza a morada do Cliente
 */

void Cliente::setMorada(std::string morada) {
}

/**
 * Atualiza a morada do Cliente Registado
 */

void Registado::setMorada(std::string morada) {
	this->morada = morada;
}
