
#ifndef BROKER_H_
#define BROKER_H_

#include <vector>
#include "Clientes.h"
#include "Imoveis.h"
#include "Fornecedores.h"
#include "Data.h"

class Broker{
	std::string nome;
	std::vector<Cliente>clientes;
	std::vector<Imovel*>montra;
	std::vector<Fornecedor>fornecedores;
	float receita;
public:
	Broker(std::string nome);
	std::vector<Cliente>getClientes()const;
	std::vector<Imovel*>getMontra()const;
	std::vector<Fornecedor>getFornecedores()const;
	float getReceita()const;
	bool adicionaClientes(); //Verifica se o cliente existe, se nao adiciona-o
	bool adicionaFornecedor(); //Verifica se o fornecedor existe, se nao adiciona-o
	bool adicionaImovel(); //Verifica se o imovel ja existe (Ver Todos Os Fornecedores)
	bool atualizaMontra(); // Correr todos os fornecedores, todas as ofertas deles e colocar na montra.
	bool efectuaReserva(); //Ve se é possivel efetuar a reserva (já nao está ocupado) Se for cria reserva e dá pontos ao Cliente C. Ver Issue
	void taxa(); //Recebe a taxa dos fornecedores e coloca na receita.
	std::vector<Imovel*>Pesquisa(); //Para   realizar   uma   reserva,   o   utilizador   deverá   antes   poder   fazer   uma   consulta   das   ofertas   em   uma   determinada
																				//localidade   (cidade),   para   as   datas   pretendidas; <- É isto! Feature Extra: Permitir utilizar apenas 1 dos parametros (ou até 0 -> mostra montra toda);
};



#endif /* BROKER_H_ */
