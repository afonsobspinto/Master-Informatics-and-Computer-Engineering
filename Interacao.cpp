#include "Interacao.h"
#include "utils.h"
#include <iostream>


using namespace std;



Cliente criaCliente(){
	string nome = leNome();
	string password = lePassword();
	Registado C (nome, password);
	return C;
}

Fornecedor criaFornecedor() {
	/*string nome = leNome();
	string morada = leNome(); // Tem as mesmas restrições
	*/

}
