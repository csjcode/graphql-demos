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

#### Schema setup

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

#### 
