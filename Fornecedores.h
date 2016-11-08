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
	Fornecedor(std::string nome, int nif, std::string morada, std::vector<Imovel *> ofertas ={});
	std::string getNome() const;
	std::string getMorada() const;
	bool adicionaOferta(Imovel * novo); //É só adicionar. As condições já devem vir direitas do Broker.
};

#endif /* FORNECEDORES_H_ */
