package in.samrasyafudz.orderservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class UserServiceClient {

    private final RestClient restClient;

    public UserServiceClient(@Value("${user-service.url}") String userServiceUrl) {
        this.restClient = RestClient.builder().baseUrl(userServiceUrl).build();
    }

    public AddressDto getAddress(Long addressId, String bearerToken) {
        return restClient.get()
                .uri("/api/users/me/addresses/{id}", addressId)
                .header(HttpHeaders.AUTHORIZATION, bearerToken)
                .retrieve()
                .body(AddressDto.class);
    }
}