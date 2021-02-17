# Aplicacion NodeJS eCommerce Payments

```
EndPoints:
    Payments:
        GET  /api/payment                  -> Retorna lista con todos los clientes con sus respectivos creditos por tienda en un array.
        GET  /api/payment/:email           -> Retorna objeto con un cliente y sus respectivos creditos por tienda en un array.
        GET  /api/payment/:email/:shop     -> Retorna un el valor de los creditos acumulados en una tienda por un cliente.
        POST /api/payment/add-credits      -> Recibe como body: {emailUser, shop, credit}. Añade creditos y retorna el objeto creado.
        POST /api/payment/remove-credits   -> Recibe como body: {emailUser, shop, credit}. Descuenta creditos y retorna el objeto creado.

    Users:
        GET     /api/user         -> Retorna lista con todos los clientes.
        GET     /api/user/:id     -> Retorna objeto con un cliente.
        POST    /api/user         -> Recibe como body: {email}. Crea y Retorna un objeto con el nuevo cliente.
        DELETE  /api/user/:id     -> Elimina y retorna un objeto con el cliente eliminado.

    Shops:
        GET     /api/shop         -> Retorna lista con todas las tiendas.
        GET     /api/shop/:id     -> Retorna objeto con una tienda.
        POST    /api/shop/        -> Recibe como body: {name}. Crea y Retorna un objeto con la nueva tienda.
        DELETE  /api/shop/:id     -> Elimina y retorna un objeto con la tienda eliminada.

```





