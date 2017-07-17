package home;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import static java.nio.file.StandardOpenOption.*;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Stock {
    @Test public void test() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");

        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class, SymbolData.class);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> re =
                restTemplate.getForEntity("https://raw.githubusercontent.com/dxxvi/stocks/master/daily-data.json", String.class);
//        System.out.printf("Status: %s\nResult: %s\n", re.getStatusCode().name(), re.getBody());
        if (re.getStatusCode() == HttpStatus.OK) {
            List<SymbolData> githubList = objectMapper.readValue(re.getBody(), type);

            String stocks = Stream.of("AMD", "COG", "HZNP", "OCLR", "GRPN", "VALE", "CY", "BPFH", "BAC", "ON",
                    "ASX", "SNAP", "NRZ", "MTG", "CREE", "WLL", "INTC", "GTXI", "MAT", "TWTR", "BBRY", "HMC", "HTZ", "S", "M", "CSCO",
                    "HP", "SBUX", "GE", "MAC", "USO", "NFX").collect(Collectors.joining(","));
            re = restTemplate.getForEntity("http://www.enclout.com/api/v1/yahoo_finance/show.json?auth_token=zzKDQdtDJWdcAbc582TW&text=" + stocks,
                    String.class);
//            System.out.printf("Status: %s\nResult: %s\n", re.getStatusCode().name(), re.getBody());
            if (re.getStatusCode() == HttpStatus.OK) {
                List<SymbolData> currentList = objectMapper.readValue(re.getBody(), type);
                Set<SymbolData> set = new TreeSet<>();
                set.addAll(githubList);
                set.addAll(currentList);

                Files.write(
                        Paths.get("/home/ly/IdeaProjects/stocks/daily-data.json"),
                        Collections.singleton(objectMapper.writeValueAsString(set).replaceAll("\\},\\{", "\\},\n  \\{")),
                        CREATE, TRUNCATE_EXISTING
                );
            }
        }
    }

    @Test public void f() throws Exception {
        File d = new File("/dev/shm/book");
        for (File f : d.listFiles(pathname -> pathname.isFile() && pathname.getAbsolutePath().endsWith(".jpg"))) {
            BufferedImage bi = ImageIO.read(f);
            int w = bi.getWidth();
            int h = bi.getHeight();
            System.out.printf("convert -crop %dx%d+1+1 %s tmp.jpg && mv tmp.jpg %s\n", w-2, h-2, f.getName(), f.getName());
        }
    }
}
