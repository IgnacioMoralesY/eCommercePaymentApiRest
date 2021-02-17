# Aplicacion NodeJS eCommerce Payments

```
EndPoints:
    GET  /api/payments                  -> Retorna lista con todos los clientes con sus respectivos creditos por tienda en un array.
    GET  /api/payments/EmailUser        -> Retorna objeto con un cliente y sus respectivos creditos por tienda en un array.
    GET  /api/payments/EmailUser/Shop   -> Retorna un el valor de los creditos acumulados en una tienda por un cliente.
    POST /api/payments/remove-credits   -> Recibe como body: {EmailUser, Shop}. Añade creditos y retorna la suma total de estos.
    POST /api/payments/remove-credits   -> Recibe como body: {EmailUser, Shop}. Descuenta creditos y retorna la suma total de estos.

```





