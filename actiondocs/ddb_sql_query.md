## SQL query

This action allows you to perform reads and singleton writes on data stored in DynamoDB, using PartiQL

- **`sqlstatement`**: the sql statement must be inside a docstring. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.

The reponse JSON will have the following structure:

```json
{
   "Items": [ 
      { 
         "string" : { 
            "B": blob,
            "BOOL": boolean,
            "BS": [ blob ],
            "L": [ 
               "AttributeValue"
            ],
            "M": { 
               "string" : "AttributeValue"
            },
            "N": "string",
            "NS": [ "string" ],
            "NULL": boolean,
            "S": "string",
            "SS": [ "string" ]
         }
      }
   ],
   "NextToken": "string"
}
```

Example of usage:

- Execute a SQL query to select item with a partition key *pk* and sort key *sk*

    > `aws dynamodb sql query`  
    > """  
    > select * from "mytable" where "pk" = 'foo' and 'sk' = 'bar'  
    > """

References:

[ExecuteStatement](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ExecuteStatement.html)