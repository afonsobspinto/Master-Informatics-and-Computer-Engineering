package raft;

import java.io.Serializable;
import java.util.concurrent.CompletableFuture;

class RaftLog<T extends Serializable> {
	T entry;
	Integer term = 0;
	CompletableFuture<Boolean> request = new CompletableFuture<>();

	RaftLog() {
	}

	RaftLog(T entry, Integer term) {
		this.entry = entry;
		this.term = term;
	}

	Boolean get() {
		try {
			return request.get();
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return false;
	}

	void set(Boolean value) {
		request.complete(value);
	}
}
