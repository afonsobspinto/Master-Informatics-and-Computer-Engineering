#ifndef CLIENTE_H_
#define CLIENTE_H_

#include "reserva.h"
#include <string>
#include <vector>

class Cliente{
	std::string nome;
	float valor;
	static unsigned int counter;
public:
	Cliente(){};
	Cliente(std::string nome);
	Cliente(std::string nome, int pontos, float valor);
	std::string getNome() const;
	float getValor() const;
	static unsigned int getTotalClientes();
	virtual void setPontos(int pontos);
	virtual void addReserva(Reserva R);
	std::vector<Reserva>*getReservas();
	void addValor(int preco);
	void subValor(int preco);

};

class Registado: public Cliente{
	std::string password;
	int pontos;
	std::vector<Reserva> reservas;
public:
	Registado(std::string nome, std::string password);
	Registado(std::string nome, int pontos, float valor, std::string password);
	std::string getPassword() const;
	int getPontos() const;
	std::vector<Reserva>*getReservas();
	virtual void setPontos(int pontos);
	virtual void addReserva(Reserva R);
	bool operator < (Registado & rhs);
};



#endif /* CLIENTE_H_ */
