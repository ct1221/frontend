SECUREHOST="http://hradmin:test@127.0.0.1:5984"
curl -X PUT $SECUREHOST/_users/org.couchdb.user:admin -d '{"name": "admin", "password": "test", "roles": ["System Administrator","admin","user"], "type": "user", "userPrefix": "p1"}'
