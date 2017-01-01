#ifndef CLIENTE_H_
#define CLIENTE_H_

#include "data.h"
#include <string>
#include <vector>


class Cliente{
	std::string nome;
	float valor;
	static unsigned int counter;
	Data ultima; // Data em que o cliente realizou a ultima reserva
	bool atualizou;
public:
	Cliente(){};
	Cliente(std::string nome);
	Cliente(std::string nome, int pontos, float valor);
	std::string getNome() const;
	float getValor() const;
	Data getUltima() const;
	bool getAtualizou()const;
	void setAtualizou(bool status);
	void setUltima(Data ultima);
	virtual void setMorada(std::string morada);
	virtual std::string getMorada() const;
	static unsigned int getTotalClientes();
	virtual void setPontos(int pontos);
	void addValor(int preco);
	bool operator < (const Cliente & rhs);
    bool operator == (const Cliente & rhs);
};

class Registado: public Cliente{
	std::string morada;
	std::string password;
	int pontos;
public:
	Registado(std::string nome, std::string password, std::string morada);
	Registado(std::string nome, int pontos, float valor, std::string password, std::string morada);
	std::string getPassword() const;
	int getPontos() const;
	virtual std::string getMorada() const;
	virtual void setMorada(std::string morada);
	virtual void setPontos(int pontos);
	bool operator < (Registado & rhs);
};


struct ClientePtr{
	Cliente *cliente;
};

#endif /* CLIENTE_H_ */
