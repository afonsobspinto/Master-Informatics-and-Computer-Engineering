
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
#include "fatura.h"


class Broker{

	Cliente *UserC;
	Fornecedor *UserF;
	Fatura *Fat;

	std::string nome;
	std::string ficheiroClientes;
	std::string ficheiroFornecedores;
	std::vector<Registado>clientes;
	std::vector<Imovel*>montra;
	std::vector<Fornecedor>fornecedores;
	float receita;


	std::vector<Registado>leFicheiroClientes();
	std::vector<Fornecedor> leFicheiroFornecedores();

public:
	Broker(std::string nome);
	Broker(std::string nome, std::string ficheiroClientes, std::string ficheiroFornecedores, float receita);

	std::vector<Registado>getClientes()const;
	std::vector<Imovel*>getMontra()const;
	std::vector<Fornecedor>getFornecedores()const;
	float getReceita()const;


	bool atualizaInativos(); //Atualiza as moradas dos clientes inativos
	bool adicionaCliente();
	bool validaLoginCliente();
	bool validaLoginFornecedor();
	bool adicionaFornecedor();
	bool adicionaImovel(Fornecedor *F);
	bool atualizaMontra();
	bool efectuaReserva(Cliente* C, Imovel* I);
	bool cancelaReserva();
	/*
	 * Ordena Clientes Por Valor
	 *
	 */


	bool verOfertas() const;

	bool mostraMontra(bool localidade = false, bool preco = false, bool datas = false);
	Imovel* mostraMontraAux();
	Imovel* mostraMontraAux(std::string localidade);
	Imovel* mostraMontraAux(std::string localidade, Data inicio, Data fim);
	Imovel* mostraMontraAux(float precoMax);
	Imovel* mostraMontraAux(float precoMax, Data inicio, Data fim);
	Imovel* mostraMontraAux(std::string localidade, float precoMax);
	Imovel* mostraMontraAux(std::string localidade, float precoMax, Data inicio, Data fim);
	Imovel* mostraMontraAux(Data inicio, Data fim);


	void guardaClientes();
	void guardaFornecedores();
	void guardaBase();

	Cliente *getUserC();
	Fornecedor *getUserF();

	////MENUS///

	bool opcoesIniciais();

	bool menuClienteInicial();
	bool menuOpcoesCliente();
	bool menuEfectuaReserva();

	void classificacao();

	bool menuFornecedorInicial();
	bool menuOpcoesFornecedor();

};


#endif /* BROKER_H_ */
