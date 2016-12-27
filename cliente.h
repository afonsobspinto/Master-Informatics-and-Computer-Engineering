#ifndef CLIENTE_H_
#define CLIENTE_H_

#include "data.h"
#include <string>
#include <vector>


class Cliente{
	std::string nome;
	float valor;
	static unsigned int counter;
public:
	Data ultima; // Data em que o cliente realizou a ultima reserva
	Cliente(){};
	Cliente(std::string nome);
	Cliente(std::string nome, int pontos, float valor);
	std::string getNome() const;
	float getValor() const;
	Data getUltima() const;
	static unsigned int getTotalClientes();
	virtual void setPontos(int pontos);
	void addValor(int preco);
	bool operator < (const Cliente & rhs);
    bool operator == (const Cliente & rhs);

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
