const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully created ${store.name}. Care to leave a review`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStore = async (req, res) => {
    // Query db for list of all stores
    const stores = await Store.find();
    res.render('stores', {title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
    // 1. find the store given the id
    const store = await Store.findOne({ _id: req.params.id });
   
    // 2. confirm they are the owner of the store
    // TODO

    // 3. render the edit form so the user can update the store
    res.render('editStore', { title: `Edit ${store.name}`, store});
};

exports.updateStore = async (req, res) => {
    // Find and upate the store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true
     }).exec(); 

     // Redirect them to the store and tell them it worked.
    req.flash('success', `Successfully updated <strong>${store.name}</strong>, <a href="/store/${store.slug}">View Store</a>`);
    res.redirect(`/stores/${store._id}/edit`);
};