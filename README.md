# Bread
#### Expense Management REST API

A basic client app is also available. [Bread-Client](https://breadprototype.surge.sh/)

Bread uses JWT for authentication. All the requests needs to add authorization header in order to get the resposne. Access token is sent by server after a succesful login. Token expires after 48 hour.

Following API's need access token to function properly
```javascript
Authorization: Bearer <ACCESS TOKEN>
```
###### Refresh Token

**GET**  _https://breadapp-test.herokuapp.com/token/extend_

Refresh Token returns a new token for use.

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
