### Demo #1 - Users

#### GraphQL Server Setup
* npm install --save express express-graphql graphql lodash

#### Basic Server - server.js

```javascript
const express = require('express');
const expressGraphQL = require('express-graphql'); 

const app = express();

app.use('/graphql', expressGraphQL({
	graphiql: true
}));

app.listen(4000, ()=> {
	console.log('Listening...');
})


```

#### Schema setup - Schema is one fo the most important parts of GraphQL

* mkdir schema

* cd schema && touch schema.js ... schema.js will have everything needed to tell graphql the shape of the data.

* in the schema.js file const `graphql = require('graphql');`

* We're going to setup with GraphQLObjectType

* When defining these, we always need a "name" property (always a string defining the type) and "fields" property (it is an object) 
  
* The keys of the fields are the fields (ie. id, firstName, age etc.) each "name" property has (ie. User)

* This tells us every User will have id, firstName 

* Note: at the top of the schema.js file we are destrucuring some object parameters from the library `const graphql = require('graphql');`

```javascript
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = graphql;
```

* Next we set the value for each to an object and define a type property

```javascript
const UserType = new GraphQLObjectType({
	name: 'User';
	fields: {
		id: {type:GraphQLString},
		firstName: {type:GraphQLString},
		age: {type:GraphQLInt} 
	}
})
```

#### Root Queries

* Root query is an entry point into data.
* In schema.js
* `const RootQuery = new GraphQLObjectType({` (...)

* If queried for the id of the user, it returns a user back

```javascript
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: {type:GraphQLString}},
			resolve(parentValue, args) {
				
			}
		}
	}
})

```

* `args` is arguments required for a root query. It gets passed with the initial query
* `resolve(parentValue, args)` MOST IMPORTANT PART of this query -- resolve actually queries server for the data
  
#### Resolve

* We're going to fill in the users, starting with hard coding it.

```javascript
const users = [
	{id:'23', firstName:'Chris',age:20},
	{id:'45', firstName:'Bob',age:18},
	{id:'52', firstName:'Mike',age:50}
];
```

* Update inside the resolve function to:

```javascript
	resolve(parentValue, args) {
		return _.find(users,{ id:args.id })
	}
```

* So what we're doing is: (1) taking the 2 types (UserType and RootQuery), (2) merge them into a GraphQL schema object, and (3) hand that back to the middleware in the schema.js file.

#### GraphQLSchema

* However FIRST, import a helper from the graphql library GraphQLSchema

```javascript
new GraphQLSchema({
	query: RootQuery
})
```

* We want to export to other parts of the application

```javascript
module.exports = new GraphQLSchema({
	query: RootQuery
})
```

* Import into server.js file and add schema to the middleware.
```javascript
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}));
```

* Restart server `node server.js`

* Visit URL: http://localhost:4000/graphql

* You should have a GraphiQL query console

-------------

#### GraphiQL tool

```
{
  user(id: "23") {
    id,
	 firstName,
	 age
  }
}
```

* Hit play > and you should get the data.
* Note the query above looks like JS but it's not JS.
* To be clear what is going on-- 
	* We're passing the query with an argument to the RootQueryType
	* It finds that we specified a user 
	* and then resolves the argument

* If you query for a user id that doesn;t exist you'll get back null
* If you do not provide an argument you will get an expected (field) ... error. It was expecting a name in the argument.
  

#### Using a Live Data Source

* SMALL PROJECTS: We can connect to the Express/GraphQL server and then to a database.
* LARGER PROJECTS: Connect to Express/GraphQL server > connect to APIs that then connect to other servers

So the Express server will receive the query, reach out to another API with a network request, get the data, assemble the response and return to the GraphQL client.

* So we are going to make a separate server for the outisde API
* We are using JSON Server - https://github.com/typicode/json-server

#### JSON Server module

* Install Module - `npm install --save json-server`
* Create db.json file
* Start JSON Server
* Now if you go to http://localhost:3000/posts/1,

```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1

GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile

// Use . to access deep properties

GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode

// Use _page and optionally _limit to paginate returned data.

GET /posts?_page=7
GET /posts?_page=7&_limit=20

// Add _gte or _lte for getting a range

GET /posts?views_gte=10&views_lte=20

// Add _ne to exclude a value

GET /posts?id_ne=1

// Add _like to filter (RegExp supported)

GET /posts?title_like=server


GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc

... SEE MORE OPTIONS ON JSON SERVER PAGE ... 

```

* Install JSON Server and db.json.
* Remember it;s a JSON file, so JSON conventions apply:
```
{
"users":[
	{"id":"23","firstName":"Bill","age":40},
	{"id":"24","firstName":"Mike","age":24},
	{"id":"25","firstName":"John","age":30}
]
}
```

* This is decoupled deparately from the GraphQL file

* Add helper function in the npm module
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "json:server":"json-server --watch db.json"
  },
```

* Now run: `npm json:server`
* URL: http://localhost:3000/
  

#### Async Resolve

* We hardcoded the user query originally to an aray in the schema.
* Now we have to use an async promise.
* Nearly all data fecthing in GraphQL will be async.
* We could use Fetch or Axios, we prefer Axios
* schema.js - Import axios at the top
* We don't need lodash
* 





















--------------------
