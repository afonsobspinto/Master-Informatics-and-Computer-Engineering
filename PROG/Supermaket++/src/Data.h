# pragma once


#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <iomanip>
#include <ctime>

using namespace std;


class Data {
 private:
  int dia;
  int mes;
  int ano;

 public:
  Data(){};
  Data(string data);
  int getDia() const;
  int getMes() const;
  int getAno() const;
  void setDia(int dia);
  void setMes(int mes);
  void setAno(int ano);
  friend ostream& operator<<(ostream& out, const Data & data);
  friend bool operator<(const Data &data1, const Data &data2);
  friend bool operator==(const Data &data1, const Data &data2);
};


