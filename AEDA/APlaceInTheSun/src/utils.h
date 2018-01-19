
#ifndef UTILS_H_
#define UTILS_H_


#ifdef __unix__

    #include "linux.h"

#elif defined(_WIN32) || defined(WIN32)
    #include <windows.h>
    #include <conio.h>

#endif

#include <string>
#include <vector>
#include "quicksort.h"

#include "cliente.h"
#include "data.h"
#include "fornecedor.h"
#include "imovel.h"
#include "broker.h"


std::string random_string(size_t length);
const std::string currentDateTime();

std::string getpass(const char *prompt, bool show_asterisk=true);
std::string lePassword(bool confirmacao);
std::string leString(std::string msg);
unsigned int leNif();
std::string leTipo();
unsigned short int leUnsignedShortInt(unsigned short int min, unsigned short int  max);
float lePreco(std::string msg);
std::vector<Reserva>leReservas(float preco);
bool leExtrasApartamento(bool* suite, bool* cozinha, bool* sala_de_estar, int *camas);
bool leExtrasHotel(int* cama, bool* cama_extra);
Data leData(std::string msg);

Data string2data(std::string data);
std::string data2string(Data data);
std::string to_string_special(unsigned int num);

bool is_number(const std::string& s);
bool ano_bissexto(unsigned int ano);
bool data_valida(unsigned int dia, unsigned int mes, unsigned int ano);
bool dia_valido(unsigned int dia, unsigned int mes, unsigned int ano);
int countLeapYears(Data d);
bool dias_nao_sobrepostos(Data d1, Data d2, Data d3, Data d4);
bool swapDatas (Data *dataInicio, Data *dataFim);

bool ordenaMontra(Imovel* lhs, Imovel* rhs);
std::vector<Registado> ordenaClientes(std::vector<Registado> &clientes, bool HighestFirst = false);


void ClearScreen();


#endif /* UTILS_H_ */
