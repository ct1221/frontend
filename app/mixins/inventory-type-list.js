import Ember from "ember";
export default Ember.Mixin.create({
    defaultInventoryTypes: [
        'Asset',
        'Medication',
        'Supply'
    ]
});