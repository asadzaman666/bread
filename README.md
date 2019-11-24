# Bread
#### Expense Management REST API

A basic client app is also available. [Bread-Client](https://breadprototype.surge.sh/)

Bread uses JWT for authentication. All the requests needs to add authorization header in order to get the resposne. Access token is sent by server after a succesful login. Token expires after 48 hour.

###### Signup

**POST**  _https://breadapp-test.herokuapp.com/signup_

```javascript
// username & email are unique values
{
    "username": "Simon", 
    "email": "simon@yahoo.com",
    "password": "easy_password"
}
```

###### Login

**POST**  _https://breadapp-test.herokuapp.com/login_
```javascript
{
    "email": "simon@yahoo.com",
    "password": "easy_password"
}
```

Following API's need access token to function properly
```javascript
Authorization: Bearer <ACCESS TOKEN>
```

###### Refresh Token

**GET**  _https://breadapp-test.herokuapp.com/token/extend_

Returns a new access token for use.

###### Get all the expenses

**GET**  _https://breadapp-test.herokuapp.com/expenses_ 

###### Create new expense

**POST**  _https://breadapp-test.herokuapp.com/expenses_ 

###### Get one expense

**GET**  _https://breadapp-test.herokuapp.com/expenses/id_ 

###### Update one expense 

**PATCH**  _https://breadapp-test.herokuapp.com/expenses/id_

###### Delete one expense 

**DELETE**  _https://breadapp-test.herokuapp.com/expenses/id_ 
