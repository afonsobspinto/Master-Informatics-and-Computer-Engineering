#include "Data.h"
#include "utils.h"

Data::Data(unsigned int dia, unsigned int mes, unsigned int ano) {
	this->dia=dia;
	this->mes=mes;
	this->ano=ano;
}

bool Data::operator ==(Data& rhs) {
	if(this->ano == rhs.ano)
		if(this->mes == rhs.dia)
			if(this->dia==rhs.dia)
				return true;
	return false;
}

bool Data::operator <(Data& rhs) {
	if (this->ano<rhs.ano)
		return true;
	if(this->ano>rhs.ano)
		return false;
	if(this->mes < rhs.mes)
		return true;
	if(this->mes > rhs.mes)
		return false;
	if(this-> dia < rhs.dia)
		return true;
	return false;
}

bool Data::operator +=(int n) {
/*	dia+=n;
	const int dias_mes[ ] = {0, 31, 28, 31, 30, 31, 30 , 31, 31 , 30, 31, 30, 31};
	if (mes == 2){
		if(is_leap(ano))
			dias_mes[2] = 29;
	}
	if (dia == dias_mes[mes]) {// is it last day of the month?
		dia = 1;
		mes = mes % 12 + 1;
	}
	else dia++;
*/
}
