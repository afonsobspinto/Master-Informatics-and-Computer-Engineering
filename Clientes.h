#ifndef CLIENTES_H_
#define CLIENTES_H_

#include <string>

class Cliente{
	std::string nome;
	int pontos;
	int valor;
	static unsigned int counter;
public:
	Cliente(std::string nome);
	std::string getNome() const;
	static unsigned int getTotalClientes();

};

class Registado: public Cliente{
	std::string password;
public:
	Registado(std::string nome, std::string password);
	std::string getPassword() const;
};



#endif /* CLIENTES_H_ */
