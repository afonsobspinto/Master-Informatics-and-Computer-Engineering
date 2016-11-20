#ifndef FORNECEDORES_H_
#define FORNECEDORES_H_

#include <string>
#include <vector>

#include "imovel.h"

class Fornecedor{
	std::string nome;
	int nif;
	std::string password;
	std::string morada;
	std::vector<Imovel *> ofertas;
public:
	Fornecedor(){};
	Fornecedor(std::string nome, int nif, std::string password, std::string morada, std::vector<Imovel *> ofertas ={});
	std::string getNome() const;
	std::string getMorada() const;
	int getNif() const;
	std::vector<Imovel *> getOfertas() const;
	std::string getPassword() const;
	bool adicionaOferta(Imovel * novo); //É só adicionar. As condições já devem vir direitas do Broker.
	int setNif(int num);
};

#endif /* FORNECEDORES_H_ */
