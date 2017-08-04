package home.model;

import java.util.List;

public class RobinhoodPositionsResult {
    private String previous;
    private List<RobinhoodPositionResult> results;
    private String next;

    public String getPrevious() {
        return previous;
    }

    public void setPrevious(String previous) {
        this.previous = previous;
    }

    public List<RobinhoodPositionResult> getResults() {
        return results;
    }

    public void setResults(List<RobinhoodPositionResult> results) {
        this.results = results;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }
}
