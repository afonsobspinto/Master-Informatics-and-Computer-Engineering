#ifndef FORNECEDORES_H_
#define FORNECEDORES_H_

#include <string>
#include <vector>
#include "Imoveis.h"

class Fornecedor{
	std::string nome;
	int nif;
	std::string morada;
	std::vector<Imovel *> ofertas;
public:
	Fornecedor(std::string nome, int nif, std::string morada);
	std::string getNome() const;
	std::string getMorada() const;
};

#endif /* FORNECEDORES_H_ */
