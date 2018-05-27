package raft;

import java.io.Serializable;

public class RaftLog<T extends Serializable> {
	private T entry;
	private Long term = 0L;
}
