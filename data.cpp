#include <iostream>
#include <string.h>

#include "data.h"
#include "utils.h"

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

bool Data::operator ==(const Data& rhs) {
	if(this->ano == rhs.ano)
		if(this->mes == rhs.dia)
			if(this->dia==rhs.dia)
				return true;
	return false;
}

bool Data::operator <(const Data& rhs) {
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

Data Data::operator - (int n) {
	unsigned int d = dia;
	unsigned int m = mes;
	unsigned int a = ano;
	int dias_mes[13] ={0,31, 28, 31, 30, 31, 30 , 31, 31 , 30, 31, 30, 31};
	// memcpy(dias_mes, diasMes,13*sizeof(int));
	if(ano_bissexto(a)){
		dias_mes[2] = 29;
	}
	for (unsigned int i=0; i < n; i++){
		if (d == 1){ // � o primeiro dia do m�s?
			if (m == 1){ // � o primeiro m�s do ano?
				m = 13;
				a -= 1;
			}
			d = dias_mes[m-1]+1;
			m = m-1;
		}
		d --;
		//cout << d << "/" << m << "/" << a << endl;
	}
	Data D (d,m,a);
	return D;
}

long int operator - (Data &lhs, Data & rhs) {


    long int n1 = lhs.getAno()*365 + lhs.getDia();

    for (int i=0; i<lhs.getMes() - 1; i++)
        n1 += diasMes[i];

    n1 += countLeapYears(lhs);

    long int n2 = rhs.getAno()*365 + rhs.getDia();
    for (int i=0; i<rhs.getMes() - 1; i++)
        n2 += diasMes[i];
    n2 += countLeapYears(rhs);

    return abs((n2 - n1));
}
