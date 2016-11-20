#ifndef DATA_H_
#define DATA_H_

const int diasMes[12] = {31, 28, 31, 30, 31, 30 , 31, 31 , 30, 31, 30, 31};

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
  bool operator < (Data & rhs);
  Data operator - (int n);
  friend long int operator - (Data &lhs, Data & rhs);
  };

#endif /* DATA_H_ */
