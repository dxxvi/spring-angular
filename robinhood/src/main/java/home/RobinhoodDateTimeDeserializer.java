package home;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RobinhoodDateTimeDeserializer {
    public static class ForRobinhood  extends JsonDeserializer<LocalDateTime> {
        private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");

        @Override
        public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
                throws IOException, JsonProcessingException {
            try {
                return LocalDateTime.parse(jsonParser.getText(), DTF);
            } catch (Exception ex) {
                return null;
            }
        }
    }

    public static class ForQuote  extends JsonDeserializer<LocalDateTime> {
        private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");

        @Override
        public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
                throws IOException, JsonProcessingException {
            try {
                return LocalDateTime.parse(jsonParser.getText(), DTF);
            } catch (Exception ex) {
                return null;
            }
        }
    }
}
