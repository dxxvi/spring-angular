package home;

import java.io.Serializable;

/**
 * Created by ly on 1/5/17
 */
public class Data implements Serializable {
    private String textarea;
    private String wgetimg;

    public String getTextarea() {
        return textarea;
    }

    public void setTextarea(String textarea) {
        this.textarea = textarea;
    }

    public String getWgetimg() {
        return wgetimg;
    }

    public void setWgetimg(String wgetimg) {
        this.wgetimg = wgetimg;
    }

    @Override
    public String toString() {
        return "Data {" +
                "textarea='" + textarea + '\'' +
                ", wgetimg='" + wgetimg + '\'' +
                '}';
    }
}
