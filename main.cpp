#include <iostream>
#include <fstream>
#include <string>

#include "broker.h"
#include "data.h"
#include "interacao.h"
#include "utils.h"
#include "imovel.h"


using namespace std;


int main() {

	string d = "42/04/2015";

	Data D = string2data(d);

	cout << D.getDia() << "/" << D.getMes() << "/" << D.getAno() << endl;

	return 0;

	string nome;
	string filename;
	fstream f;

	cout << "Bem-Vindo" << endl << endl;

	cout << "Broker: ";
	getline(cin, nome);

	filename = nome + ".txt";

	f.open(filename);

	if(f.is_open()){
		cout << "Carregando base de dados..." << endl;

		string ficheiroClientes;
		string ficheiroFornecedores;
		string receita_str;
		float receita;

		getline(f, nome);
		getline(f, ficheiroClientes);
		getline(f, ficheiroFornecedores);
		getline(f, receita_str);

		cout << nome << endl;
		cout << ficheiroClientes << endl;
		cout << ficheiroFornecedores << endl;
		cout << stof(receita_str) << endl;

		cout << endl << endl;

		f.close();

		Broker Existente(nome, ficheiroClientes, ficheiroFornecedores, stof(receita_str));

		cout << endl << endl << endl << endl;

		Cliente C = Cliente("Sansa", 20, 100);
		vector<Reserva> r;
		r.push_back(Reserva(Data(21,10,2016),Data(25,10,2016)));
		Imovel I = Imovel("localidade", 12, 12, 14, r);
		Data d1 = Data (15,10,2016);
		Data d2 = Data (23,10,2016);
		Existente.efectuaReserva(C, I, d1, d2);

//		cout << "Montra 1" << endl;
//		Existente.mostraMontra("localidade3");
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 2" << endl;
//
//		Existente.mostraMontra("localidade", d1, d2);
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 3" << endl;
//
//		Existente.mostraMontra(100);
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 4" << endl;
//
//		Existente.mostraMontra(100, d1, d2);
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 5" << endl;
//
//		Existente.mostraMontra("localidade", 100, d1, d2);


	}
	else{
		cout << "Gerando base de dados..." << endl;
		Broker Novo(nome);

		if(Novo.adicionaFornecedor())
			cout << "OK" << endl;
		if(Novo.adicionaFornecedor())
			cout << "OK" << endl;
		//Novo.adicionaCliente();
	}

	return 0;

}
