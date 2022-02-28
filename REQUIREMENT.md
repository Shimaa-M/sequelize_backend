#### "name": "get all products"
	"method": "GET"
	"url":  "http://localhost:3000/products"
#### "name": "edit product",				
	"method": "PATCH",
	"url": "http://localhost:3000/products/1"
#### "name": "get one product"
	"method": "GET"
	"url": "http://localhost:3000/products/4"
#### "name": "delete product"		
	"method": "DELETE"
	"url": "http://localhost:3000/products/4"
#### "name": "create product"
	"method": "POST"
    "url": "http://localhost:3000/products/"


#### "name": "get all orders"
	"method": "GET"
    "url": "http://localhost:3000/orders"
#### "name": "edit order"
	"method": "PATCH"					
    "url": "http://localhost:3000/orders/3"
#### "name": "get one order"
	"method": "GET"
    "url": "http://localhost:3000/orders/2"
#### "name": "delete order"
	"method": "DELETE"
	"url": "http://localhost:3000/orders/1"
#### "name": "create order"
	"method": "POST"
    "url": "http://localhost:3000/orders/"

#### "name": "get all users"
    "method": "GET"
    "url": "http://localhost:3000/users/"
#### "name": "edit user"
	"method": "PATCH",
	"url": "http://localhost:3000/users/2"
#### "name": "get one user"
	"method": "GET"
    "url": "http://localhost:3000/users/1"
#### "name": "delete user"
	"method": "DELETE",
	"url": "http://localhost:3000/users/1"
#### "name": "login"
	"method": "POST"
    "url": "http://localhost:3000/login/"
#### "name": "create user"
	"method": "POST"
    "url": "http://localhost:3000/users/"

#### "name": "products in orders"
	"method": "GET"
    "url": "http://localhost:3000/products_in_orders/"
#### "name": "get products of one order",
	"method": "GET"
    "url": "http://localhost:3000/order/2/products"

### Data shape
#### Products
```
id integer primary key
name string
price int
```
#### Orders
```
id integer priamry key
status string
user_id foreign key from user table 
```
#### Users
```
id integer priamry key
name string
email string
password
```
#### orderProducts
```
id integer priamry key
ProductId foreign key from Products table
OrderId foreign key from Orders table
quantity integer 
```
