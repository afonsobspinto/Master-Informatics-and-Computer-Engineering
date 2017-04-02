#include "Vende++.h"
/*
Classe VendeMaisMais
@loja
@fichClients
@fichProdutos
@fichTransacoes
*/

VendeMaisMais::VendeMaisMais(string loja, string fichClients, string fichProdutos, string fichTransacoes){


	nome_loja = loja;
	fichClientes_c = fichClients;
	fichProdutos_c = fichProdutos;
	fichTransacoes_c = fichTransacoes;
	transacoesAlterdas = false;  
	clientesAlterados = false;

	clientes = le_ficheiro_clientes();
	produtos = le_ficheiro_produtos();
	transacoes = le_ficheiro_transacoes();

	produtoIdx = cria_produtoIdx();
	clienteIdx = cria_clienteIdx();
	transacaoIdx = cria_transacoesIdx();

	bottom10 = preenche_bottom10();
	
}

void VendeMaisMais::setTransacoesAlterdas(bool flag)
{
	transacoesAlterdas = flag;
}

void VendeMaisMais::setClientesAlterados(bool flag)
{
	clientesAlterados = flag;
}


/*********************************
 * Gestao de Clientes
 ********************************/  


/*
Altera um cliente
*/

void VendeMaisMais::altera_cliente()
{
	unsigned int id;
	unsigned int novo_id;
	string novo_nome, nome;
	unsigned int pos;
	string data_str;

	clearScreen();

	titulo("Alterando Cliente...");

	nome = le_nome(clientes);

	id = find_id_with_name(nome, clientes);

	if (clientes.empty())
		mensagem_erro("O Ficheiro de Clientes encontra-se vazio.", false);
	else
	{
		pos = clienteIdx.at(nome);
		cout << endl;

		novo_id = le_id(clientes, false, "ID Invalido", "Novo ", id);

		cout << TAB << "Novo Nome: ";
		getline(cin, novo_nome);

		Data D = le_data(-1, clientes);

		Cliente C(novo_id, novo_nome, D, clientes.at(pos).getVolCompras());
		clientes.at(pos) = C;

		clientesAlterados = true;

		mensagem_erro("Cliente Alterado com Sucesso.", true); 
		cout << endl;

		
		saveChanges();

		wait();
	}
}

/* 
Remove um cliente
*/

void VendeMaisMais::remove_cliente()
{
	unsigned int id;
	string nome;

	clearScreen();

	titulo("Removendo Cliente...");

	nome = le_nome(clientes);

	id = find_id_with_name(nome, clientes);

	if (clientes.empty())
		mensagem_erro("O Ficheiro de Clientes encontra-se vazio.", false);
	else
	{
		clientes.erase(clientes.begin() + clienteIdx.at(nome));

		mensagem_erro("Cliente Removido com Sucesso.", true);
		cout << endl;
	}

	clientesAlterados = true;

	
	saveChanges();

	wait();
}

/*
Cria um cliente
*/

void VendeMaisMais::cria_cliente()
{
	unsigned int id;
	string nome;
	float volCompras = 0.00;
	string data_str;

	clearScreen();

	titulo("Criando Cliente...");

	id = le_id(clientes, false, "ID Invalido", "", -1);
	cout << TAB << "Nome: ";
	getline(cin, nome);

	Data D = le_data(-1, clientes);

	Cliente C(id, nome, D, volCompras);
	clientes.push_back(C);
	clientesAlterados = true;

	mensagem_erro("Cliente Criado com Sucesso.", true);
	
	cout << endl;

	wait();
	saveChanges();
}

/*
Lê o ficheiro de clientes para um vetor
*/

vector<Cliente> VendeMaisMais::le_ficheiro_clientes()
{

	vector<Cliente>clientes_vec;
	string linha;
	ifstream ficheiro_clientes(fichClientes_c);
	unsigned int size;


	getline(ficheiro_clientes, linha);
	size = stoi(linha);

	int id;
	float volCompras;
	string id_string, volCompras_string, nome, data_str;
	

	while (getline(ficheiro_clientes, id_string, ';') && getline(ficheiro_clientes, nome, ';') && getline(ficheiro_clientes, data_str, ';') && getline(ficheiro_clientes, volCompras_string))
	{
		id = stoi(id_string);
		volCompras = stof(volCompras_string);
		nome = nome.substr(1, nome.length()-2);


		Data D(data_str.substr(1, data_str.length() - 2));
		Cliente C(id, nome, D, volCompras);
		clientes_vec.push_back(C);
	}

	return clientes_vec;
}

/*
Ordena os clientes por ordem alfabética crescente
*/

void VendeMaisMais::listarClientesOrdemAlfa(){ 
	
	clearScreen();

	vector<Cliente>clientes_ordenados;

	clientes_ordenados = clientes;

	QuickSort <Cliente> QS(&clientes_ordenados, 0, clientes_ordenados.size() - 1, true);

	titulo("Clientes por Ordem Alfabetica: ");

	for (unsigned int i = 0; i < clientes_ordenados.size(); i++)
		cout << clientes_ordenados.at(i) << endl;

	wait();
}

/*
Mostra a informação individual de um cliente
@nome
@pos
*/

void VendeMaisMais::mostraInformacaoCliente(string nome, int pos) const{ 

	clearScreen();

	titulo("Dados de Cliente Individual: ");

	cout << clientes.at(pos) << endl;

	wait();
}

/*
Retorna o vetor clientes
*/

vector<Cliente> VendeMaisMais::getClientes() {
	return clientes;
}

/*
Associa o nome do cliente à sua posição no vetor clientes
*/

map <string, int> VendeMaisMais::cria_clienteIdx()
{
	string nome_cliente;
	unsigned int size;
	map <string, int> clientes_map;

	size = clientes.size();

	for (unsigned int i = 0; i < size; i++)
	{
		nome_cliente = clientes.at(i).getNome();
		clientes_map.insert(pair<string, int>(nome_cliente, i));
	}

	return clientes_map;
}


//*********************************
// * Gestao de Produtos
// ********************************/  


/* 
Lê o ficheiro dos produtos para um vetor
*/

vector<Produto> VendeMaisMais::le_ficheiro_produtos()
{
	vector<Produto>produtos_vec;
	string linha;
	ifstream ficheiro_produtos(fichProdutos_c);
	unsigned int size;


	getline(ficheiro_produtos, linha);
	size = stoi(linha);

	string nome;
	float custo;
	string separador;
	string custo_string;


	while (getline(ficheiro_produtos, nome, ';') && getline(ficheiro_produtos, custo_string))
	{
		custo = stof(custo_string);
		nome = nome.substr(0, nome.length()-1);

		Produto C(nome, custo);
		produtos_vec.push_back(C);
	}

	return produtos_vec;
}

/*
Ordena os produtos por ordem alfabética crescente
*/

void VendeMaisMais::listarProdutos(){

	clearScreen(); 

	vector <Produto> produtos_ordenados;

	produtos_ordenados = produtos;

	QuickSort <Produto> QS(&produtos_ordenados, 0, produtos_ordenados.size() - 1, true);

	titulo("Produtos por Ordem Alfabetica: ");

	for (unsigned int i = 0; i < produtos_ordenados.size(); i++)
		cout << produtos_ordenados.at(i) << endl;

	wait();
}

/*
Associa o nome do produto à sua posição no vetor produtos
*/

map <string,int> VendeMaisMais::cria_produtoIdx()
{
	string produto;
	unsigned int size;
	map <string, int> produtos_map;

	size = produtos.size();

	for (unsigned int i = 0; i < size; i++)
	{
		produto = produtos.at(i).getNome();
		produtos_map.insert(pair<string, int>(produto, i));
	}
		
	return produtos_map;
}


//*********************************
// * Gestao de Transações
// ********************************/  

/*
Lê o ficheiro de transações para um vetor
*/
 
vector<Transacao> VendeMaisMais::le_ficheiro_transacoes()
{

	vector<Transacao>transacoes_vec;
	string linha;
	ifstream ficheiro_transacoes(fichTransacoes_c);
	unsigned int size;

	getline(ficheiro_transacoes, linha);
	size = stoi(linha);

	int id;
	vector<string> prods;
	string id_string, prods_string, data_str;

	while (getline(ficheiro_transacoes, id_string, ';') && getline(ficheiro_transacoes, data_str, ';') && getline(ficheiro_transacoes, prods_string))
	{
		id = stoi(id_string);
		prods = string2vector(prods_string);

		Data D(data_str.substr(1, data_str.length() - 2));
		Transacao T(id, D, prods);
		transacoes_vec.push_back(T);
	}

	return transacoes_vec;
}

/*
Mostra todas as transações por ordem cronológica da mais à menos recente.
*/

void VendeMaisMais::mostra_todas_transacoes() {

	clearScreen();

	vector <Transacao> transacoes_ordenadas;

	transacoes_ordenadas = transacoes;

	QuickSort <Transacao> QS(&transacoes_ordenadas, 0, transacoes_ordenadas.size() - 1, true);

	titulo("Todas as Transacacoes: ");

	for (unsigned int i = 0; i < transacoes_ordenadas.size(); i++)
		cout << transacoes_ordenadas.at(i) << endl;

	wait();
}

/* 
Mostra todas as transaçoes entre 2 datas
*/

void VendeMaisMais::mostra_trasacoes_entre_datas()
{
	clearScreen();

	titulo("Transacoes Entre Datas: ");

	Data D1, D2;
	unsigned int size;
	bool flag = false;

	size = transacoes.size();

	D1 = le_data(-1, clientes); // Data inicio -> Exclusive
	D2 = le_data(-1, clientes); // Data fim

	if (D1 < D2)
		swap(D1, D2); // Certifica-se que D1 e a data de inicio

	clearScreen();

	titulo("Transacoes Entre Datas: ");

	for (unsigned int i = 0; i < size; i++)
	{
		if ((transacoes.at(i).getData() < D1) && !(transacoes.at(i).getData() < D2))
		{
			cout << transacoes.at(i) << endl;
			flag = true;
		}
	}

	if (!flag)
		mensagem_erro("Nao Existem Transacoes Entre Essas Datas.", false);

	wait();

}

/*
Adiciona uma transação
*/

void VendeMaisMais::cria_transacao()
{
	unsigned int id, pos;
	vector<string> prods;
	string data_str, nome;
	float montante;

	clearScreen();

	titulo("Criando Transacao...");

	nome = le_nome(clientes);

	id = find_id_with_name(nome, clientes);

	Data D = le_data(id, clientes);

	prods = le_prods(produtos);

	Transacao T(id, D, prods);
	transacoes.push_back(T);

	transacoesAlterdas = true;

	cout << endl << endl;

	// Adiçao do montante ao cliente:

	pos = clienteIdx.at(nome);

	montante = clientes.at(pos).getVolCompras();

	for (unsigned int i = 0; i < prods.size(); i++)
	{
		montante += produtos.at(find_product(prods[i], produtos)).getCusto();
	}

	clientes.at(pos).set_volCompras(montante);
	clientesAlterados = true;

	mensagem_erro("Transacao Criada com Sucesso.", true);

	cout << endl;

	saveChanges();

	wait();
}

/*
Mostra todas as transações de um cliente
*/

void VendeMaisMais::mostra_transacoes_individual() {

	clearScreen();

	int id, size;

	string nome;

	bool flag = false;

	size = transacoes.size();

	titulo("Todas as Transacoes do Cliente: ");

	nome = le_nome(clientes);

	id = find_id_with_name(nome, clientes);

	clearScreen();

	titulo("Todas as Transacoes do Cliente: ");

	for (const auto & x : transacaoIdx)
	{
		if (x.first == id)
		{
			cout << transacoes.at(x.second) << endl;
			flag = true;
		}
		
	}

	if (!flag)
		mensagem_erro("O Cliente Nao Tem Transacoes.", false);

	wait();
} 

/*
Mostra as transacoes de um cliente num determinado dia
*/

void VendeMaisMais::mostra_transacoes_individual_dia() {

	clearScreen();

	titulo("Todas as Transacoes do Cliente Dia: ");

	int id, size;
	string nome;
	Data D;
	bool flag = false;


	nome = le_nome(clientes);

	id = find_id_with_name(nome, clientes);

	D = le_data(-1, clientes);

	size = transacoes.size();

	clearScreen();

	titulo("Todas as Transacoes do Cliente Dia: ");

	for (unsigned int i = 0; i < size; i++)
	{
		if ((id == transacoes.at(i).getIdCliente()) && (D == transacoes.at(i).getData()))
		{
			cout << transacoes.at(i) << endl;
			flag = true;
		}
	}
	if (!flag)
		mensagem_erro("O Cliente Nao Tem Transacoes.", false);

	wait();
}

/*
Mostra as transacoes de um cliente entre dois determinados dias
*/

void VendeMaisMais::mostra_transacoes_individual_entre_dias() {

	clearScreen();

	titulo("Todas as Transacoes do Cliente entre Dias: ");

	int id, size;
	string nome;
	Data D1, D2;
	bool flag = false;

	nome = le_nome(clientes);

	id = find_id_with_name(nome, clientes);

	D1 = le_data(-1, clientes);
	D2 = le_data(-1, clientes);

	size = transacoes.size();

	clearScreen();

	titulo("Todas as Transacoes do Cliente entre Dias: ");

	if (D1 < D2)
		swap(D1, D2);

	for (unsigned int i = 0; i < size; i++)
	{
		if ((id == transacoes.at(i).getIdCliente()) && (transacoes.at(i).getData() < D1) && !(transacoes.at(i).getData() < D2))
		{
			cout << transacoes.at(i) << endl;
			flag = true;
		}
	}
	if (!flag)
		mensagem_erro("O Cliente Nao Tem Transacoes entre Essas Datas.", false);

	wait();
}

/*
Associa o ID do cliente com o índice das suas transações no vetor transacoes
*/
multimap<int, int> VendeMaisMais::cria_transacoesIdx()
{

	int id;
	unsigned int size;
	multimap <int, int> transacoes_map;

	size = transacoes.size();

	for (unsigned int i = 0; i < size; i++)
	{
		id = transacoes.at(i).getIdCliente();
		transacoes_map.insert(pair<int, int>(id, i));
	}

	return transacoes_map;

}


//*********************************
// * Publicidade
// ********************************/  

/*
Preenche o Bottom10
*/

vector<Cliente> VendeMaisMais::preenche_bottom10()
{
	unsigned int size = clientes.size();
	vector<Cliente> piores10;

	piores10 = clientes;

	QuickSort <Cliente> QS(&piores10, 0, piores10.size() - 1, false);

	if (size < 10)
		piores10 = {};
	else
		piores10.resize(10);

	return piores10;
}

/*
Funcao Auxiliar do Bottom 10
@nome
@Valor de Retorno da Função: verdadeiro caso o nome esteja no bottom10, falso no caso contrário
*/

bool VendeMaisMais::is_bottom10(string nome)
{
	for (unsigned int i = 0; i < bottom10.size(); i++)
	{
		if (nome == bottom10.at(i).getNome())
			return true;
	}

	return false;
}

/*
Mostra Bottom10 por ordem crescente de montante
*/

void VendeMaisMais::mostra_bottom10()
{
	clearScreen();

	titulo("Bottom10: ");


	if (!bottom10.empty())
		for (size_t i = 0; i < 10; i++)
			cout << bottom10.at(i) << endl;
	else
		mensagem_erro("O Bottom10 nao pode ser calculado", false);

	wait();
}

/*
Diferencia os dois tipos de publicidade e apresenta a sugestao
*/

void VendeMaisMais::publicidade()
{
	clearScreen();

	titulo("Menu Publicitario: ");

	string cliente_alvo;
	string sugestao;

	cliente_alvo = le_nome(clientes);
	mensagem_erro("Cliente Selecionado com Sucesso", true);
	cout << endl;


	if (is_bottom10(cliente_alvo))
		sugestao = publicidade_Bottom();
	else
		sugestao = publicidade_Normal(cliente_alvo);


	cout << endl;
	cout << "O cliente " << cliente_alvo << " devera estar interessado em comprar " << sugestao << "." << endl << endl;

	wait();
}

/*
Utiliza o algoritmo do supermercado para obter a publicidade personalizada aos clientes interessantes
@cliente_alvo
@Valor de Retorno da Função: Retorna a sugestão 
*/

string VendeMaisMais::publicidade_Normal(string cliente_alvo)
{
	struct info {
		int semelhancas;
		vector<int> novos_produtos;
	};

	struct alvos {
		size_t indice;
		vector<int> novos_produtos;
	};

	unsigned int linhas, colunas, size;
	unsigned int id;
	unsigned int linha, coluna;
	vector <vector <bool>> matriz;
	
	int id_alvo, indice_alvo;
	vector<int> ids_clientes;
	map <int, int> indiceId; // associa o ID do cliente à sua posicao no vetor clientes

	vector <string> lista_produtos;
	vector <alvos> potenciais_alvos;
	vector <info> informacao;
	vector <int> melhores_produtos;
	
	int max = -1;
	int contador = -1;
	unsigned int melhor_produto;
	string sugestao;
	


	linhas = clientes.size();
	colunas = produtos.size();
	size = transacoes.size();

	// Recolhe o Id de todos os clientes

	for (size_t i = 0; i < linhas; i++)
		ids_clientes.push_back(clientes.at(i).getId());

	// Criaçao da Matriz

	matriz.resize(linhas);
	for (unsigned int i = 0; i < linhas; i++)
		matriz.at(i).resize(colunas, false);

	// Preenchimento do Map

	for (unsigned int i = 0; i < linhas; i++)
	{
		id = clientes.at(i).getId();
		indiceId.insert(pair<int, int>(id, i));
	}

	// Preenchimento da matriz

	for (size_t i = 0; i < size; i++)
	{
		if (find(ids_clientes.begin(), ids_clientes.end(), transacoes.at(i).getIdCliente()) != ids_clientes.end())
		{
			linha = indiceId.at(transacoes.at(i).getIdCliente());
			lista_produtos = transacoes.at(i).getLista_Produtos();

			for (size_t u = 0; u < lista_produtos.size(); u++)
			{
				coluna = produtoIdx.at(lista_produtos.at(u));
				matriz[linha][coluna] = true;
			}
		}
	}

	id_alvo = find_id_with_name(cliente_alvo, clientes);
	indice_alvo = indiceId.at(id_alvo);

	// Inicializaçao das Informaçoes

	informacao.resize(linhas);

	for (size_t i = 0; i < linhas; i++)
	{
		informacao.at(i).semelhancas = 0;
		informacao.at(i).novos_produtos = {};
	}

	// Recolha de Informaçoes
	// @Semelhanças - Int
	// @Produtos Novos - Vector

	for (size_t i = 0; i < linhas; i++)
	{
		if (i != indice_alvo)
			for (size_t j = 0; j < colunas; j++)
			{
				if (matriz[i][j] && matriz[indice_alvo][j]) // Cliente i tem o mesmo produto que o alvo
					informacao.at(i).semelhancas += 1;
				else if (matriz[i][j] && !matriz[indice_alvo][j]) // Cliente i tem um produto que o alvo nao tem
					informacao.at(i).novos_produtos.push_back(j);
			}
	}	

	// Recolhe Potenciais Alvos
	// @Indice - Int
	// @Produtos Novos - Vector

	for (size_t i = 0; i < linhas; i++)
	{
		if (informacao.at(i).semelhancas >= max && !informacao.at(i).novos_produtos.empty())
		{
			if (informacao.at(i).semelhancas > max)
			{
				potenciais_alvos.clear();
				max = informacao.at(i).semelhancas;
			}

			alvos T = { i, informacao.at(i).novos_produtos };
			potenciais_alvos.push_back(T);
		}
	}

	// Inicializaçao dos Melhores Produtos

	melhores_produtos.resize(colunas,0);

	// Recolhe os Melhores Produtos - Calcula a sua frequencia

	for (size_t i = 0; i < potenciais_alvos.size(); i++)
	{
		for (size_t j = 0; j < informacao.at(i).novos_produtos.size(); j++)
			melhores_produtos.at(informacao.at(i).novos_produtos.at(j)) += 1;
	}

	// Seleciona melhor produto
	for (size_t j = 0; j < colunas; j++)
	{
		if (melhores_produtos.at(j) > contador) // Em caso de empate prevalece o 1º encontrado
		{
			contador = melhores_produtos.at(j);
			melhor_produto = j;
		}
	}

	sugestao = produtos.at(melhor_produto).getNome();

	return sugestao;
}

/*
Utiliza o algoritmo do supermercado para obter a publicidade personalizada aos clientes do Bottom10
*/

string VendeMaisMais::publicidade_Bottom()
{
	struct Produto10
	{
		size_t i;
		vector<int> vec;
	};

	struct Produto10_s
	{
		size_t i;
		vector<string> vec;
	};

	vector <int> ids_bottom10;

	vector<Produto10> info_geral;
	vector<Produto10> info;
	vector <Produto10_s> info_prods;
	vector <Produto10_s> info_prods_geral;

	vector<int> transacoes_ind_helper;
	vector<string> prods_helper;
	vector <string> comuns;
	vector <Produto10_s> clientes_interessantes;
	vector<int> prods;
	
	vector<string>::iterator it;

	size_t size_p = produtos.size();
	size_t size_c = clientes.size();

	int contador = 0;
	int max = -1;

	vector <int> prods_frequentes;
	vector <int> prods_raros;
	vector <int> diff;

	string sugestao;


	// Guarda IDs do Bottom10 num Vetor

	for (size_t i = 0; i < 10; i++)
		ids_bottom10.push_back(bottom10.at(i).getId());


	// Guarda ID e posicao das transacoes para todos os clientes (inclusive os do Bottom10)
	// Recorre ao multimap transacaoIdx previamente criado

	for (size_t i = 0; i < size_c; i++)
	{
		pair <multimap<int, int>::iterator, multimap<int, int>::iterator> ret;
		ret = transacaoIdx.equal_range(clientes.at(i).getId());
		for (multimap<int, int>::iterator it = ret.first; it != ret.second; ++it)
			transacoes_ind_helper.push_back(it->second);

		Produto10 P = {clientes.at(i).getId(), transacoes_ind_helper };
		info_geral.push_back(P);
		transacoes_ind_helper.clear();
	}


	// Guarda ID e posicao das transacoes para somente o Bottom10
	// Recorre ao multimap transacaoIdx previamente criado

	for (size_t i = 0; i < 10; i++)
	{
		pair <multimap<int, int>::iterator, multimap<int, int>::iterator> ret;
		ret = transacaoIdx.equal_range(bottom10.at(i).getId());
		for (multimap<int, int>::iterator it = ret.first; it != ret.second; ++it)
			transacoes_ind_helper.push_back(it->second);

		Produto10 P = { bottom10.at(i).getId(), transacoes_ind_helper };
		info.push_back(P);
		transacoes_ind_helper.clear();
	}

	// Guarda ID e produtos adquiridos por todos os Clientes Interessantes

	for (size_t i = 0; i < size_c; i++)
	{

		for (size_t y = 0; y < info_geral.at(i).vec.size(); y++)
		{
			for (size_t j = 0; j < transacoes.at(info_geral.at(i).vec.at(y)).getLista_Produtos().size(); j++)
				prods_helper.push_back(transacoes.at(info_geral.at(i).vec.at(y)).getLista_Produtos().at(j));
		}

		Produto10_s P = { info_geral.at(i).i, prods_helper };
		info_prods_geral.push_back(P);
		prods_helper.clear();
	}

	// Guarda ID e produtos adquiridos por todo o Bottom10

	for (size_t i = 0; i < 10; i++)
	{
		for (size_t y = 0; y < info.at(i).vec.size(); y++)
		{
			for (size_t j = 0; j < transacoes.at(info.at(i).vec.at(y)).getLista_Produtos().size(); j++)
				prods_helper.push_back(transacoes.at(info.at(i).vec.at(y)).getLista_Produtos().at(j));
		}

			Produto10_s P = { info.at(i).i, prods_helper };
			info_prods.push_back(P);
			prods_helper.clear();
	}

		// Recolhe todos os Produtos Comuns adquiridos pelos elementos do Bottom10

		for (size_t i = 0; i < size_p; i++)
		{
			for (size_t j = 0; j < 10; j++)
			{
				if (find(info_prods.at(j).vec.begin(), info_prods.at(j).vec.end(), produtos.at(i).getNome()) != info_prods.at(j).vec.end())
					contador += 1;
				else
					break;
			}
			if (contador == 10)
				comuns.push_back(produtos.at(i).getNome());
			contador = 0;
		}


		 // Calcula e recolhe quais os clientes interessantes

		for (size_t i = 0; i < size_c; i++)
		{
			if (find(ids_bottom10.begin(), ids_bottom10.end(), clientes.at(i).getId()) == ids_bottom10.end()) // Se o Cliente Nao é do Bottom10
			{
				for (size_t j = 0; j < comuns.size(); j++)
				{
					if (find(info_prods_geral.at(i).vec.begin(), info_prods_geral.at(i).vec.end(), comuns.at(j)) != info_prods_geral.at(i).vec.end() && (info_prods_geral.at(i).vec != comuns)) // Tem os produtos comuns e pelo menos + 1
					{
						contador += 1;

						sort(comuns.begin(), comuns.end());
						sort(info_prods_geral.at(i).vec.begin(), info_prods_geral.at(i).vec.end());
						set_symmetric_difference(comuns.begin(),comuns.end(),info_prods_geral.at(i).vec.begin(),info_prods_geral.at(i).vec.end(),back_inserter(prods_helper)); // Obtem produtos extra comuns
					}
					else
						break;
				}
				if (contador == comuns.size())
				{
					Produto10_s P = { i, prods_helper };
					clientes_interessantes.push_back(P); // Guarda o Indice e Produtos Extra Comuns do Cliente Interessante
				}
				contador = 0;
				prods_helper.clear();
			}
		}



		// Contabiliza as ocorrencias dos produtos extra comuns nos clientes interessantes

		prods.resize(size_p, 0); //Inicializaçao

		for (size_t i = 0; i < size_p; i++)
		{
			for (size_t j = 0; j < clientes_interessantes.size(); j++)
			{
				if (find(clientes_interessantes.at(j).vec.begin(), clientes_interessantes.at(j).vec.end(), produtos.at(i).getNome()) != clientes_interessantes.at(j).vec.end())
					prods.at(i) += 1;
			}
		}

		// Escolhe o produto + frequente

		for (size_t i = 0; i < size_p; i++)
		{
			if (prods.at(i) > max)
			{
				max = prods.at(i);
				sugestao = produtos.at(i).getNome();
			}
		}
			
		// Verifica se a sugestao e valida

		if (max != 0)
			return sugestao;
		else
			max = -1;


		// Contabiliza as ocorrencias de todos os produtos nos clientes interessantes

		prods_frequentes.resize(size_p, 0); //Inicializaçao

		cout << endl;

		for (size_t i = 0; i < info_prods_geral.size(); i++)
			for (size_t j = 0; j < info_prods_geral.at(i).vec.size(); j++)
				prods_frequentes.at(produtoIdx.at(info_prods_geral.at(i).vec.at(j))) += 1;


		// Contabiliza as ocorrencias de todos os produtos nos clientes bottom10

		prods_raros.resize(size_p, 0); //Inicializaçao

		cout << endl;

		for (size_t i = 0; i < info_prods.size(); i++)
			for (size_t j = 0; j < info_prods.at(i).vec.size(); j++)
				prods_raros.at(produtoIdx.at(info_prods.at(i).vec.at(j))) += 1;


		// Calcula  a diferença entre Prods_Frequentes e Prods_raros

		transform(prods_frequentes.begin(), prods_frequentes.end(), prods_raros.begin(), back_inserter(diff),
			[](int a, int b) { return abs(a - b); });

		

		// Escolhe o produto com maior diferença entre produtos comprados pelos clientes interessantes e produtos comprados pelo bottom10

		for (size_t i = 0; i < size_p; i++)
		{
			if (diff.at(i) > max)
			{
				max = diff.at(i);
				sugestao = produtos.at(i).getNome();
			}
		}

		return sugestao;
	}


///*********************************
// * Preservar Informacao
// ********************************/  

/*
Guarda apenas a informação de clientes e/ou de transações alteradas
*/
void VendeMaisMais::saveChanges(){

	if (clientesAlterados)
	{
		save(clientes, fichClientes_c);
		setClientesAlterados(false);
		clienteIdx = cria_clienteIdx(); // atualiza o map
	}

	if (transacoesAlterdas)
	{
		save(transacoes, fichTransacoes_c);
		setTransacoesAlterdas(false);
		transacaoIdx = cria_transacoesIdx(); // atualiza o map
	}
}

//*********************************
// * Mostrar Loja
// ********************************/  

/*
Overload de << para facilitar a visualizaçao do conteúdo de uma loja na consola.
*/
ostream& operator<<(ostream& out, const VendeMaisMais & supermercado){

	out << "Numero de Clientes: " << supermercado.clientes.size() << endl << endl;
	out << "Numero de Produtos: " << supermercado.produtos.size() << endl << endl;
	out << "Numero de Transacoes: " << supermercado.transacoes.size() << endl << endl;
	return out;

}
