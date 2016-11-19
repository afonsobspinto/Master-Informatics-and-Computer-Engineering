#include "utils.h"
#include <iostream>
#include "interacao.h"


using namespace std;



Registado criaCliente(){
	string nome = leNome();
	if(nome == "")
		return Registado("","");
	string password = lePassword();
	Registado C (nome, password);
	return C;
}

Fornecedor criaFornecedor() {
	string nome = leNome();
	if(nome == "")
		return Fornecedor("",0,"");
	unsigned int nif = leNif();
	if(nif == 0)
		return Fornecedor("",0,"");
	string morada = leMorada();
	Fornecedor F (nome, nif, morada);

	return F;
}
