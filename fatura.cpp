#include <iostream>
#include <string.h>

#include "fatura.h"

using namespace std;


BST<Reserva> Fatura::getHistorico() const {
	return historico;
}

void Fatura::adicionaReserva(Reserva r) {
	 historico.insert(r);
}
