
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
#include <tr1/unordered_set>


class Broker{

	Cliente *UserC;
	Fornecedor *UserF;
	Fatura *Fat;

	typedef std::tr1::unordered_set<Cliente> tabH;

	tabH inativos;

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


	bool addInativo(const Cliente & c); //Insere o cliente nos inativos se a sua ultima data foi ha mais de 30 dias
	bool seInativo(const Cliente & c); // Ve se o cliente c e inativo
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
	bool verHistorico() const; // Mostra o historico das reservas

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

	bool menuOutros();

};


#endif /* BROKER_H_ */
