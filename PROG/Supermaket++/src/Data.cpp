#include "Data.h"

/*
Classe Data
@dataStr
*/

Data::Data(string dataStr){

	string dia_string, mes_string, ano_string;

	dia_string = dataStr.substr(0, dataStr.find_first_of('/'));
	mes_string = dataStr.substr(dataStr.find_first_of('/')+1, (dataStr.find_last_of('/') - 1) - (dataStr.find_first_of('/')));
	ano_string = dataStr.substr(dataStr.find_last_of('/') + 1, string::npos - 1);



	dia = stoi(dia_string);
	mes = stoi(mes_string);
	ano = stoi(ano_string);
}

int Data::getDia() const{
  return dia;
}

int Data::getMes() const{
  return mes;
}

int Data::getAno() const{
  return ano;
}

void Data::setDia(int dia_novo){
	dia = dia_novo;
}

void Data::setMes(int mes_novo){
	mes = mes_novo;
}

void Data::setAno(int ano_novo){
	ano = ano_novo;
}

/*
Overload de << para facilitar a visualizaçao da data na consola.
*/

ostream& operator<<(ostream& out, const Data & data){
  
	if (data.dia < 10)
		if(data.mes < 10)
			out << "0" << data.dia << "/"<< "0" << data.mes << "/" << data.ano;
		else
			out << "0" << data.dia << "/" << data.mes << "/" << data.ano;
	else if (data.mes < 10)
		out << data.dia << "/" << "0" << data.mes << "/" << data.ano;
	else
		out << data.dia << "/" << data.mes << "/" << data.ano;

	return out;
}

/*
Compara 2 datas e retorna verdadeiro se a primeira é mais recente que a segunda.
*/

bool operator<(const Data & data1, const Data & data2)
{

	if (data1.getAno()>data2.getAno())
		return true;
	else if (data1.getAno() < data2.getAno())
		return false;
	else if (data1.getMes() > data2.getMes())
		return true;
	else if (data1.getMes() < data2.getMes())
		return false;
	else if (data1.getDia() > data2.getDia())
		return true;
	else
		return false;
}

/*
Compara 2 datas e retorna verdadeiro se ambas forem iguais.
*/

bool operator==(const Data & data1, const Data & data2)
{
	if (data1.getAno() == data2.getAno())
		if (data1.getMes() == data2.getMes())
			if (data1.getDia() == data2.getDia())
				return true;
	return false;
}