
#ifndef UTILS_H_
#define UTILS_H_

//Aqui serão colocadas macros fixes. Caso sejam precisas.
// Ou Funçoes Auxiliares.

#include <string>
#include <vector>
#include "quicksort.h"

#include "cliente.h"
#include "data.h"
#include "fornecedor.h"
#include "imovel.h"

std::string getpass(const char *prompt, bool show_asterisk=true);
std::string lePassword();
std::string leString(std::string msg);
unsigned int leNif();
std::string leTipo();
unsigned short int leUnsignedShortInt(unsigned short int min, unsigned short int  max);
float lePreco();
std::vector<Reserva>leReservas(float preco);
bool leExtrasApartamento(bool* suite, bool* cozinha, bool* sala_de_estar, int *camas);
bool leExtrasHotel(int* cama, bool* cama_extra);

Data string2data(std::string data);
std::string data2string(Data data);
std::string to_string_special(unsigned int num);

bool is_number(const std::string& s);
bool ano_bissexto(unsigned int ano);
bool data_valida(unsigned int dia, unsigned int mes, unsigned int ano);
bool dia_valido(unsigned int dia, unsigned int mes, unsigned int ano);
int countLeapYears(Data d);
bool dias_sobrepostos(Data d1, Data d2, Data d3, Data d4);
bool swapDatas (Data *dataInicio, Data *dataFim);

std::vector<Imovel*> ordenaMontra(std::vector<Imovel*> &montra, bool HighestFirst = false);

void ClearScreen();


#endif /* UTILS_H_ */
