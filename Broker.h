
#ifndef BROKER_H_
#define BROKER_H_

#include <vector>
#include "Clientes.h"
#include "Imoveis.h"
#include "Fornecedores.h"
#include "Data.h"

class Broker{
	std::string nome;
	std::vector<Registado>clientes;
	std::vector<Imovel*>montra;
	std::vector<Fornecedor>fornecedores;
	float receita;
public:
	Broker(std::string nome);
	std::vector<Registado>getClientes()const;
	std::vector<Imovel*>getMontra()const;
	std::vector<Fornecedor>getFornecedores()const;
	float getReceita()const;
	bool adicionaCliente(); //Verifica se o cliente existe, se nao adiciona-o
	bool validaLogin(std::string nome, std::string password);
	bool adicionaFornecedor(); //Verifica se o fornecedor existe, se nao adiciona-o
	bool adicionaImovel(); //Verifica se o imovel ja existe (Ver Todos Os Fornecedores)
	bool atualizaMontra(); // Correr todos os fornecedores, todas as ofertas deles e colocar na montra.
	bool efectuaReserva(); //Ve se é possivel efetuar a reserva (já nao está ocupado) Se for cria reserva e dá pontos ao Cliente C. Ver Issue
	bool cancelaReserva(Data & atual); // Se a data atual for menor que limite100 ent�o recebe 100% do valor pago, se for menor que o limite50 recebe 50% do valor, se n�o, n�o recebe nada
	void taxa(); //Recebe a taxa dos fornecedores e coloca na receita.
	std::vector<Imovel*>Pesquisa(); //Para   realizar   uma   reserva,   o   utilizador   deverá   antes   poder   fazer   uma   consulta   das   ofertas   em   uma   determinada
																				//localidade   (cidade),   para   as   datas   pretendidas; <- É isto! Feature Extra: Permitir utilizar apenas 1 dos parametros (ou até 0 -> mostra montra toda);
};



#endif /* BROKER_H_ */
