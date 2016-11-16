#ifndef DATA_H_
#define DATA_H_

class Data{
 unsigned int dia;
 unsigned int mes;
 unsigned int ano;

public:
  Data() {};
  Data(unsigned int dia, unsigned int mes, unsigned int ano);
  unsigned int getDia ()const;
  unsigned int getMes ()const;
  unsigned int getAno ()const;
  bool operator == (Data & rhs);
  bool operator < (Data & rhs); // Servirá para ordenar com o QuickSort
  Data operator - (int n);
  };

#endif /* DATA_H_ */
