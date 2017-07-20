package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
public class Main {
    public static void main(String[] args) {
        if (Stream.of(args).noneMatch(a -> a.startsWith("--username="))
                || Stream.of(args).noneMatch(a -> a.startsWith("--password="))) {
            System.err.println("--username and/or --password are missing");
            System.exit(-1);
        }

        ApplicationContext ac = SpringApplication.run(Main.class, args);
/*
        AuthenticationService as = ac.getBean(AuthenticationService.class);
        as.login();
        AccountService accountService = ac.getBean(AccountService.class);
        accountService.accountUrl();
        as.logout();
*/
        QuoteService quoteService = ac.getBean(QuoteService.class);
        Collection<Quote> quotes = quoteService.quotes(Arrays.asList("UMTB", "ON"));
        quotes.clear();
    }

    @Bean public AuthenticationService authenticationService(ObjectMapper objectMapper) {
        return new AuthenticationService(objectMapper);
    }

    @Bean public AccountService accountService(AuthenticationService as, ObjectMapper objectMapper) {
        return new AccountService(as, objectMapper);
    }

    @Bean public QuoteService quoteService(ObjectMapper objectMapper) {
        return new QuoteService(objectMapper);
    }
}
