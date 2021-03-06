import Ember from "ember";
export default Ember.ObjectController.extend({
    deliveryDetails: function() {
        var locationName = this.get('deliveryLocationName'),
            patient = this.get('patient');
        if (Ember.isEmpty(patient)) {    
            return locationName;
        } else {
            return patient.get('displayName');
        }
    }.property('deliveryAisle', 'deliveryLocation','patient'),
    
    haveReason: function() {
        return !Ember.isEmpty(this.get('reason'));
    }.property('reason'),

    isAdjustment: function() {
        var transactionType = this.get('transactionType');
        return transactionType === 'Adjustment (Add)' || 
            transactionType === 'Adjustment (Remove)' ||
            transactionType === 'Write Off';
    }.property('transactionType'),
    
    isFulfillment: function() {
        return this.get('transactionType') === 'Fulfillment';
    }.property('transactionType'),
    
    isTransfer: function() {
        return this.get('transactionType') === 'Transfer';
    }.property('transactionType'),
    
});