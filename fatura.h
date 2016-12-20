
#ifndef SRC_FATURA_H_
#define SRC_FATURA_H_

#include "BinaryTree.h"
#include "BST.h"
#include "reserva.h"

class Fatura{
	BST<Reserva> historico;
public:
	BST<Reserva> getHistorico() const;
	void adicionaReserva(Reserva r); // Adiciona a reserva r ao historico de reservas
};

#endif /* SRC_FATURA_H_ */
