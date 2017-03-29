#include "graphviewer.h"
#include <string>
#include<sstream>

#ifdef linux
pid_t GraphViewer::procId = NULL;
#endif
short GraphViewer::port = 7772;

GraphViewer::GraphViewer(int width, int height, bool dynamic) {
	initialize(width, height, dynamic, GraphViewer::port);
	++GraphViewer::port;
}

GraphViewer::GraphViewer(int width, int height, bool dynamic, int port_n) {
	initialize(width, height, dynamic, port_n);
}

void GraphViewer::initialize(int width, int height, bool dynamic, int port_n) {
	this->width = width;
	this->height = height;
	this->isDynamic = dynamic;
	string command = "java -jar GraphViewerController.jar";
	std::stringstream ss;
	ss << port_n;
	string port_string = ss.str();
	command += " --port ";
	command += port_string;

#ifdef linux
	if (!(procId = fork())) {
		system(command.c_str());
		kill(getppid(), SIGINT);
		exit(0);
	}
	else {
		usleep(2000000);
		con = new Connection(port_n);

		char buff[200];
		sprintf(buff, "newGraph %d %d %s\n", width, height, (dynamic?"true":"false"));
		string str(buff);
		con->sendMsg(str);
	}
#else
	STARTUPINFO si;
	PROCESS_INFORMATION pi;
	ZeroMemory( &si, sizeof(si) );
	si.cb = sizeof(si);
	ZeroMemory( &pi, sizeof(pi) );
	LPSTR command_lpstr = const_cast<char *>(command.c_str());
	if( !CreateProcess( NULL,   // No module name (use command line)
			command_lpstr,        // Command line
			NULL,           // Process handle not inheritable
			NULL,           // Thread handle not inheritable
			FALSE,          // Set handle inheritance to FALSE
			0,              // No creation flags
			NULL,           // Use parent's environment block
			NULL,           // Use parent's starting directory
			&si,            // Pointer to STARTUPINFO structure
			&pi )           // Pointer to PROCESS_INFORMATION structure
	) {
		cerr << "CreateProcess failed " << GetLastError() << endl;
		return;
	}

	// Close process and thread handles.
	CloseHandle( pi.hProcess );
	CloseHandle( pi.hThread );

	Sleep(2000);
	con = new Connection(port_n);

	char buff[200];
	sprintf(buff, "newGraph %d %d %s\n", width, height, (dynamic?"true":"false"));
	string str(buff);
	con->sendMsg(str);
#endif

}

bool GraphViewer::createWindow(int width, int height) {
	char buff[200];
	sprintf(buff, "createWindow %d %d\n", width, height);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::closeWindow() {
	char buff[200];
	sprintf(buff, "closeWindow\n");
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::addNode(int id) {
	if(!isDynamic) {
		cerr << "This graph is not dynamic,"
				"so you must use GraphViewer::addNode(int id, int x, int y) instead.\n"
				"The node " << id << " will be ignored" << endl;

		return false;
	}


	char buff[200];
	sprintf(buff, "addNode1 %d\n", id);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::addNode(int id, int x, int y) {
	if(isDynamic) {
		cerr << "This graph is dynamic, "
				"so the provided x and y values for the node with id "
				<< id << " will be ignored" << endl;
	}

	char buff[200];
	sprintf(buff, "addNode3 %d %d %d\n", id, x, y);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::addEdge(int id, int v1, int v2, int edgeType) {
	char buff[200];
	sprintf(buff, "addEdge %d %d %d %d\n", id, v1, v2, edgeType);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setEdgeLabel(int k, string label) {
	char buff[200];
	sprintf(buff, "setEdgeLabel %d %s\n", k, label.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setVertexLabel(int k, string label) {
	char buff[200];
	sprintf(buff, "setVertexLabel %d %s\n", k, label.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::defineEdgeColor(string color) {
	char buff[200];
	sprintf(buff, "defineEdgeColor %s\n", color.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::removeNode(int id) {
	char buff[200];
	sprintf(buff, "removeNode %d\n", id);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::removeEdge(int id) {
	char buff[200];
	sprintf(buff, "removeEdge %d\n", id);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setEdgeColor(int k, string color) {
	char buff[200];
	sprintf(buff, "setEdgeColor %d %s\n", k, color.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::defineEdgeDashed(bool dashed) {
	char buff[200];
	sprintf(buff, "defineEdgeDashed %s\n", dashed? "true" : "false");
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setEdgeDashed(int k, bool dashed) {
	char buff[200];
	sprintf(buff, "setEdgeDashed %d %s\n", k, dashed? "true" : "false");
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::defineEdgeCurved(bool curved) {
	char buff[200];
	sprintf(buff, "defineEdgeCurved %s\n", curved? "true" : "false");
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setEdgeThickness(int k, int thickness) {
	char buff[200];
	sprintf(buff, "setEdgeThickness %d %d\n", k, thickness);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::defineVertexColor(string color) {
	char buff[200];
	sprintf(buff, "defineVertexColor %s\n", color.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setVertexColor(int k, string color) {
	char buff[200];
	sprintf(buff, "setVertexColor %d %s\n", k, color.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::defineVertexIcon(string filepath) {
	char buff[200];
	sprintf(buff, "defineVertexIcon %s\n", filepath.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setVertexIcon(int k, string filepath) {
	char buff[200];
	sprintf(buff, "setVertexIcon %d %s\n", k, filepath.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::defineVertexSize(int size) {
	char buff[200];
	sprintf(buff, "defineVertexSize %d\n", size);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setVertexSize(int k, int size) {
	char buff[200];
	sprintf(buff, "setVertexSize %d %d\n", k, size);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setBackground(string path) {
	char buff[200];
	sprintf(buff, "setBackground %s\n", path.c_str());
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setEdgeWeight(int id, int weight) {
	char buff[200];
	sprintf(buff, "setEdgeWeight %d %d\n", id, weight);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::setEdgeFlow(int id, int flow) {
	char buff[200];
	sprintf(buff, "setEdgeFlow %d %d\n", id, flow);
	string str(buff);
	return con->sendMsg(str);
}

bool GraphViewer::rearrange() {
	return con->sendMsg("rearrange\n");
}
