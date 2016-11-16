#include <iostream>
#include "Data.h"
#include "utils.h"
#include <windows.h>

using namespace std;

Data::Data(unsigned int dia, unsigned int mes, unsigned int ano) {
	this->dia=dia;
	this->mes=mes;
	this->ano=ano;
}

unsigned int Data::getDia() const {
	return dia;
}

unsigned int Data::getMes() const {
	return mes;
}

unsigned int Data::getAno() const {
	return ano;
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

Data Data::operator - (int n) {   // Corrigir para n > 999999...
	unsigned int d = dia;
	unsigned int m = mes;
	unsigned int a = ano;
	int dias_mes[13] = {0, 31, 28, 31, 30, 31, 30 , 31, 31 , 30, 31, 30, 31};
	if(is_leap(a)){
		dias_mes[2] = 29;
	}
	for (unsigned int i=0; i < n; i++){
		if (d == 1){ // É o primeiro dia do mês?
			if (m == 1){ // É o primeiro mês do ano?
				m = 13;
				a -= 1;
			}
			d = dias_mes[m-1]+1;
			m = m-1;
		}
		d --;
		cout << d << "/" << m << "/" << a << endl;
	}
	Data D (d,m,a);
	return D;
}

