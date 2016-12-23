#ifndef CLIENTE_H_
#define CLIENTE_H_

class Reserva;

#include "data.h"
#include <string>
#include <vector>
#include <tr1/unordered_set>

typedef std::tr1::unordered_set<unsigned> inativos;


class Cliente{
	std::string nome;
	float valor;
	static unsigned int counter;
	Data ultima; // Data em que o cliente realizou a ultima reserva
public:
	Cliente(){};
	Cliente(std::string nome);
	Cliente(std::string nome, int pontos, float valor);
	std::string getNome() const;
	float getValor() const;
	Data getUltima() const;
	static unsigned int getTotalClientes();
	virtual void setPontos(int pontos);
	void addValor(int preco);


};

class Registado: public Cliente{
	std::string password;
	int pontos;
public:
	Registado(std::string nome, std::string password);
	Registado(std::string nome, int pontos, float valor, std::string password);
	std::string getPassword() const;
	int getPontos() const;
	virtual void setPontos(int pontos);
	bool operator < (Registado & rhs);
};


#endif /* CLIENTE_H_ */
