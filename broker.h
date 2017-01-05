
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
#include <unordered_set>
#include "BST.h"
#include "reserva.h"

struct clienteHash {

	int operator() (const ClientePtr & c1) const
	{
		unsigned sum = 0;

		for(auto i=0; i<c1.cliente->getNome().size(); i++)
			sum+=(int)c1.cliente->getNome()[i];

		return sum%127;
	}

	bool operator()(const ClientePtr & c1, const ClientePtr & c2) const {
		return c1.cliente->getNome() == c2.cliente->getNome();
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

	typedef std::unordered_set<ClientePtr, clienteHash, clienteHash> tabH;
	typedef std::priority_queue<Imovel, vector <Imovel *>, CompImovel> pQueue;

	std::string nome;
	std::string ficheiroClientes;
	std::string ficheiroFornecedores;
	std::vector<Registado>clientes;
	std::vector<Imovel*>montra;
	std::vector<Fornecedor>fornecedores;
	BST<Reserva> historico;
	pQueue imoveis;
	tabH inativos;
	float receita;
	std::vector<Registado>leFicheiroClientes();
	std::vector<Fornecedor> leFicheiroFornecedores();

public:

	//CONSTRUTORES//

	Broker(std::string nome);
	Broker(std::string nome, std::string ficheiroClientes, std::string ficheiroFornecedores, float receita);

	//GETTERS//

	std::vector<Registado>getClientes()const;
	std::vector<Imovel*>getMontra()const;
	std::vector<Fornecedor>getFornecedores()const;
	float getReceita()const;
	BST<Reserva> getHistorico() const;
	Cliente *getUserC();
	Fornecedor *getUserF();


	//CLIENTES//

	bool adicionaCliente();
	void removeCliente();
	bool validaLoginCliente();

	void adicionaInativo(Cliente *c); //Insere o cliente nos inativos se a sua ultima data foi ha mais de 30 dias
	bool seInativo(const ClientePtr & cptr); // Ve se o cliente c est� nos inativos
	void atualizaInativos(); //Atualiza as moradas dos clientes inativos
	void verInativos(); // Mostra os clientes Inativos para efeitos de envio de publicidade
	bool atualizaInformacao();
	bool atualizaUltima();

	//FORNECEDORES//

	bool validaLoginFornecedor();
	bool adicionaFornecedor();
	bool adicionaImovel(Fornecedor *F);
	bool removeImovel();
	bool atualizaMontra();
	void atualizaPrioridade();


	//RESERVAS//

	bool efectuaReserva(Cliente* C, Imovel* I);
	bool cancelaReserva();
	bool adicionaReserva(const Reserva &reserva);
	bool removeReserva(const Reserva &reserva);
	bool atualizaArvore();


	//FILE MANAGER//
	void guardaClientes();
	void guardaFornecedores();
	void guardaBase();


	////MENUS///
	bool opcoesIniciais();
	bool menuClienteInicial();
	bool menuOpcoesCliente(int convidado);
	bool menuEfectuaReserva();
	bool menuFornecedorInicial();
	bool menuOpcoesFornecedor();
	bool menuOutros();


	///LISTAGENS///

	void classificacao();
	void verImoveisInativos() const;
	bool verOfertas() const;
	void verHistorico() const;

	bool mostraMontra(bool localidade = false, bool preco = false, bool datas = false);
	Imovel* mostraMontraAux();
	Imovel* mostraMontraAux(std::string localidade);
	Imovel* mostraMontraAux(float precoMax);
	Imovel* mostraMontraAux(std::string localidade, float precoMax, Data inicio, Data fim);
	Imovel* mostraMontraAux(Data inicio, Data fim);
	//Imovel* mostraMontraAux(std::string localidade, Data inicio, Data fim);
	//Imovel* mostraMontraAux(float precoMax, Data inicio, Data fim);
	//Imovel* mostraMontraAux(std::string localidade, float precoMax);

};


#endif /* BROKER_H_ */
