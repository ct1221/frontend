import CustomAuth from "hospitalrun/utils/custom-auth";
import CustomAuthorizer from "hospitalrun/utils/custom-authorizer";
import CouchSerializer from "hospitalrun/utils/couch-serializer";
import Ember from "ember";

export default {
    name: 'authentication',
    
    initialize: function(container, application) {
        container.register('authenticators:custom', CustomAuth);
        application.register('serializer:couchdb', CouchSerializer);        
        Ember.SimpleAuth.setup(container, application, {
            authorizer: CustomAuthorizer
        });
        container.injection('adapter:user', 'session', 'ember-simple-auth:session:current');
    }    
};