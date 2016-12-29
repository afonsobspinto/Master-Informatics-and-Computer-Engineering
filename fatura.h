
#ifndef SRC_FATURA_H_
#define SRC_FATURA_H_

#include "BST.h"
#include "reserva.h"
#include "cliente.h"

class Fatura{
	BST<Reserva> historico;
public:
	Fatura() : historico(Reserva()){};
	BST<Reserva> getHistorico() const;
	void adicionaReserva(const Reserva &r); // Adiciona a reserva r ao historico de reservas
};

#endif /* SRC_FATURA_H_ */
