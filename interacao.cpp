#include "utils.h"
#include <iostream>
#include "interacao.h"


using namespace std;


Imovel* criaImovel(){
	string localidade;
	string tipo;
	float preco;
	vector<Reserva>reservas;

	localidade = leString("Localidade: ");
	if(localidade == "")
			return 0;
	tipo = leTipo();
	if(tipo == "Voltar")
		return 0;
	preco = lePreco();
	if(preco < 0)
		return 0;
	reservas = leReservas();
}

Registado criaCliente(){
	string nome = leString("Nome: ");
	if(nome == "")
		return Registado("","");
	string password = lePassword();
	Registado C (nome, password);
	return C;
}

Fornecedor criaFornecedor() {
	string nome = leString("Nome: ");
	if(nome == "")
		return Fornecedor("",0,"");
	unsigned int nif = leNif();
	if(nif == 0)
		return Fornecedor("",0,"");
	string morada = leString("Morada: ");
	Fornecedor F (nome, nif, morada);

	return F;
}
