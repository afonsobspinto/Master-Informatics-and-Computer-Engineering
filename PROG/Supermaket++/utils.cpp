#include "utils.h"

/*
Retorna uma mensagem colorida a verde quando sucesso ou a vermelho no caso contrario
@mensagem
@sucesso
*/

void mensagem_erro(string mensagem, bool sucesso)
{
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

	cout << TAB;

	if (sucesso)
	{
		SetConsoleTextAttribute(hConsole, FOREGROUND_GREEN | FOREGROUND_INTENSITY); // Bright green text
		cout << mensagem << endl;
		SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE); // Back to normal white text
	}
	else
	{
		SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_INTENSITY); // Bright red text
		cout << mensagem << endl;
		SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE); // Back to normal white text
	}

}

/*
Aguarda ate uma tecla ser premida
*/

void wait()
{
	_getch();
}

/*
Limpa o ecrã da consola
*/

void clearScreen(){
	system("cls");
}

/*
Dá enfase a mensagem
@mensagem
*/

void titulo(string mensagem)
{

	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

	cout << endl << TAB_BIG;

	SetConsoleTextAttribute(hConsole, BACKGROUND_RED | BACKGROUND_GREEN | BACKGROUND_BLUE); // Highlight Text

	cout << mensagem << endl << endl;

	SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE); // Back to normal white text
}

/*
Verifica se um ficheiro existe
@filename
@Valor de Retorno da Função: verdadeiro caso exista, falso no caso contrario
*/

bool CheckExistence(string filename)
{
	fstream f;
	f.open(filename);

	return f.is_open();
}

/*
Lê um número inteiro sem sinal num determinado intervalo
@min
@max
@Valor de Retorno da Função: Inteiro valido escolhido pelo utilizador
*/

unsigned short int leUnsignedShortInt(unsigned short int min, unsigned short int  max){

	int option;
	bool fail;

	do {
		cout << TAB;
		cin >> option;
		fail = cin.fail();
		cin.clear();
		cin.ignore(numeric_limits<streamsize>::max(), '\n');
		if (fail || option < min || option > max)
			mensagem_erro("Valor Invalido", false);
	} while (fail || option < min || option > max);

	return option;
}

/*
Procura nome no vetor clientes
@nome
@clientes
@Valor de Retorno da Função: Indice do nome no vetor clientes ou -1 caso não encontre.
*/

int find_name(string nome, vector<Cliente> &clientes)
{
	for (size_t i = 0; i < clientes.size(); i++)
	{
		if (clientes.at(i).getNome() == nome)
			return i;
	}
	return -1;
}

/*
Verifica se determinado id é válido
@id
@clientes
@excepcao
@Valor de Retorno da Função: Retorna verdadeiro se id é valido, falso se não for
*/

bool is_valid_id(unsigned int id, vector<Cliente> &clientes, unsigned int excepcao)
{

	for (unsigned int i = 0; i < clientes.size(); i++)
	{
		if (id == clientes.at(i).getId() && id != excepcao) // excepcao e utilizado aquando a alteracao de um cliente
			return false;
	}
	return true;
}

/*
Questiona o utilizador por um id válido
@clientes
@inverse - Se verdadeiro procura um id existente, quando falso procura um id disponível
@error_msg - Mensagem a ser mostrada em caso de erro
@extra_msg 
@excepcao
@Valor de Retorno da Função: Retorna o id se for válido, falso se não.
*/

unsigned int le_id(vector<Cliente> &clientes, bool inverse, string error_msg, string extra_msg, unsigned int excepcao)
{
	int id;
	bool fail;

	if (!inverse)
	{
		do {
			cout << TAB << extra_msg << "ID: ";
			cin >> id;
			fail = cin.fail();
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			if (fail || !is_valid_id(id, clientes, excepcao) || id <= 0)
				mensagem_erro(error_msg, false);
			cout << endl;
		} while (fail || !is_valid_id(id, clientes, excepcao) || id <= 0);
	}
	else
	{
		do {
			cout << TAB << extra_msg << "ID: ";
			cin >> id;
			fail = cin.fail();
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			if (fail || is_valid_id(id, clientes, excepcao) || id <= 0)
				mensagem_erro(error_msg, false);
			cout << endl;
		} while (fail || is_valid_id(id, clientes, excepcao) || id <= 0);

	}
	return id;
}

/*
Procura o id de um cliente
@nome
@clientes
@Valor de Retorno da Função: Retorna o id de um cliente ou -1 caso não encontre
*/

int find_id_with_name(string nome, vector <Cliente> &clientes)
{
	unsigned int size = clientes.size();

	for (size_t i = 0; i < size; i++)
	{
		if (clientes.at(i).getNome() == nome)
			return clientes.at(i).getId();
	}
	return -1;
}

/*
Procura a posicao de um id no vetor clientes
@id
@clientes
@Valor de Retorno da Função: Retorna a posicao no vetor clientes ou -1 caso nao encontre.
*/

int find_id(unsigned int id, vector <Cliente> &clientes)
{

	unsigned int size = clientes.size();

	for (size_t i = 0; i < size; i++)
	{
		if (clientes.at(i).getId() == id)
			return i;
	}
	return -1;
}

/*
Questiona o utilizador por uma data válida
@id
@clientes
@Valor de Retorno da Função: Retorna uma data válida
*/

Data le_data(int id, vector<Cliente> &clientes)
{
	string dataStr;
	int ano, dia, mes;
	bool fail;
	int pos;
	Data D;

	cout << endl << TAB << "Data: " << endl;

	do {
		do {
			cout << TAB << "   Ano: ";
			cin >> ano;
			fail = cin.fail();
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			if (fail || ano < 1970)
				mensagem_erro("   Ano invalido.", false);
		} while (fail || ano < 1970); // O ano deverá ser superior a 1970. 

		do {
			cout << TAB << "   Mes: ";
			cin >> mes;
			fail = cin.fail();
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			if (fail || mes < 1 || mes > 12)
				mensagem_erro("   Mes invalido.", false);
		} while (fail || mes < 1 || mes > 12);

		do {
			cout << TAB << "   Dia: ";
			cin >> dia;
			fail = cin.fail();
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			if (!is_valid_day(dia, mes, ano) || fail)
				mensagem_erro("    Dia invalido.", false);
		} while (!is_valid_day(dia, mes, ano) || fail);

		cout << endl;

		dataStr = to_string_special(dia) + "/" + to_string_special(mes) + "/" + to_string(ano);

		D = Data(dataStr);

		if (id != -1)
		{
			pos = find_id(id, clientes);
			if (clientes.at(pos).getData() < D)
				mensagem_erro("A Data da Transacao Deve Ser Mais Recente Do Que a Data de Criacao do Cliente.", false);
		}

	} while (id != -1 && (clientes.at(pos).getData() < D));

	return  D;
}

/*
Converte um inteiro para string colocando-o com pelo menos 2 dígitos
@num
@Valor de Retorno da Função: Retorna a string com o inteiro
*/

string to_string_special(unsigned int num)
{
	double num_digitos = floor(log10(num)) + 1;
	string num_str = to_string(num);

	if (num_digitos == 1.0)
	{
		num_str = "0" + num_str;
	}

	return num_str;
}

/*
Verifica a validade da data
@dia
@mes
@ano
@Valor de Retorno da Função: Retorna verdadeiro se a data for válida, falso se não
*/

bool is_valid_day(unsigned int dia, unsigned int mes, unsigned int ano)
{
	if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12)
		if (dia > 0 && dia <= 31)
			return true;
		else
			return false;
	else if (mes != 2)
		if (dia > 0 && dia <= 30)
			return true;
		else
			return false;
	else // mes == 2
		if (is_leap(ano))
			if (dia > 0 && dia <= 29)
				return true;
			else
				return false;
		else
			if (dia > 0 && dia <= 28)
				return true;
			else
				return false;
}

/*
Verifica se o ano é bissexto
@ano
@Valor de Retorno da Função: Retorna verdadeiro se o ano for bissexto, falso se não
*/

bool is_leap(unsigned int ano)
{
	if (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0))
		return true;

	return false;
}

/*
Converte um vetor para uma string
@prods
@Valor de Retorno da Função: Retorna a string com os dados do vetor convertidos
*/

string vector2string(vector<string> &prods)
{
	string linha = prods.at(0);

	for (size_t i = 1; i < prods.size(); i++)
	{
		linha = linha + ", " + prods.at(i);
	}

	return linha;
}

/*
Converte uma string para um vetor
@linha
@Valor de Retorno da Função: Retorna o vetor formado com os dados da string
*/
vector<string>string2vector(string linha)
{
	vector <string> prods;
	size_t n = count(linha.begin(), linha.end(), ',') + 1;
	string prod;

	while (n > 0)
	{
		prod = linha.substr(1, linha.find_first_of(',')-1);
		prods.push_back(prod);
		linha.erase(linha.find(prod), prod.length() + 2);
		n--;
	}

	return prods;
}

/*
Questiona o utilizador quanto aos produtos que comprou 
@produtos
@Valor de Retorno da Função: Retorna um vetor válido
*/

vector<string>le_prods(vector<Produto>&produtos)
{
	string prod;
	vector <string> prods_vect;
	int n;

	do {
		cout << TAB << "Quantos Produtos Comprou? ";
		n = leUnsignedShortInt(0, 65535);
	} while (n < 1);

	cout << endl;

	while (n > 0)
	{
		do {
			cout << TAB << "Produto: ";
			getline(cin, prod);
			if (find_product(prod, produtos) == -1)
				mensagem_erro("Produto Inserido Invalido", false);
		} while (find_product(prod, produtos) == -1);

		prods_vect.push_back(prod);
		mensagem_erro("Produto Adicionado com Sucesso", true);
		n = n - 1;
	}
	return prods_vect;
}

/*
Questiona o utilizador e valida nome do cliente existente
@clientes
@Valor de Retorno da Função: Retorna o nome do cliente
*/

string le_nome(vector<Cliente> &clientes)
{
	string nome;
	do {
		cout << endl << TAB << "Qual o nome do cliente: ";
		getline(cin, nome);
		if (find_name(nome, clientes) == -1)
			mensagem_erro("Utilizador Nao Encontrado", false);
	} while (find_name(nome, clientes) == -1);

	return nome;
}

/*
Procura a posição do produto no vetor produtos. 
@product
@produtos
@Valor de Retorno da Função: Retorna a posiçao do produto no vetor, e -1 caso não encontre.
*/

int find_product(string product, vector<Produto>& produtos)
{
	unsigned int size = produtos.size();

	for (size_t i = 0; i < size; i++)
		{
			if (produtos.at(i).getNome() == product)
				return i;
		}
		return -1;
}

