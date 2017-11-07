package home.model;

import java.util.List;

public class RobinhoodInstrumentsResult {
    private String previous;
    private List<RobinhoodInstrumentResult> results;
    private String next;

    public String getPrevious() {
        return previous;
    }

    public void setPrevious(String previous) {
        this.previous = previous;
    }

    public List<RobinhoodInstrumentResult> getResults() {
        return results;
    }

    public void setResults(List<RobinhoodInstrumentResult> results) {
        this.results = results;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }
}
