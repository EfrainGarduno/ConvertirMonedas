import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ConsultarMoneda {
    public MonedaConvertida buscaMoneda(String origen, String destino){
        String miurl="https://v6.exchangerate-api.com/v6/9a083f48aeb91a815092d45b/pair/"+origen+"/"+destino;
        Gson gson=new GsonBuilder().
                setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
                .setPrettyPrinting(). // Este parametro formatea bonito el Json
                        create();

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(miurl))
                .build();

        try {
            HttpResponse<String> response = client
                    .send(request, HttpResponse.BodyHandlers.ofString());
            String cadena=response.body();
            return  new  Gson().fromJson(response.body(),MonedaConvertida.class);
        } catch (Exception e) {
            throw new RuntimeException("No se pudo hacer la conversión de las monedas");
        }


    }
}
