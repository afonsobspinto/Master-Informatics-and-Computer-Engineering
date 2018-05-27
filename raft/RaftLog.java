package raft;

public class RaftLog<T> {
	private T entry;
	private Long term = 0L;
}
