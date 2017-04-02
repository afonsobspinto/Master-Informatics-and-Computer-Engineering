#pragma once

#include <iostream>
#include <fstream>
#include <string>
#include <limits>
#include <chrono>
#include <thread>


#include "defs.h"
#include "utils.h"
#include "Vende++.h"

using namespace std;

void frontpage();

bool infoInicial(string & loja, string & fichClients, string & fichProdutos, string & fichTransacoes);

void opcoesIniciais(VendeMaisMais & supermercado);

void opcoesGestaoClientes(VendeMaisMais & supermercado);

void opcoesGestaoTransacoes(VendeMaisMais & supermercado);

