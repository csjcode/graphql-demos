# graphql-demos
## Review of GraphQL functionality, for demos, classes

### Demo 1 - users

see notes in user directory


Notes from Docs - source - https://graphql.org/learn/:

* GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. 

* **GraphQL service** - A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. Once a GraphQL service is running (typically at a URL on a web service), it can be sent GraphQL queries to validate and execute. 
  
* A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.

* Queries can have comments! `# Queries can have comments!` 

* **Fields** - At its simplest, GraphQL is about asking for specific fields on objects.

* GraphQL queries look the same for both single items or lists of items, however we know which one to expect based on what is indicated in the schema.

* **Arguments** - REST passes a single set of arguments - the query parameters and URL segments in your request. In GraphQL, every field and nested object can get its own set of arguments, for multiple API fetches. You can  pass arguments into scalar fields, to implement data transformations once on the server, instead of on every client separately.

* Arguments can be of many different types. GraphQL comes with a default set of types, but a GraphQL server can also declare its own custom types, as long as they can be serialized into your transport format.

* **Aliases** - Rename the result of a field to anything you want.

* **Fragments** - Fragments let you construct sets of fields, and then include them in queries where you need to.

* **Operation type** is either **query**, **mutation**, or **subscription** and describes what type of operation you're intending to do. The operation type is required unless you're using the query shorthand syntax, in which case you can't supply a name or variable definitions for your operation.

* The **operation name** is a meaningful and explicit name for your operation. It is only required in multi-operation documents, but its use is encouraged because it is very helpful for debugging and server-side logging. 

* **Variables** - You can replace a query filed with a variable name. All declared variables must be either scalars, enums, or input object types. So if you want to pass a complex object into a field, you need to know what input type that matches on the server. Variable definitions can be optional or required.

* 3 steps for variables: (1) Replace the static value in the query with $variableName (2) Declare $variableName as one of the variables accepted by the query (3) Pass variableName: value in the separate, transport-specific (usually JSON) variables dictionary

* **Default variables** - Default values can also be assigned to the variables in the query by adding the default value after the type declaration. 

`query HeroNameAndFriends($episode: Episode = JEDI) {`

* **Directives** - A directive can be attached to a field or fragment inclusion, and can affect execution of the query in any way the server desires. The core GraphQL specification includes two directives:

    * @include(if: Boolean) Only include this field in the result if the argument is true.
    * @skip(if: Boolean) Skip this field if the argument is true. 

* **Mutations** - Modify server data. A mutation can contain multiple fields, just like a query. There's one important distinction between queries and mutations, other than the name: While query fields are executed in parallel, mutation fields run in series, one after the other.

* **Inline Fragments** - GraphQL schemas include the ability to define interfaces and union types. If you are querying a field that returns an interface or a union type, you will need to use inline fragments to access data on the underlying concrete type. To ask for a field on the concrete type, you need to use an inline fragment with a type condition.

* **Meta fields** - GraphQL allows you to request __typename, a meta field, at any point in a query to get the name of the object type at that point.

* **Schemas and Types** - The shape of a GraphQL query closely matches the result, so you can predict what the query will return without knowing that much about the server. 

* Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

* **Object types and fields** - The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. 

-----

```javascript
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

* Character is a **GraphQL Object Type**, meaning it's a type with some fields. Most of the types in your schema will be object types.
* `name` and `appearsIn` are **fields** on the Character type. That means that name and appearsIn are the only fields that can appear in any part of a GraphQL query that operates on the Character type.
* String is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.

* String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.

* [Episode]! represents an array of Episode objects. Since it is also non-nullable, you can always expect an array (with zero or more items) when you query the appearsIn field.

-----

* Every field on a GraphQL object type can have zero or more arguments

```javascript
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

* Every GraphQL service has a query type and may or may not have a mutation type
* These types are the same as a regular object type, but they are special because they define the entry point of every GraphQL query.

* Mutations work in a similar way - you define fields on the Mutation type, and those are available as the root mutation fields you can call in your query.