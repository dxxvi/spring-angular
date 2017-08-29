package home;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class RobinhoodTimeSerializer extends JsonSerializer<LocalTime> {
    private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Override public void serialize(LocalTime localTime, JsonGenerator jsonGenerator,
                                    SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeString(localTime.format(DTF));
    }
}
