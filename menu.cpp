#include "menu.h"
#include "broker.h"

using namespace std;

void opcoesIniciais() {
	unsigned int TAB;
	cout << "                     Menu" << endl;
	cout << endl;
	cout << "1. Entrar como Cliente" << endl;
	cout << "2. Entrar como Fornecedor" << endl;
	cout << "Qual a opção? " << endl;
	cin >> TAB;
	if (TAB == 1){
		opcoesGestaoClientes();
	}
	else if(TAB == 2){
		opcoesGestaoFornecedores();
	}
	else{
		cout << "Número Inválido" << endl;
		opcoesIniciais();
	}

}

void opcoesGestaoClientes() {
	unsigned int TAB;
	cout << "1. Login" << endl;
	cout << "2. Entrar como convidado" << endl;
	cout << "3. Registar" << endl;
	cout << "4. Voltar à página anterior" << endl;
	if (TAB == 1){
		//
		opcoesClientes();
	}
	else if(TAB == 2){
		//
		opcoesClientes();
	}
	else if(TAB == 3){
		// criaCliente();
		opcoesClientes();
	}
	else if (TAB == 4){
		opcoesIniciais();
	}
	else{
		cout << "Número Inválido" << endl;
		opcoesGestaoClientes();
	}
}

void opcoesGestaoFornecedores() {
	unsigned int TAB;
	cout << "1. Login" << endl;
	cout << "2. Registar" << endl;
	cout << "3. Voltar à página anterior" << endl;
	if (TAB == 1){
		// Entrar já registado
		opcoesFornecedores();
	}
	else if (TAB == 2){
        //criaFornecedor();
		opcoesFornecedores();
	}
	else if (TAB == 3){
		opcoesIniciais();
	}
	else{
		cout << "Número Inválido" << endl;
		opcoesGestaoFornecedores();
	}
}

void opcoesClientes() {
	unsigned int TAB;
	cout << "1. Ver Montra" << endl;
	cout << "2. Efetuar Reserva" << endl;
	cout << "3. Cancelar Reserva" << endl;
	cout << "4. Voltar à página anterior" << endl;
	if (TAB == 1){
		verMontra();
	}
	else if (TAB == 2){
		// efectuaReserva();
	}
	else if (TAB == 3){
		// cancelaReserva();
	}
	else if (TAB == 4){
		opcoesGestaoClientes();
	}
	else{
		cout << "Número Inválido" << endl;
		opcoesClientes();
	}
}

void opcoesFornecedores() {
	unsigned int TAB;
	cout << "1. Adicionar Imovel" << endl;
	cout << "2. Retirar Imovel" << endl;
	cout << "3. Voltar à página anterior" << endl;
	if (TAB == 1){
		//adicionaImovel();
	}
	else if (TAB == 2){
		// Falta retiraImovel();  ??
	}
	else if (TAB == 3){
		opcoesGestaoFornecedores();
	}
	else{
		cout << "Número Inválido" << endl;
		opcoesFornecedores();
	}
}

void verMontra() {
	unsigned int TAB;
	cout << "1. Ver todas as ofertas" << endl;
	cout << "2. Pesquisar por preço" << endl;
	cout << "3. Pesquisar por localicade" << endl;
	cout << "4. Pesquisar por data" << endl;
	cout << "5. Pesquisar por preço e localidade" << endl;
	cout << "6. Pesquisar por preço e data" << endl;
	cout << "7. Pesquisar por localidade e data" << endl;
	cout << "8. Pesquisar por preço, localidade e data" << endl;
	cout << "9. Voltar à pagina anterior" << endl;
	if (TAB == 1){
		//mostraMontra();
	}
	else if (TAB == 2){
		float preco;

		cout << "Qual o preço maximo das ofertas que deseja ver?" << endl;
		cin >> preco;

		// mostraMontra(preco);
	}
	else if (TAB == 3){
		string localidade;

		cout << "Qual a localidade das ofertas que deseja ver?" << endl;
		cin >> localidade;

		// mostraMontra(localidade);
	}
	else if (TAB == 4){
		Data data1, data2;

		cout << "Entre quais Datas deseja ver as ofertas?" << endl;
//		cin >> ;

		// mostraMontra(data1, data2);
	}
	else if (TAB == 5){
		float preco;
		string localidade;

		cout << "Qual o preco máximo das ofertas que deseja ver?" << endl;
		cin >> preco;
		cout << "Qual a localidade das ofertas que deseja ver?" << endl;
		cin >> localidade;

		// mostraMontra(localidade, preco);
	}
	else if (TAB == 6){
		float preco;
		Data data1, data2;

		cout << "Qual o preço máximo das ofertas que deseja ver?" << endl;
		cin >> preco;
		cout << "Entre quais Datas deseja ver as ofertas?" << endl;
//		cin >> ;

		// mostraMontra(preco, data1, data2);
	}
	else if (TAB == 7){
		string localidade;
		Data data1, data2;

		cout << "Qual a localidade das ofertas que deseja ver?" << endl;
		cin >> localidade;
		cout << "Entre quais Datas deseja ver as ofertas?" << endl;
//		cin >> ;

		// mostraMontra(localidade, data1, data2);
	}
	else if (TAB == 8){
		float preco;
		string localidade;
		Data data1, data2;

		cout << "Qual o preço máximo das ofertas que deseja ver?" << endl;
		cin >> preco;
		cout << "Qual a localidade das ofertas que deseja ver?" << endl;
		cin >> localidade;
		cout << "Entre quais Datas deseja ver as ofertas?" << endl;
//		cin >> ;

		// mostraMontra(localidade, preco, data1, data2);
	}
	else if (TAB == 9){
		opcoesClientes();
	}
	else{
		cout << "Número Inválido" << endl;
		opcoesFornecedores();
	}
}
