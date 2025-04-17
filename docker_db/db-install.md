## Docker Command to init the db
```bash
docker run --name my-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=recipe-db -v ${PWD}\init.sql:/docker-entrypoint-initdb.d/init.sql   -p 5432:5432 -d postgres                                          
 ```                                                                                      