'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Inventory = mongoose.model('Inventory');

var credentials,
    token,
    mockup;

describe('Inventory CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "itemID": "ลิปมินิ",
            "key": "สี",
            "value": "แดง",
            "sign": 1,
            "qty": 150
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Inventory get use token', (done) => {
        request(app)
            .get('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Inventory get by id', function (done) {

        request(app)
            .post('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/inventorys/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.itemID, mockup.itemID);
                        assert.equal(resp.data.key, mockup.key);
                        assert.equal(resp.data.value, mockup.value);
                        assert.equal(resp.data.sign, mockup.sign);
                        assert.equal(resp.data.qty, mockup.qty);
                        done();
                    });
            });

    });

    it('should be Inventory post use token', (done) => {
        request(app)
            .post('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.itemID, mockup.itemID);
                assert.equal(resp.data.key, mockup.key);
                assert.equal(resp.data.value, mockup.value);
                assert.equal(resp.data.sign, mockup.sign);
                assert.equal(resp.data.qty, mockup.qty);
                done();
            });
    });

    it('should be inventory put use token', function (done) {

        request(app)
            .post('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "itemID": "ลิปมินิ",
                    "key": "สี",
                    "value": "แดง",
                    "sign": 1,
                    "qty": 150
                }
                request(app)
                    .put('/api/inventorys/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.itemID, update.itemID);
                        assert.equal(resp.data.key, update.key);
                        assert.equal(resp.data.value, update.value);
                        assert.equal(resp.data.sign, update.sign);
                        assert.equal(resp.data.qty, update.qty);
                        done();
                    });
            });

    });

    it('should be inventory delete use token', function (done) {

        request(app)
            .post('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/inventorys/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be inventory get not use token', (done) => {
        request(app)
            .get('/api/inventorys')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be inventory post not use token', function (done) {

        request(app)
            .post('/api/inventorys')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be inventory put not use token', function (done) {

        request(app)
            .post('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/inventorys/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be inventory delete not use token', function (done) {

        request(app)
            .post('/api/inventorys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/inventorys/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Inventory.deleteMany().exec(done);
    });

});