#include "Interacao.h"
#include "utils.h"
#include <iostream>


using namespace std;



Registado criaCliente(){
	string nome = leNome(); //Retorna "" em caso de erro;
	string password = lePassword(); //Retorna "" em caso de erro;
	Registado C (nome, password);
	return C;
}

Fornecedor criaFornecedor() {
	/*string nome = leNome();
	string morada = leNome(); // Tem as mesmas restrições
	*/

}
