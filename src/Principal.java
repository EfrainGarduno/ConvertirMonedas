import java.util.Scanner;

public class Principal {

    public static void main(String[] args) {
        Scanner teclado=new Scanner(System.in);
        String origen="";
        String destino="";
        pintaMenu();
        while (true){
            var moneda=teclado.nextInt();
            if (moneda==0){
                break;
            } else if (moneda==1) {
                origen="USD";
                destino="EUR";
            } else if (moneda==2) {
                origen="EUR";
                destino="USD";
            }else if (moneda==3) {
                origen="USD";
                destino="JPY";
            } else if (moneda==4) {
                origen="BRL";
                destino="USD";
            }else if (moneda==5) {
                origen="GBP";
                destino="USD";
            } else if (moneda==6) {
                origen="AUD";
                destino="BRL";
            }else if (moneda==7) {
                origen="USD";
                destino="MXN";
            }else if (moneda==8) {
                origen="MXN";
                destino="GBP";
            }

            ConsultarMoneda consultar=new ConsultarMoneda();
            MonedaConvertida convertida=consultar.buscaMoneda(origen,destino);
            String cadena =convertida.toString();
            pintaMenu();
            System.out.println("Seleccionaste opción "+moneda);
            System.out.println(origen+" Convertido a "+destino+" es="+    cadena.substring(cadena.indexOf("=")+1,cadena.length()-1));
        }
        System.out.println(">>>>>>>> Gracias por utilizar el conversor de monedas");
    }

    private static void pintaMenu() {
        System.out.println("****************************************\n");
        System.out.println("********* CONVERSOR DE MONEDAS**********");
        System.out.println("1. Dolares (USD) a Euros (EUR)");
        System.out.println("2. Euros (EUR) a Dolares Americanos (USD)");
        System.out.println("3. Dolares (USD) a Yen Japones (JPY)");
        System.out.println("4. Real Brasileño (BRL) a Dolares Americanos (USD)");
        System.out.println("5. Libra Esterlina (GBP) a Dolares Americanos (USD)");
        System.out.println("6. Dolar Australiano (AUD) a Real Brasileño (BRL)");
        System.out.println("7. Dolar Americano (USD) a Peso Mexicano (MXN)");
        System.out.println("8. Peso Mexicano (MXN) Libra Esterlina (GBP)");
        System.out.println(" Escriba un numero de opcion ó  0 para  Salir");
    }
}