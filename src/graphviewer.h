#ifndef _GRAPH_VIEWER_H_
#define _GRAPH_VIEWER_H_

#ifdef linux
#include <unistd.h>
#else
#include <winsock2.h>
#include <Windows.h>
#endif

#include <stdlib.h>
#include <signal.h>
#include <string>

#include "edgetype.h"
#include "connection.h"

#define BLUE "BLUE"
#define RED "RED"
#define PINK "PINK"
#define BLACK "BLACK"
#define WHITE "WHITE"
#define ORANGE "ORANGE"
#define YELLOW "YELLOW"
#define GREEN "GREEN"
#define CYAN "CYAN"
#define GRAY "GRAY"
#define DARK_GRAY "DARK_GRAY"
#define LIGHT_GRAY "LIGHT_GRAY"
#define MAGENTA "MAGENTA"

/**
 * Classe que guarda o grafo e o representa. Todas as suas funções retornam um booleano a indicar
 * se a sua execução decorreu ou não com sucesso.
 */
class GraphViewer {
public:
	/**
	 * Variável que guarda a próxima porta que o programa vai usar. O valor inicial é 7772.
	 */
	static short port;

	/**
	 * Construtor que cria um novo grafo e atribui automaticamente a porta.
	 * Exemplo: GraphViewer *gv = new GraphViewer(600, 600, true); instancia um grafo
	 * 600x600, onde a posição dos nós é determinada automaticamente.
	 *
	 * @param width Inteiro que representa a lagura da área do grafo.
	 * @param height Inteiro que representa a altura da área do grafo.
	 * @param dynamic Booleano que determina se a localização dos nós é automaticamente.
	 * determinado pelo programa (true) ou se deve ser determinado pelo utilizador (false).
	 */
	GraphViewer(int width, int height, bool dynamic);

	/**
	 * Construtor que cria um novo grafo, utilizando uma porta especificada pelo utilizador para a ligação.
	 *
	 * Exemplo: GraphViewer *gv = new GraphViewer(600, 600, false, 3000); instancia um grafo
	 * 600x600, onde a posição dos nós é determinada pelo utilizador
	 * (usando a versão de addNode onde se pode especificar as coordenadas), sendo que a porta
	 * a usar para a comunicação é a 3000.
	 *
	 * @param width Inteiro que representa a lagura da área do grafo.
	 * @param height Inteiro que representa a altura da área do grafo.
	 * @param dynamic Booleano que determina se a localização dos nós é automaticamente.
	 * determinado pelo programa (true) ou se deve ser determinado pelo utilizador (false).
	 * @param port_n Inteiro que determina a porta a utilizar. Deve-se ter cuidado para não utilizar uma porta
	 * já usada por outro programa ou pelo sistema.
	 */
	GraphViewer(int width, int height, bool dynamic, int port_n);

	/**
	 * Função que cria a janela para visualização.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->createWindow(600, 600); abre uma janela 600x600 onde mostra o grafo.
	 *
	 *
	 * @param width Largura da janela a criar.
	 * @param height Altura da janela a criar.
	 */
	bool createWindow(int width, int height);

	/**
	 * Fecha a janela a ser utilizada para visualização.
	 */
	bool closeWindow();

	/**
	 * Acrescenta um nó à representação do grafo, numa posição específica, irrelevante se o grafo
	 * for dinâmico.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer com isDynamic = false:
	 * gv->addNode(0, 1, 2); adiciona um nó com ID 0 na posição (x, y) = (1, 2)
	 *
	 * @param id Identificador único do nó.
	 * @param x Posição horizontal do nó.
	 * @param y Posição vertical do nó.
	 */
	bool addNode(int id, int x, int y);

	/**
	 * Acrescenta um nó à representação do grafo, numa posição ao critério do programa.
	 * Só pode ser usado se o grafo for dinâmico, ou seja, se as posições de todos
	 * os nós forem atribuídas automaticamente. Caso contrário, não adiciona o nó.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer com isDynamic = true:
	 * gv->addNode(0); adiciona um nó com ID 0
	 *
	 * @param id Identificador único do nó.
	 */
	bool addNode(int id);

	/**
	 * Acrescenta uma aresta à representação do grafo.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->addEdge(0, 1, 2, EdgeType::UNDIRECTED); adiciona uma aresta não-dirigida com ID 0
	 * que liga os nós com os IDs 1 e 2
	 *
	 * @param id Identificador único da aresta.
	 * @param v1 Identificador único do nó de origem da aresta.
	 * @param v2 Identificador único do nó de destino da aresta.
	 * @param edgeType EdgeType.DIRECTED caso a aresta seja unidirecional
	 * ou EdgeType.UNDIRECTED caso a aresta seja bidirecional.
	 */
	bool addEdge(int id, int v1, int v2, int edgeType);

	/**
	 * Remove um nó da representação do grafo e todas as arestas ligadas a este.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->removeNode(0) remove o nó com ID 0
	 *
	 * @param id Identificador único do nó a a remover.
	 */
	bool removeNode(int id);

	/**
	 * Remove uma aresta da representação do grafo.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->removeEdge(0) remove a aresta com ID 0
	 *
	 * @param id Identificador único da aresta a remover.
	 */
	bool removeEdge(int id);

	/**
	 * Função que define o texto de um nó.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setVertexLabel(0, "Isto é um nó"); adiciona o texto "Isto é um nó" ao nó com ID 0
	 *
	 * @param id Identificador único do nó com o texto a alterar.
	 * @param label Novo texto do nó.
	 */
	bool setVertexLabel(int id, string label);

	/**
	 * Função que define o texto de uma aresta.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setEdgeLabel(0, "Isto é uma aresta"); adiciona o texto "Isto é uma aresta" à aresta com ID 0
	 *
	 * @param id Identificador único da aresta com o texto a alterar.
	 * @param label Novo texto da aresta.
	 */
	bool setEdgeLabel(int id, string label);

	/**
	 * Função que define a cor de uma aresta.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setEdgeColor(0, BLUE); modifica a cor da aresta com ID 0 para azul
	 *
	 * @param id Identificador único da aresta com a cor a alterar.
	 * @param color Nova cor da aresta, utilizar as constantes definidas no graphviewer.h para conveniência.
	 */
	bool setEdgeColor(int id, string color);

	/**
	 * Função que define se uma aresta é desenhada, ou não, a tracejado.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setEdgeDashed(0, false); faz com que a aresta com ID 0 seja desenhada a traço contínuo
	 *
	 * @param id Identificador único da aresta com a cor a alterar.
	 * @param dashed Nova cor da aresta, utilizar as constantes definidas no graphviewer.h para conveniência.
	 */
	bool setEdgeDashed(int id, bool dashed);

	/**
	 * Função que define a cor de um nó.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setVertexColor(0, GREEN); modifica a cor do nó com ID 0 para verde
	 *
	 * @param id Identificador único do nó com a cor a alterar.
	 * @param color Nova cor do nó, utilizar as constantes definidas no graphviewer.h para conveniência.
	 */
	bool setVertexColor(int id, string color);

	/**
	 * Função que define o tamanho de um nó.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setVertexSize(0, 10); modifica o tamanho do nó com ID 0 para 40
	 *
	 * @param id Identificador único do nó com o tamanho a alterar.
	 * @param size Novo tamanho do nó.
	 */
	bool setVertexSize(int id, int size);

	/**
	 * Função que define um ícone para um nó.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setVertexIcon(0, "icon.png"); faz com que o nó, quando desenhado, não seja um círculo, mas sim a imagem icon.png
	 *
	 * @param id Identificador único do nó com o ícone a alterar.
	 * @param filepath Caminho do ficheiro a utilizar como novo ícone do nó.
	 */
	bool setVertexIcon(int id, string filepath);

	/**
	 * Função que define a espessura de uma aresta.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setEdgeThickness(0, 20); modifica a espessura da aresta com ID 0 para 20
	 *
	 * @param id Identificador único da aresta com a espessura a alterar.
	 * @param thickness Nova espessura da aresta, sendo que por base, as
	 * arestas são criadas com a espessura de 1.
	 */
	bool setEdgeThickness(int id, int thickness);

	/**
	 * Função que define o peso de uma aresta na representação do grafo, a ser visualizado
	 * como w: valor_do_peso, seguido de qualquer outro texto associado à aresta.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setEdgeWeight(0, 20); modifica o peso da aresta com ID 0 para 20
	 *
	 * @param id Identificador único da aresta a modificar.
	 * @param weight Peso associado à aresta.
	 */
	bool setEdgeWeight(int id, int weight);

	/**
	 * Função que define o fluxo de uma aresta na representação do grafo, a ser visualizado
	 * como f: valor_do_fluxo, precedido pelo peso e seguido por texto definido pelo utilizador.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setEdgeFlow(0, 20); modifica o fluxo da aresta com ID 0 para 20
	 *
	 * @param id Identificador único da aresta a modificar.
	 * @param flow Fluxo associado à aresta.
	 */
	bool setEdgeFlow(int id, int flow);

	/**
	 * Função que define se as arestas do grafo serão desenhadas como curvas ou retas.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->defineEdgeCurved(false); faz com que as arestas sejam desenhadas como retas
	 *
	 * @param curved Booleano que representa se as arestas serão curvas (true) ou retas (false), sendo o valor por defeito é true.
	 */
	bool defineEdgeCurved(bool curved);

	/**
	 * Função que define a cor global das arestas.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->defineEdgeColor(GRAY); modifica a cor por defeito das arestas para cinzento
	 *
	 * @param color Nova cor das arestas, utilizar as constantes definidas no graphviewer.h para conveniência.
	 */
	bool defineEdgeColor(string color);

	/**
	 * Função que define globalmente se as arestas são desenhadas, ou não, a tracejado.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->defineEdgeDashed(true); faz com que por defeito as arestas sejam desenhadas a tracejado
	 *
	 * @param dashed Booleano que representa se as arestas vão estar, ou não, todas a tracejado (o valor por defeito é false).
	 */
	bool defineEdgeDashed(bool dashed);

	/**
	 * Função que define a cor global dos nós.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->defineVertexColor(RED); modifica a cor por defeito dos nós para vermelho
	 *
	 * @param color Nova cor dos nós, utilizar as constantes definidas no graphviewer.h para conveniência.
	 */
	bool defineVertexColor(string color);

	/**
	 * Função que define o tamanho global dos nós.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->defineVertexSize(20); modifica o tamanho por defeito dos nós para 20
	 *
	 * @param size Nova cor dos nós, utilizar as constantes definidas no graphviewer.h para conveniência.
	 */
	bool defineVertexSize(int size);

	/**
	 * Função que define um ícone para um nó.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->defineVertexIcon("icon.gif"); faz com que por defeito os nós, quando desenhados,
	 * não sejam um círculo, mas sim a imagem icon.gif
	 *
	 * @param filepath Caminho do ficheiro a utilizar como novo ícone do nó.
	 */
	bool defineVertexIcon(string filepath);

	/**
	 * Função que altera a imagem de fundo do grafo.
	 * Exemplo, para um apontador gv onde foi instanciada a classe GraphViewer:
	 * gv->setBackGround("fundo.png"); faz com que o fundo da janela seja a imagem fundo.png,
	 * em vez de cinzento
	 *
	 * @param path Caminho para o ficheiro com a imagem.
	 */
	bool setBackground(string path);

	/**
	 * Função que actualiza a visualização do grafo.
	 */
	bool rearrange();

#ifdef linux
	static pid_t procId;
#endif

private:
	int width, height;
	bool isDynamic;

	Connection *con;

	void initialize(int, int, bool, int);
};

#endif
