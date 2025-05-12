# Sprawozdanie z zadania 1 z części dodatkowej

## 1. Sprawdzenie zagrożeń o poziomie CRITICAL oraz HIGH
Do sprawdzenia zagrożeń zostało wykorzystane narzędzie Trivy. Zostało użyte polecenie: 
```shell 
trivy image  weather-app:latest
```
Wynik działania polecenia:
![Wynik polecenia build](img/trivy.PNG)
W sprawdzanym obrazie nie został wykryte podatności na zagrożenia.
## 2. Polecenie uruchamiające kontener
```shell
docker run -d --name weather-app -p 3000:3000 weather-app:latest
```
Wynik działania polecenia
![Uruchomienie kontenera](img/uruchomienie_kontenera.PNG)

## 3. Wyświetlenie informacji z logów aplikacji
```shell
docker logs weather-app
```
Wynik działania polecenia
![informacje z logow](img/informacje_z_logow.PNG)

## 4. Wyświetlenie rozmiaru obrazu
```shell
docker images weather-app:latest --format "{{.Repository}}: {{.Size}}"
```
Wynik działania polecenia
![rozmiar aplikacji](img/rozmiar_aplikacji.PNG)

## 5. Wyświetlenie ilości warstw
```shell
docker image history weather-app:latest --format "{{.ID}}" | wc -l
```
Wynik działania polecenia
![ilosc warstwl](img/ilosc_warstw.PNG)

## 6. Działanie aplikacji
Aplikacja działa pod adresem: 
```shell
http://localhost:3000/
```

![dzialanie aplikacji](img/uruchomiona_aplikacja.PNG)
