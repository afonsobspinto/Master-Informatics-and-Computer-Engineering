#include <iostream>
#include <string.h>

#include "fatura.h"

using namespace std;


BST<Reserva> Fatura::getHistorico() const {
	return historico;
}

void Fatura::adicionaReserva(const Reserva &r) {
	cout << "oi" << endl;
	 historico.insert(r);
	 cout << "oq " << endl;
}
