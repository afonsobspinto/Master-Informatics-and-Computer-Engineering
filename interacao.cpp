#include "utils.h"
#include <iostream>
#include "interacao.h"


using namespace std;


Imovel* criaImovel(int owner){
	string localidade;
	string tipo;
	float preco;
	vector<Reserva>reservas;

	Imovel *Erro = new Imovel("",0,0,0);

	ClearScreen();
	localidade = leString("Localidade: ");
	if(localidade == "")
			return Erro;
	ClearScreen();
	tipo = leTipo();
	if(tipo == "Voltar")
		return Erro;
	ClearScreen();
	preco = lePreco("");
	if(preco < 0)
		return Erro;
	ClearScreen();
	reservas = leReservas(preco);
	if(tipo == "Apartamento"){
		bool suite;
		bool cozinha;
		bool sala_de_estar;
		int quartos;
		if(!leExtrasApartamento(&suite, &cozinha, &sala_de_estar, &quartos))
			return Erro;
		Imovel *I = new Apartamento(localidade, owner,preco, reservas,quartos,suite, cozinha, sala_de_estar);
		return I;
	}
	else if(tipo=="Hotel"){
		int cama;
		bool cama_extra;
		if(!leExtrasHotel(&cama, &cama_extra))
			return Erro;

		Imovel *I = new Hotel(localidade, owner, preco, reservas, cama, cama_extra);
		return I;
	}
	else if(tipo=="Flat"){
		Imovel *I = new Flat(localidade, owner , preco, reservas);
		return I;
	}

	else if(tipo=="BB"){
		Imovel *I = new BB(localidade, owner, preco, reservas);
		return I;
	}

	else if(tipo=="Shared"){
		Imovel *I = new Shared(localidade, owner, preco, reservas);
		return I;
	}
	else
		return Erro;
}

Registado criaCliente(){
	string nome = leString("Nome: ");
	if(nome == "")
		return Registado("","");
	string password = lePassword(true);
	Registado C (nome, password);
	return C;
}

Fornecedor criaFornecedor() {
	string nome = leString("Nome: ");
	if(nome == "")
		return Fornecedor("",0,"","");
	unsigned int nif = leNif();
	if(nif == 0)
		return Fornecedor("",0,"","");
	string password = lePassword(true);
	if(password == "")
		return Fornecedor("",0,"","");
	string morada = leString("Morada: ");
	Fornecedor F (nome, nif, password, morada);

	return F;
}
