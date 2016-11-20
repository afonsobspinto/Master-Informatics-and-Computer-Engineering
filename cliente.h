#ifndef CLIENTES_H_
#define CLIENTES_H_

#include <string>

class Cliente{
	std::string nome;
	int pontos;
	float valor;
	static unsigned int counter;
public:
	Cliente(std::string nome);
	Cliente(std::string nome, int pontos, float valor);
	std::string getNome() const;
	int getPontos() const;
	float getValor() const;
	static unsigned int getTotalClientes();
	void setPontos(int pontos);
	void addValor(int preco);
	void subValor(int preco);

};

class Registado: public Cliente{
	std::string password;
public:
	Registado(std::string nome, std::string password);
	Registado(std::string nome, int pontos, float valor, std::string password);
	std::string getPassword() const;
};



#endif /* CLIENTES_H_ */
