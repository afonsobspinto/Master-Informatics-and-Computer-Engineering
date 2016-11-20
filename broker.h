
#ifndef BROKER_H_
#define BROKER_H_

#include <vector>
#include <iostream>
#include <ostream>
#include <string>

#include "cliente.h"
#include "data.h"
#include "fornecedor.h"
#include "imovel.h"


class Broker{
	Cliente UserC;
	Fornecedor UserF;

	std::string nome;
	std::string ficheiroClientes;
	std::string ficheiroFornecedores;
	std::vector<Registado>clientes;
	std::vector<Imovel*>montra;
	std::vector<Fornecedor>fornecedores;
	float receita; // Recebe dinheiro das Taxas


	std::vector<Registado>leFicheiroClientes();
	std::vector<Fornecedor>leFicheiroFornecedores();
public:
	Broker(std::string nome);
	Broker(std::string nome, std::string ficheiroClientes, std::string ficheiroFornecedores, float receita);

	std::vector<Registado>getClientes()const;
	std::vector<Imovel*>getMontra()const;
	std::vector<Fornecedor>getFornecedores()const;
	float getReceita()const;
	Cliente getUserC()const;
	Fornecedor getUserF()const;

	bool adicionaCliente(); //Verifica se o cliente existe, se nao adiciona-o
	bool validaLoginCliente(std::string nome, std::string password);
	bool validaLoginFornecedor(int nif, std::string password);
	bool adicionaFornecedor(); //Verifica se o fornecedor existe, se nao adiciona-o
	bool adicionaImovel(Fornecedor *F); //Verifica se o imovel ja existe (Ver Todos Os Fornecedores)
	bool atualizaMontra(); // Correr todos os fornecedores, todas as ofertas deles e colocar na montra.
	bool efectuaReserva(Cliente C, Imovel I, Data D1, Data D2); //Ve se é possivel efetuar a reserva (já nao está ocupado) Se for cria reserva e dá pontos ao Cliente C. Ver Issue
	bool cancelaReserva(Cliente C, Imovel I, Reserva R, Data & atual); // Se a data atual for menor que limite100 ent�o recebe 100% do valor pago, se for menor que o limite50 recebe 50% do valor, se n�o, n�o recebe nada
	void taxa(); //Recebe a taxa dos fornecedores e coloca na receita, sempre que se aluga efetivamente.

	void mostraMontra();
	void mostraMontra(std::string localidade);
	void mostraMontra(std::string localidade, Data inicio, Data fim);
	void mostraMontra(float precoMax);
	void mostraMontra(float precoMax, Data inicio, Data fim);
	void mostraMontra(std::string localidade, float precoMax);
	void mostraMontra(std::string localidade, float precoMax, Data inicio, Data fim);
	void mostraMontra(Data inicio, Data fim);

	void guardaClientes();
	void guardaFornecedores();

};


#endif /* BROKER_H_ */
