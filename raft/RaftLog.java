package raft;

import java.io.Serializable;

class RaftLog<T extends Serializable> {
	RaftCommand command;
	T entry;
	Long term = 0L;
}
