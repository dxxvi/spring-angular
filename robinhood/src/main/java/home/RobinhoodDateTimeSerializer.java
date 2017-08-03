package home;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RobinhoodDateTimeSerializer extends JsonSerializer<LocalDateTime> {
    private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("MM-dd HH:mm:ss");

    @Override public void serialize(LocalDateTime localDateTime, JsonGenerator jg,
                                    SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jg.writeString(localDateTime.format(DTF));
    }
}
