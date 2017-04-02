#pragma once

#include <iostream>
#include <vector>
#include <cstdlib>
#include <fstream>
#include <Windows.h>
#include <conio.h>

#include "defs.h"
#include "Cliente.h"
#include "Produto.h"


using namespace std;


void mensagem_erro(string mensagem, bool sucesso);
void wait();
void clearScreen();
void titulo(string mensagem);

bool CheckExistence(string filename);

unsigned short int leUnsignedShortInt(unsigned short int min, unsigned short int max);
unsigned int le_id(vector<Cliente> &clientes, bool inverse, string error_msg, string extra_msg, unsigned int excepcao);
Data le_data(int id, vector<Cliente> &clientes);
string le_nome(vector<Cliente> &clientes);

int find_name(string nome, vector<Cliente> &clientes);
int find_id(unsigned int id, vector <Cliente> &clients);
int find_id_with_name(string nome, vector <Cliente> &clientes);
int find_product(string product, vector <Produto> &produtos);


bool is_leap(unsigned int ano);
bool is_valid_day(unsigned int dia, unsigned int mes, unsigned int ano);
bool is_valid_id(unsigned int id, vector<Cliente> &clientes, unsigned int excepcao);

vector<string>string2vector(string line);
string vector2string(vector<string> &prods);
string to_string_special(unsigned int num);
vector<string>le_prods(vector<Produto> &produtos);
