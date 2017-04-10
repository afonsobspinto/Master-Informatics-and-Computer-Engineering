/*
 * Graph.h
 */
#ifndef GRAPH_H_
#define GRAPH_H_

#include <limits>
#include <stdlib.h>
#include <vector>
#include <deque>
#include <queue>
#include <set>
#include <list>
#include <limits>
#include <cmath>
#include <string>
#include <iostream>
#include "Place.h"
#include "Transition.h"
#include "algorithm"
#include "unistd.h"
#include <unordered_set>
#include <limits>
using namespace std;

template <class T> class Edge;
template <class T> class Graph;

const int NOT_VISITED = 0;
const int BEING_VISITED = 1;
const int DONE_VISITED = 2;
const int INT_INFINITY = std::numeric_limits<int>::max();;
const int __NULL = 0;

/*
 * ================================================================================================
 * Class Vertex
 * ================================================================================================
 */
template <class T>
class Vertex { // Nodes
	T info;
	vector<Edge<T>  > adj;
	bool visited;
	bool processing;
	int indegree;
	int dist;
	//double latDeg, longDeg, latRad, longRad;
public:

	Vertex(T in);
	friend class Graph<T>;

	void addEdge(Vertex<T> *dest, double w);
	bool removeEdgeTo(Vertex<T> *d);

	T getInfo() const;
	void setInfo(T info);

	int getDist() const;
	int getIndegree() const;

	Vertex* path;
};


template <class T>
struct vertex_greater_than {
    bool operator()(Vertex<T> * a, Vertex<T> * b) const {
        return a->getDist() > b->getDist();
    }
};


template <class T>
bool Vertex<T>::removeEdgeTo(Vertex<T> *d) {
	d->indegree--; //adicionado do exercicio 5
	typename vector<Edge<T> >::iterator it= adj.begin();
	typename vector<Edge<T> >::iterator ite= adj.end();
	while (it!=ite) {
		if (it->dest == d) {
			adj.erase(it);
			return true;
		}
		else it++;
	}
	return false;
}

//atualizado pelo exercício 5
template <class T>
Vertex<T>::Vertex(T in): info(in), visited(false), processing(false), indegree(0), dist(0) {
	path = nullptr;
}


template <class T>
void Vertex<T>::addEdge(Vertex<T> *dest, double w) {
	Edge<T> edgeD(dest,w);
	adj.push_back(edgeD);
}


template <class T>
T Vertex<T>::getInfo() const {
	return this->info;
}

template <class T>
int Vertex<T>::getDist() const {
	return this->dist;
}


template <class T>
void Vertex<T>::setInfo(T info) {
	this->info = info;
}

template <class T>
int Vertex<T>::getIndegree() const {
	return this->indegree;
}




/* ================================================================================================
 * Class Edge
 * ================================================================================================
 */
template <class T>
class Edge {
	Vertex<T> * dest;
	double weight; // Used as the distance
	string roadName;
public:
	Edge(Vertex<T> *d, double w);
	friend class Graph<T>;
	friend class Vertex<T>;
};

template <class T>
Edge<T>::Edge(Vertex<T> *d, double w): dest(d), weight(w){}





/* ================================================================================================
 * Class Graph
 * ================================================================================================
 */
template <class T>
class Graph {
	vector<Vertex<T> *> vertexSet;
	void dfs(Vertex<T> *v, vector<T> &res) const;
	void removeGeoVertex(Vertex<T> *v, vector<T> &res);

	//exercicio 5
	int numCycles;
	void dfsVisit(Vertex<T> *v);
	void dfsVisit();
	void getPathTo(Vertex<T> *origin, list<T> &res);

public:
	Graph();

	bool addVertex(const T &in);
	bool addEdge(const T &sourc, const T &dest, double w);
	bool addEdge(Transition *transition);
	bool removeVertex(const T &in);
	bool removeEdge(const T &sourc, const T &dest);
	vector<T> dfs() const;
	vector<T> bfs(Vertex<T> *v) const;
	int maxNewChildren(Vertex<T> *v, T &inf) const;
	vector<Vertex<T> * > getVertexSet() const;
	int getNumVertex() const;

	//exercicio 5
	Vertex<T>* getVertex(const T &v) const;
	vector<Vertex<T>*> getVertexFromSet(const set<T*> places ) const;
	void resetIndegrees();
	vector<Vertex<T>*> getSources() const;
	int getNumCycles();
	vector<T> topologicalOrder();
	vector<T> getPath(const T &origin, const T &dest);
	void unweightedShortestPath(const T &v);
	bool isDAG();

	void dijkstraShortestPath(const T &s);

	vector<set<T*> > scc();
	void scc(Vertex<T> *v, vector<Vertex<T>*> temp);
	Graph<T> getTranspose();
	void dfsUtil(Vertex<T>* v, set<Vertex<T>*>* visited, deque<Vertex<T>*>* stack);
	void dfsUtilRG(Vertex<T>* v, set<Vertex<T>*>* visited, set<T*>* set);


	vector<T*> calcRoute(set<T*> places , vector<T*>* clients, T* start);

	vector<T*>solveGreedy(vector<T*>* clients, T* start);

	double getDistance(vector<T> path);

};



template <class T>
int Graph<T>::getNumVertex() const {
	return vertexSet.size();
}
template <class T>
vector<Vertex<T> * > Graph<T>::getVertexSet() const {
	return vertexSet;
}

template <class T>
int Graph<T>::getNumCycles() {
	numCycles = 0;
	dfsVisit();
	return this->numCycles;
}

template <class T>
bool Graph<T>::isDAG() {
	return (getNumCycles() == 0);
}

template <class T>
bool Graph<T>::addVertex(const T &in) {
	typename vector<Vertex<T>*>::iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::iterator ite= vertexSet.end();
	for (; it!=ite; it++)
		if ((*it)->info == in) return false;
	Vertex<T> *v1 = new Vertex<T>(in);
	vertexSet.push_back(v1);
	return true;
}

template <class T>
bool Graph<T>::removeVertex(const T &in) {
	typename vector<Vertex<T>*>::iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::iterator ite= vertexSet.end();
	for (; it!=ite; it++) {
		if ((*it)->info == in) {
			Vertex<T> * v= *it;
			vertexSet.erase(it);
			typename vector<Vertex<T>*>::iterator it1= vertexSet.begin();
			typename vector<Vertex<T>*>::iterator it1e= vertexSet.end();
			for (; it1!=it1e; it1++) {
				(*it1)->removeEdgeTo(v);
			}

			typename vector<Edge<T> >::iterator itAdj= v->adj.begin();
			typename vector<Edge<T> >::iterator itAdje= v->adj.end();
			for (; itAdj!=itAdje; itAdj++) {
				itAdj->dest->indegree--;
			}
			delete v;
			return true;
		}
	}
	return false;
}


template <class T>
bool Graph<T>::addEdge(const T &sourc, const T &dest, double w) {
	typename vector<Vertex<T>*>::iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::iterator ite= vertexSet.end();
	int found=0;
	Vertex<T> *vS, *vD;
	while (found!=2 && it!=ite ) {
		if ( (*it)->info == sourc )
			{ vS=*it; found++;}
		if ( (*it)->info == dest )
			{ vD=*it; found++;}
		it ++;
	}
	if (found!=2) return false;
	vD->indegree++;
	vS->addEdge(vD,w);

	return true;
}

template <class T>
bool Graph<T>::addEdge(Transition *transition) {
	typename vector<Vertex<T>*>::iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::iterator ite= vertexSet.end();
	int found=0;
	Vertex<T> *vS, *vD;
	while (found!=2 && it!=ite ) {
		if ( (*it)->info.getID() == transition->getSrcId())
			{ vS=*it; found++;}
		if ( (*it)->info.getID() == transition->getDestId())
			{ vD=*it; found++;}
		it ++;
	}
	if (found!=2) return false;
	vD->indegree++;
	vS->addEdge(vD,transition->getWeigth());

	return true;
}

template <class T>
bool Graph<T>::removeEdge(const T &sourc, const T &dest) {
	typename vector<Vertex<T>*>::iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::iterator ite= vertexSet.end();
	int found=0;
	Vertex<T> *vS, *vD;
	while (found!=2 && it!=ite ) {
		if ( (*it)->info == sourc )
			{ vS=*it; found++;}
		if ( (*it)->info == dest )
			{ vD=*it; found++;}
		it ++;
	}
	if (found!=2)
		return false;

	vD->indegree--;

	return vS->removeEdgeTo(vD);
}




template <class T>
vector<T> Graph<T>::dfs() const {
	typename vector<Vertex<T>*>::const_iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::const_iterator ite= vertexSet.end();
	for (; it !=ite; it++)
		(*it)->visited=false;
	vector<T> res;
	it=vertexSet.begin();
	for (; it !=ite; it++)
	    if ( (*it)->visited==false )
	    	dfs(*it,res);
	return res;
}

template <class T>
void Graph<T>::dfs(Vertex<T> *v,vector<T> &res) const {
	v->visited = true;
	res.push_back(v->info);
	typename vector<Edge<T> >::iterator it= (v->adj).begin();
	typename vector<Edge<T> >::iterator ite= (v->adj).end();
	for (; it !=ite; it++)
	    if ( it->dest->visited == false ){
	    	dfs(it->dest, res);
	    }
}

template <class T>
vector<T> Graph<T>::bfs(Vertex<T> *v) const {
	vector<T> res;
	queue<Vertex<T> *> q;
	q.push(v);
	v->visited = true;
	while (!q.empty()) {
		Vertex<T> *v1 = q.front();
		q.pop();
		res.push_back(v1->info);
		typename vector<Edge<T> >::iterator it=v1->adj.begin();
		typename vector<Edge<T> >::iterator ite=v1->adj.end();
		for (; it!=ite; it++) {
			Vertex<T> *d = it->dest;
			if (d->visited==false) {
				d->visited=true;
				q.push(d);
			}
		}
	}
	return res;
}

template <class T>
int Graph<T>::maxNewChildren(Vertex<T> *v, T &inf) const {
	vector<T> res;
	queue<Vertex<T> *> q;
	queue<int> level;
	int maxChildren=0;
	inf =v->info;
	q.push(v);
	level.push(0);
	v->visited = true;
	while (!q.empty()) {
		Vertex<T> *v1 = q.front();
		q.pop();
		res.push_back(v1->info);
		int l=level.front();
		level.pop(); l++;
		int nChildren=0;
		typename vector<Edge<T> >::iterator it=v1->adj.begin();
		typename vector<Edge<T> >::iterator ite=v1->adj.end();
		for (; it!=ite; it++) {
			Vertex<T> *d = it->dest;
			if (d->visited==false) {
				d->visited=true;
				q.push(d);
				level.push(l);
				nChildren++;
			}
		}
		if (nChildren>maxChildren) {
			maxChildren=nChildren;
			inf = v1->info;
		}
	}
	return maxChildren;
}


template <class T>
Vertex<T>* Graph<T>::getVertex(const T &v) const {
	for(unsigned int i = 0; i < vertexSet.size(); i++)
		if (vertexSet[i]->info == v) return vertexSet[i];
	return nullptr;
}

template<class T>
void Graph<T>::resetIndegrees() {
	//colocar todos os indegree em 0;
	for(unsigned int i = 0; i < vertexSet.size(); i++) vertexSet[i]->indegree = 0;

	//actualizar os indegree
	for(unsigned int i = 0; i < vertexSet.size(); i++) {
		//percorrer o vector de Edges, e actualizar indegree
		for(unsigned int j = 0; j < vertexSet[i]->adj.size(); j++) {
			vertexSet[i]->adj[j].dest->indegree++;
		}
	}
}


template<class T>
vector<Vertex<T>*> Graph<T>::getSources() const {
	vector< Vertex<T>* > buffer;
	for(unsigned int i = 0; i < vertexSet.size(); i++) {
		if( vertexSet[i]->indegree == 0 ) buffer.push_back( vertexSet[i] );
	}
	return buffer;
}


template <class T>
void Graph<T>::dfsVisit() {
	typename vector<Vertex<T>*>::const_iterator it= vertexSet.begin();
	typename vector<Vertex<T>*>::const_iterator ite= vertexSet.end();
	for (; it !=ite; it++)
		(*it)->visited=false;
	it=vertexSet.begin();
	for (; it !=ite; it++)
	    if ( (*it)->visited==false )
	    	dfsVisit(*it);
}

template <class T>
void Graph<T>::dfsVisit(Vertex<T> *v) {
	v->processing = true;
	v->visited = true;
	typename vector<Edge<T> >::iterator it= (v->adj).begin();
	typename vector<Edge<T> >::iterator ite= (v->adj).end();
	for (; it !=ite; it++) {
		if ( it->dest->processing == true) numCycles++;
	    if ( it->dest->visited == false ){
	    	dfsVisit(it->dest);
	    }
	}
	v->processing = false;
}

template<class T>
vector<T> Graph<T>::topologicalOrder() {
	//vector com o resultado da ordenacao
	vector<T> res;

	//verificar se é um DAG
	if( getNumCycles() > 0 ) {
		return res;
	}

	//garantir que os "indegree" estao inicializados corretamente
	this->resetIndegrees();

	queue<Vertex<T>*> q;

	vector<Vertex<T>*> sources = getSources();
	while( !sources.empty() ) {
		q.push( sources.back() );
		sources.pop_back();
	}

	//processar fontes
	while( !q.empty() ) {
		Vertex<T>* v = q.front();
		q.pop();

		res.push_back(v->info);

		for(unsigned int i = 0; i < v->adj.size(); i++) {
			v->adj[i].dest->indegree--;
			if( v->adj[i].dest->indegree == 0) q.push( v->adj[i].dest );
		}
	}

	//testar se o procedimento foi bem sucedido
	if ( res.size() != vertexSet.size() ) {
		while( !res.empty() ) res.pop_back();
	}

	//garantir que os "indegree" ficam atualizados ao final
	this->resetIndegrees();

	return res;
}



template<class T>
vector<T> Graph<T>::getPath(const T &origin, const T &dest){

	list<T> buffer;
	Vertex<T>* v = getVertex(dest);

	buffer.push_front(v->info);
	while (v->path != NULL && v->path->info != origin) {
		v = v->path;
		buffer.push_front(v->info);
	}
	if (v->path != nullptr)
		buffer.push_front(v->path->info);


	vector<T> res;
	while( !buffer.empty() ) {
		res.push_back( buffer.front() );
		buffer.pop_front();
	}
	return res;
}


template<class T>
void Graph<T>::unweightedShortestPath(const T &s) {

	for(unsigned int i = 0; i < vertexSet.size(); i++) {
		vertexSet[i]->path = nullptr;
		vertexSet[i]->dist = INT_INFINITY;
	}

	Vertex<T>* v = getVertex(s);
	v->dist = 0;
	queue< Vertex<T>* > q;
	q.push(v);

	while( !q.empty() ) {
		v = q.front(); q.pop();
		for(unsigned int i = 0; i < v->adj.size(); i++) {
			Vertex<T>* w = v->adj[i].dest;
			if( w->dist == INT_INFINITY ) {
				w->dist = v->dist + 1;
				w->path = v;
				q.push(w);
			}
		}
	}
}

template<class T>
void Graph<T>::dijkstraShortestPath(const T &s) {

	for(unsigned int i = 0; i < vertexSet.size(); i++) {
		vertexSet[i]->path = nullptr;
		vertexSet[i]->dist = INT_INFINITY;
		vertexSet[i]->processing = false;
	}

	Vertex<T>* v = getVertex(s);
	v->dist = 0;

	vector< Vertex<T>* > pq;
	pq.push_back(v);

	make_heap(pq.begin(), pq.end());


	while( !pq.empty() ) {

		v = pq.front();
		pop_heap(pq.begin(), pq.end());
		pq.pop_back();

		for(unsigned int i = 0; i < v->adj.size(); i++) {
			Vertex<T>* w = v->adj[i].dest;

			if(v->dist + v->adj[i].weight < w->dist ) {

				w->dist = v->dist + v->adj[i].weight;
				w->path = v;

				//se j� estiver na lista, apenas a actualiza
				if(!w->processing)
				{
					w->processing = true;
					pq.push_back(w);
				}

				make_heap (pq.begin(),pq.end(),vertex_greater_than<T>());
			}
		}
	}
}

template<class T>
vector<set<T*> > Graph<T>::scc() {


	 //it holds vertices by finish time in reverse order.
	deque<Vertex<T>*> stack;

	//holds visited vertices for DFS.
	set<Vertex<T>*> visited;


    //populate stack with vertices with vertex finishing last at the top.
    for (unsigned int i = 0; i < vertexSet.size(); i++) {
    	Vertex<T>* vertex = vertexSet[i];
        if (visited.find(vertex) != visited.end()) {
            continue;
        }
        dfsUtil(vertex, &visited, &stack);
    }

    //reverse the graph.
     Graph<T> reverseGraph = this->getTranspose();

     //Do a DFS based off vertex finish time in decreasing order on reverse graph..
     visited.clear();
     vector<set<T*>> result;

     while (!stack.empty()) {
         Vertex<T>* vertex = reverseGraph.getVertex(stack.front()->info);

         stack.pop_front();

         if(visited.find(vertex)!=visited.end()){
             continue;
         }
         set<T*> set;
         dfsUtilRG(vertex, &visited, &set);
         result.push_back(set);

     }

     return result;

}




template<class T>
void Graph<T>::scc(Vertex<T> *v, vector<Vertex<T> *> temp) {
	v->visited = true;
	typename vector<Edge<T> >::iterator it= (v->adj).begin();
	typename vector<Edge<T> >::iterator ite= (v->adj).end();
	for (; it !=ite; it++)
		if ( it->dest->visited == false ){
			scc(it->dest, temp);
		}
	temp.push_back(v);

}

template<class T>
Graph<T> Graph<T>::getTranspose() {
	Graph<T> g = Graph();

	for(unsigned int i = 0; i < vertexSet.size(); i++){
		g.addVertex(vertexSet[i]->info);
	}


	for (unsigned int i = 0; i < vertexSet.size(); i++){
		Vertex<T>* v = vertexSet[i];

		typename vector<Edge<T> >::iterator it= (v->adj).begin();
		typename vector<Edge<T> >::iterator ite= (v->adj).end();
		for (; it !=ite; it++){
			g.addEdge(it->dest->info, v->info, it->weight);
		}
	}

	return g;
}

template<class T>
void Graph<T>::dfsUtil(Vertex<T>* v, set<Vertex<T>*>* visited, deque<Vertex<T>*>* stack) {
	visited->insert(v);

	typename vector<Edge<T> >::iterator it= (v->adj).begin();
	typename vector<Edge<T> >::iterator ite= (v->adj).end();

	for (; it !=ite; it++){
    	Vertex<T>* vertex = it->dest;
        if (visited->find(vertex) != visited->end()) {
            continue;
        }
        dfsUtil(vertex, visited, stack);
	}

	stack->push_front(v);
}


template<class T>
void Graph<T>::dfsUtilRG(Vertex<T>* v, set<Vertex<T>*>* visited, set<T*>*set) {

	visited->insert(v);
	set->insert(&v->info);

	typename vector<Edge<T> >::iterator it= (v->adj).begin();
	typename vector<Edge<T> >::iterator ite= (v->adj).end();

	for (; it !=ite; it++){
    	Vertex<T>* vertex = it->dest;
        if (visited->find(vertex) != visited->end()) {
            continue;
        }
        dfsUtilRG(vertex, visited, set);
	}
}

template <class T>
vector<T*> Graph<T>::calcRoute(set<T*> places, vector<T*>* clients, T* start)  {


	cout << "Here" << endl;

	vector<T*> res;
	Graph subGraph = Graph();

	vector<Vertex<T>*> vertices = getVertexFromSet(places);

	typename set<T*>::iterator it;


	for(it = places.begin(); it!=places.end(); it++){
		T place = *(*it);
		subGraph.addVertex(place);
	}

	cout << "Here" << endl;

	for (unsigned int i = 0; i < vertices.size(); i++){
		Vertex<T>* vertex = vertices.at(i);

		typename vector<Edge<T> >::iterator it= (vertex->adj).begin();
		typename vector<Edge<T> >::iterator ite= (vertex->adj).end();

		for (; it !=ite; it++){
			if(places.find(&it->dest->info)!=places.end())
				subGraph.addEdge(vertex->info ,it->dest->info, it->weight);
		}

	}

	cout << "Solved" << endl;

	res = solveGreedy(clients, start);

	return res;
}

template <class T>
vector<Vertex<T>*>  Graph<T>::getVertexFromSet(const set<T*> places ) const {

	vector<Vertex<T>*> res;

	typename set<T*>::iterator it;
	for(it = places.begin(); it!=places.end(); it++){
		T place = *(*it);
		Vertex<T>* vertex = getVertex(place);
		res.push_back(vertex);
	}

	return res;
}


template <class T>
vector<T*> Graph<T>::solveGreedy(vector<T*>* clients, T* start)  {

	vector<T*> res;
	T* best;

	int capacity = 50;

	while(capacity > 0){

	dijkstraShortestPath(*start);

	double distance = numeric_limits<double>::max();

	for (unsigned int i = 0; i < clients->size(); i++){
		T* node = clients->at(i);
		vector<T> path = getPath(*start, *node);

		double tempdist = 0;

		for(unsigned int j = 0; j < path.size(); j++){
			tempdist += getDistance(path);
		}

		if(tempdist < distance){
			distance = tempdist;
			best = node;
		}

	}

	res.push_back(best);
	capacity -= best->getShoppingSize();
	start = best;
	clients->erase(remove(clients->begin(), clients->end(), best));

	}

	return res;


}


template <class T>
double Graph<T>::getDistance(vector<T> path){
	double res = 0;
	for(unsigned int i = 0; i < path.size()-1; i++){
		T node = path.at(i);
		T nextNode = path.at(i++);
		res += node.getDistance(&nextNode);
	}
}

template<class T>
Graph<T>::Graph() {
}


#endif /* GRAPH_H_ */
