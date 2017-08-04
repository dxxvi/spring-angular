package home;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RobinhoodDateTimeSerializer extends JsonSerializer<LocalDateTime> {
    private final DateTimeFormatter DTF1 = DateTimeFormatter.ofPattern("M/d HH:mm:ss");
    private final DateTimeFormatter DTF2 = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Override public void serialize(LocalDateTime x, JsonGenerator jg,
                                    SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        DateTimeFormatter dtf = DTF1;
        LocalDateTime now = LocalDateTime.now();
        if (now.getDayOfMonth() == x.getDayOfMonth() && now.getMonthValue() == x.getMonthValue() && now.getYear() == x.getYear()) {
            dtf = DTF2;
        }

        jg.writeString(x.format(dtf));
    }
}
