package home;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class RobinhoodTimeDeserializer extends JsonDeserializer<LocalTime> {
    private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Override
    public LocalTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        try {
            return LocalTime.parse(jsonParser.getText(), DTF);
        }
        catch (Exception ex) {
            return null;
        }
    }
}
