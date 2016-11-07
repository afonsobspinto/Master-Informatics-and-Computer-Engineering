#ifndef CLIENTES_H_
#define CLIENTES_H_

#include <string>

class Cliente{
	std::string nome;
	int pontos;
	static unsigned int counter;
public:
	Cliente(std::string nome);
	std::string getNome() const;
	static unsigned int getTotalClientes() const;
};


#endif /* CLIENTES_H_ */
