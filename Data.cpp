#include "Data.h"

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
