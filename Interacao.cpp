#include "Interacao.h"
#include "utils.h"
#include <iostream>


using namespace std;



Cliente criaCliente(){
	string nome = leNome();
	Cliente C (nome);
	return C;
}

Fornecedor criaFornecedor() {
	string nome = leNome();
	string morada = leNome(); // Tem as mesmas restrições

}
