const graphql = require('graphql');
const _ = require('lodash')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {type:GraphQLString},
		firstName: {type:GraphQLString},
		age: {type:GraphQLInt} 
	}
})

const users = [
	{id:'23', firstName:'Chris',age:20},
	{id:'45', firstName:'Bob',age:18},
	{id:'52', firstName:'Mike',age:50}
];

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: {type:GraphQLString}},
			resolve(parentValue, args) {
				return _.find(users,{ id:args.id })
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});