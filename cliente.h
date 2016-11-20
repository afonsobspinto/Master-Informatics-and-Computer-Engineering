#ifndef CLIENTE_H_
#define CLIENTE_H_

#include <string>

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
	void addValor(int preco);
	void subValor(int preco);

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
