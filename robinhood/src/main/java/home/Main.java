package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        if (Stream.of(args).noneMatch(a -> a.startsWith("--username="))
                || Stream.of(args).noneMatch(a -> a.startsWith("--password="))) {
            System.err.println("--username and/or --password are missing");
            System.exit(-1);
        }

        ApplicationContext ac = SpringApplication.run(Main.class, args);
        AuthenticationService as = ac.getBean(AuthenticationService.class);
        as.login();
        try { Thread.sleep(5000L); } catch (Exception ex) { /* who cares */ }
        as.logout();
    }

    @Bean public AuthenticationService authenticationService(ObjectMapper objectMapper) {
        return new AuthenticationService(objectMapper);
    }

    @Bean public AccountService accountService(AuthenticationService as, ObjectMapper objectMapper) {
        return new AccountService(as, objectMapper);
    }
}
