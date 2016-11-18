#include "Excecoes.h"
#include "utils.h"
#include "linux.h"
#include "defs.h"
#include "Reservas.h"
#include <sstream>
#include <iostream>
#include <fstream>
#include <istream>

using namespace std;

string getpass(const char *prompt, bool show_asterisk=true)
{
  const char BACKSPACE=127;
  const char RETURN=10;

  string password;
  unsigned char ch=0;

  cout <<prompt;

  while((ch=getch())!=RETURN)
    {
       if(ch==BACKSPACE)
         {
            if(password.length()!=0)
              {
                 if(show_asterisk)
                 cout <<"\b \b";
                 password.resize(password.length()-1);
              }
         }
       else
         {
             password+=ch;
             if(show_asterisk)
                 cout <<'*';
         }
    }
  cout <<endl;
  return password;
}

string lePassword(){

	string password;
	string password_repeated;

	password = getpass("Password: ", true);
	password_repeated = getpass("Confirme Password: ", true);
	try{
		if(password != password_repeated){
			throw PasswordNaoCoincide();
		}
	}
	catch (PasswordNaoCoincide &e) {
		cout << "Apanhou excecao. Passwords Não Coincidem. \n";
		return "";
	}

    return password;
}

string leNome(){
	string nome;

	cout << "Nome: ";
	getline(cin, nome);

	try{
		if(is_number(nome))
			throw NomeIncorreto(nome);
	}
	catch (NomeIncorreto &e) {
		cout << "Apanhou excecao. Nome Invalido: " << e.getNome() << endl;
		return "";
	}

	return nome;
}

bool is_number(const string& s)
{
	double num;
	istringstream iss(s);
	return !(iss >> num).fail();
}

bool is_leap(unsigned int ano)
{
	if (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0))
		return true;

	return false;
}

bool is_valid_day(unsigned int dia, unsigned int mes, unsigned int ano)
{
	if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12)
		if (dia > 0 && dia <= 31)
			return true;
		else
			return false;
	else if (mes != 2)
		if (dia > 0 && dia <= 30)
			return true;
		else
			return false;
	else // mes == 2
		if (is_leap(ano))
			if (dia > 0 && dia <= 29)
				return true;
			else
				return false;
		else
			if (dia > 0 && dia <= 28)
				return true;
			else
				return false;
}

Data string2data(string data){
	unsigned int dia;
	unsigned int mes;
	unsigned int ano;

	dia = stoi(data.substr(0,2));
	mes = stoi(data.substr(3,2));
	ano = stoi(data.substr(6,4));

	cout << dia << "/" << mes << "/" << ano << endl;

	Data D(dia, mes, ano);

	return D;
}

std::vector<Fornecedor> leFicheiroFornecedores() {

	vector<Fornecedor>fornecedores;
	string linha;
	ifstream ficheiro(ficheiroFornecedores);
	unsigned int size;

	getline(ficheiro, linha);
	size = stoi(linha);


	cout << size << endl;

	string nome;
	int nif;
	string morada;

	string nif_str;

	string localidade;
	int owner;
	float preco;
	float taxa;
	string tipo;

	string preco_str;
	string taxa_str;

	string reservas;

	Data dataInicio;
	Data dataFim;

	string dataInicio_str;
	string dataFim_str;


	for (unsigned int i=0; i < size; i++){

		getline(ficheiro, nome, ';');
		getline(ficheiro, nif_str, ';');
		getline(ficheiro, morada, ';');

		nif = stoi(nif_str);
		owner = nif;
		morada = morada.substr(1, morada.length());

		cout << nome << endl;
		cout << nif << endl;
		cout << morada << endl;

		unsigned int ofertas;

		getline(ficheiro, linha, ';');
		ofertas = stoi(linha);


		cout << ofertas << endl;

		vector <Imovel*> imoveis;
		for (unsigned int j=0; j < ofertas; j++){


			getline(ficheiro, localidade, ';');
			getline(ficheiro, tipo, ';');
			getline(ficheiro, preco_str, ';');
			getline(ficheiro, taxa_str, ';');

			localidade = localidade.substr(1,localidade.length());
			tipo = tipo.substr(1,tipo.length());
			preco = stof(preco_str);
			taxa = stof(taxa_str);



			cout << localidade << endl;
			cout << tipo << endl;
			cout << preco << endl;
			cout << taxa << endl;

			unsigned int reservas_size;

			getline(ficheiro, linha, ';');
			reservas_size = stoi(linha);

			cout << reservas_size << endl;

			vector <Reserva> reservas;
			for (unsigned int k=0; k < reservas_size; k++){

				getline(ficheiro, dataInicio_str, ';');
				getline(ficheiro, dataFim_str, ';');

				dataInicio = string2data(dataInicio_str.substr(1, dataInicio_str.length()));
				dataFim = string2data(dataFim_str.substr(1, dataFim_str.length()));

				Reserva R(dataInicio, dataFim);
				reservas.push_back(R);
			}

			if(tipo == "Apartamento "){
				bool suite;
				bool cozinha;
				bool sala_de_estar;
				int cama;

				string suite_str;
				string cozinha_str;
				string sala_de_estar_str;
				string cama_str;

				getline(ficheiro, suite_str, ';');
				getline(ficheiro, cozinha_str, ';');
				getline(ficheiro, sala_de_estar_str, ';');
				getline(ficheiro, cama_str);


				suite = stoi(suite_str);
				cozinha = stoi(cozinha_str);
				sala_de_estar = stoi(sala_de_estar_str);
				cama = stoi(cama_str);

				cout << suite << endl;
				cout << cozinha << endl;
				cout << sala_de_estar << endl;
				cout << cama << endl;

				Imovel *I = new Apartamento(localidade, owner, preco, reservas, cama, suite, cozinha, sala_de_estar);
				imoveis.push_back(I);

			}

			else if (tipo == "Hotel "){
				int cama;
				bool cama_extra;

				string cama_str;
				string cama_extra_str;

				getline(ficheiro, cama_str, ';');
				getline(ficheiro, cama_extra_str);

				cama = stoi(cama_str);
				cama_extra = stoi(cama_extra_str);

				cout << cama_str << endl;
				cout << cama_extra_str << endl;

				Imovel *I = new Hotel(localidade, owner, preco, reservas, cama, cama_extra);
				imoveis.push_back(I);

			}
			else if(tipo=="Flat "){
				Imovel *I = new Flat(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else if(tipo=="BB "){
				Imovel *I = new BB(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else if(tipo=="Shared "){
				Imovel *I = new Shared(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else{
				cout << "erro na leitura" << endl; //Criar uma exceçao
			}

		}


		Fornecedor F(nome, nif, morada, imoveis);

		fornecedores.push_back(F);
	}

	return fornecedores;
}


std::vector<Registado> leFicheiroClientes() {
	vector<Registado>clientes;
	string linha;
	ifstream ficheiro(ficheiroClientes);
	unsigned int size;

	getline(ficheiro, linha);
	size = stoi(linha);

	string nome;
	int pontos;
	float valor;
	string password;
	string pontos_str;
	string valor_str;


	for (unsigned int i=0; i < size; i++){

		getline(ficheiro, nome, ';');
		getline(ficheiro, pontos_str, ';');
		getline(ficheiro, valor_str, ';');
		getline(ficheiro, password);

		pontos = stoi(pontos_str);
		valor = stof(valor_str);
		password = password.substr(1,password.length());

		cout << nome << endl;
		cout << pontos << endl;
		cout << valor << endl;
		cout << password << endl;

		Registado C(nome, pontos, valor, password);

		clientes.push_back(C);
	}

	return clientes;
}
