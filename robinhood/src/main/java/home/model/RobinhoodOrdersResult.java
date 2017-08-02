package home.model;

import java.util.List;

public class RobinhoodOrdersResult {
    private String previous;
    private List<RobinhoodOrderResult> results;
    private String next;

    public String getPrevious() {
        return previous;
    }

    public void setPrevious(String previous) {
        this.previous = previous;
    }

    public List<RobinhoodOrderResult> getResults() {
        return results;
    }

    public void setResults(List<RobinhoodOrderResult> results) {
        this.results = results;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }
}
