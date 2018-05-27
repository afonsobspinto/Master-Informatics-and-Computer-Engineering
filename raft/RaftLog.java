package raft;

import java.io.Serializable;

public class RaftLog<T extends Serializable> {
	// TODO add
	private T entry;
	private Long term = 0L;
}
