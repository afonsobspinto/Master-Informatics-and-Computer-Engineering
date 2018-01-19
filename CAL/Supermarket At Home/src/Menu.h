/*
 * Menu.h
 *
 *  Created on: Mar 29, 2017
 *      Author: root
 */

#ifndef MENU_CPP_
#define MENU_CPP_

#include <iostream>
#include <sstream>

using namespace std;

void clearScreen() {

#ifdef __unix__                    /* __unix__ is usually defined by compilers targeting Unix systems */

	system("clear");

#elif defined(_WIN32) || defined(WIN32)     /* _Win32 is usually defined by compilers targeting 32 or   64 bit Windows systems */

	system("cls");

#endif

}


bool is_number(const string& s)
{
	long double num;
	istringstream iss(s);
	return !(iss >> num).fail();
}


unsigned short int readUnsignedShortInt(unsigned short int min, unsigned short int  max){
	string opcao_str;
	unsigned int opcao;

	getline(cin, opcao_str);

	try{
		if(!is_number(opcao_str))
			throw 1;
	}
	catch (exception &e) {
		cout << "Apanhou excecao. Introduziu um valor invalido" << endl;
		return 0;
	}

	opcao = stoi(opcao_str);

	try{
		if(opcao < min || opcao > max)
			throw 1;
	}
	catch (exception &e) {
		cout << "Apanhou excecao. "<< opcao << " não se encontra entre as opções." << endl;
		return 0;
	}

	return opcao;

}

void showClients(SuperMarketChain S){
	for (unsigned int i=0; i< S.getClients().size();i++)
		cout << i+1 << ". " << S.getClients().at(i)->getName() << endl;
	getchar();
}

void showSupermarkets(SuperMarketChain S){
	for (unsigned int i=0; i< S.getSupermarkets()->size();i++)
		cout << i+1 << ". " << S.getSupermarkets()->at(i)->getName() << endl;
	getchar();
}

void showUnreachable(SuperMarketChain S){
	for(unsigned int i=0; i< S.getUnreachableClients().size();i++)
		cout << i+1 << ". " << S.getUnreachableClients().at(i)->getName() << endl;
	getchar();
}

void showUseless(SuperMarketChain S){
	for(unsigned int i=0; i< S.getUnneededSupermarkets().size();i++)
			cout << i+1 << ". " << S.getUnneededSupermarkets().at(i)->getName() << endl;
	getchar();
}

void searchRoadsExact(SuperMarketChain S){
	string r1, r2;
	cout << "Insert the first road's name: ";
	getline(cin, r1);
	cout << "Insert the second road's name: ";
	getline(cin, r2);


	S.exactSearch(r1, r2);

	getchar();
}

void searchSupermaketExact(SuperMarketChain S){
	string s;
	cout << "Insert the supermarket name: ";
	getline(cin, s);

	S.exactSearch(s);

	getchar();
}

void searchApproxRoads(SuperMarketChain S){
	string r1, r2;
	cout << "Insert the first road's name: ";
	getline(cin, r1);
	cout << "Insert the second road's name: ";
	getline(cin, r2);

	S.approxSearch(r1, r2);

	getchar();
}

void searchApproxSupermarket(SuperMarketChain S){
	string s;
	cout << "Insert the supermarket name: ";
	getline(cin, s);

	S.approxSearch(s);

	getchar();
}


bool stringMatchingOptions(SuperMarketChain S){

	int option;

	while(1){
		clearScreen();
		cout << "String Matching: " << endl;
		cout << endl;
		cout << "   " << "1 - Road Names" << endl;
		cout << "   " << "2 - Supermarkets" << endl;
		cout << "   " << "3 - Back" << endl << endl;
		cout << "   " << "What's your option: ";
		option = readUnsignedShortInt(1, 3);

		switch (option){
		case 1:{
			searchRoadsExact(S);
			break;}
		case 2:{
			searchSupermaketExact(S);
			break;}
		case 3:{
			return true;
		}
		default:{
			continue;}
		}
	}

}

bool approximateStringMatchingOptions(SuperMarketChain S){

	int option;

	while(1){
		clearScreen();
		cout << "Approximate String Matching: " << endl;
		cout << endl;
		cout << "   " << "1 - Road Names" << endl;
		cout << "   " << "2 - Supermarkets" << endl;
		cout << "   " << "3 - Back" << endl << endl;
		cout << "   " << "What's your option: ";
		option = readUnsignedShortInt(1, 3);

		switch (option){
		case 1:{
			searchApproxRoads(S);
			break;}
		case 2:{
			searchApproxSupermarket(S);
			break;}
		case 3:{
			return true;
		}
		default:{
			continue;}
		}
	}

}

bool mainOptions() {
	int option;
	SuperMarketChain S = SuperMarketChain();

	while(1){

		clearScreen();
		cout << "Menu: " << endl;
		cout << endl;
		cout << "   " << "1 - See the Graph" << endl;
		cout << "   " << "2 - Show Routes" << endl;
		cout << "   " << "3 - Study Routes" << endl;
		cout << "   " << "4 - See Clients" << endl;
		cout << "   " << "5 - See Supermarkets" << endl;
		cout << "   " << "6 - Show Strongly connected components" << endl;
		cout << "   " << "7 - Show useless Supermarkets" << endl;
		cout << "   " << "8 - String Matching" << endl;
		cout << "   " << "9 - Approximate String Matching" << endl;
		cout << "   " << "10 - Leave" << endl << endl;
		cout << "   " << "Choose your option: ";

		option = readUnsignedShortInt(1, 10);

		switch (option){
		case 1:{
			S.displayGraph();
			break;}
		case 2:{
			S.displayRoutes();
			break;}
		case 3:{
			S.studyRoutes();
			break;}
		case 4:{
			showClients(S);
			break;}
		case 5:{
			showSupermarkets(S);
			break;}
		case 6:{
			S.displaySCC();
			break;}
		case 7:{
			showUseless(S);
			break;}
		case 8:{
			stringMatchingOptions(S);
			break;}
		case 9:{
			approximateStringMatchingOptions(S);
			break;}
		case 10:{
			return true;}
		default:{
			continue;}
		}
	}
}

#endif /* MENU_CPP_ */
