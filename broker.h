
#ifndef BROKER_H_
#define BROKER_H_

#include <vector>
#include <iostream>
#include <ostream>
#include <string>
#include <queue>

#include "cliente.h"
#include "data.h"
#include "fornecedor.h"
#include "imovel.h"
#include "fatura.h"
#include <unordered_set>

struct clienteHash {

	int operator() (const Cliente & c1) const
		{
			return true;
		}

	bool operator()(const Cliente & c1, const Cliente & c2) const {
		return c1.getNome() == c2.getNome();
	}
};

struct CompImovel{
	bool operator()(Imovel* const i1, Imovel* const i2){
		return i2->getUltima() < i1->getUltima();
	}
};


class Broker{

	Cliente *UserC;
	Fornecedor *UserF;
	Fatura *Fat = {};

	typedef std::unordered_set<Cliente, clienteHash, clienteHash> tabH;


	tabH inativos; // Clientes Inativos
	std::priority_queue<Imovel, vector <Imovel *>, CompImovel> imoveis; // Imoveis Inativos

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

	bool adicionaCliente();
	void removeCliente();
	bool validaLoginCliente();
	bool validaLoginFornecedor();
	bool adicionaFornecedor();
	bool adicionaImovel(Fornecedor *F);
	bool removeImovel();
	bool atualizaMontra();
	bool efectuaReserva(Cliente* C, Imovel* I);
	bool cancelaReserva();

	/*
	 * Ordena Clientes Por Valor
	 *
	 */


	bool addInativo(const Cliente & c); //Insere o cliente nos inativos se a sua ultima data foi ha mais de 30 dias
	bool seInativo(const Cliente & c); // Ve se o cliente c est� nos inativos
	void atualizaInativos(); //Atualiza as moradas dos clientes inativos
	void verInativos() const; // Mostra os clientes Inativos para efeitos de envio de publicidade

	void atualizaPrioridade();
	void verImoveisInativos() const; // Mostra os imoveis inativos para efetuar descontos

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
	bool menuOpcoesCliente(int convidado);
	bool menuEfectuaReserva();

	void classificacao();

	bool menuFornecedorInicial();
	bool menuOpcoesFornecedor();

	bool menuOutros();

};


#endif /* BROKER_H_ */
