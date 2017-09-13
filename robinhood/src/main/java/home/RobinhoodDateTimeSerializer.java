package home;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RobinhoodDateTimeSerializer {
    public static class ForOrder extends JsonSerializer<LocalDateTime> {
        private final DateTimeFormatter DTF1 = DateTimeFormatter.ofPattern("M/d HH:mm:ss");
        private final DateTimeFormatter DTF2 = DateTimeFormatter.ofPattern("HH:mm:ss");

        @Override
        public void serialize(LocalDateTime x, JsonGenerator jg,
                              SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
            DateTimeFormatter dtf = DTF1;
            LocalDateTime now = LocalDateTime.now();
            if (now.getDayOfMonth() == x.getDayOfMonth() && now.getMonthValue() == x.getMonthValue() && now.getYear() == x.getYear()) {
                dtf = DTF2;
            }

            jg.writeString(x.format(dtf));
        }
    }

    public static class ForQuote extends JsonSerializer<LocalDateTime> {
        private final DateTimeFormatter DTF3 = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
        @Override
        public void serialize(LocalDateTime x, JsonGenerator jsonGenerator,
                              SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
            jsonGenerator.writeString(x.format(DTF3));
        }
    }
}
