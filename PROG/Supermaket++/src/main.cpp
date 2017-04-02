#include <iostream>
#include <string>
#include <vector>

#include "Vende++.h"
#include "Menus.h"
#include "utils.h"




int main() {
	string loja, fichClients, fichProdutos, fichTransacoes;



	 //pede a informacoo sobre o nome da loja e os 3 ficheiros com
	 //informacoo de clientes, produtos e transacoes
	if (!infoInicial(loja, fichClients, fichProdutos, fichTransacoes))
	{
		mensagem_erro("Nome Invalido!", false);
		return(-1);
	}


	 //cria uma loja
	VendeMaisMais supermercado(loja, fichClients, fichProdutos, fichTransacoes);

	clearScreen();
	titulo("Informacao da loja " + loja + " do supermercado Vende++:");
	cout << supermercado << endl;  // mostra estatisticas da loja
	wait();

	opcoesIniciais(supermercado); // menu inicial com as grandes opcoes
	//							  // que implementam as funcioanlidades
	//							  // disonibilizadas

	return 0;

}
