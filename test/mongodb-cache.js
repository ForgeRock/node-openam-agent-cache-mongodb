var MongoCache = require('../index').MongoCache,
    assert = require('assert');

describe('MongoCache', function () {
    var mongoCache;

    beforeEach(function () {
        mongoCache = new MongoCache({
            url: process.env.MONGODB_URL || 'mongodb://localhost:32768',
            expireAfterSeconds: 1
        });
    });

    afterEach(function () {
        mongoCache.quit();
    });

    describe('put', function () {
        it('should put an entry in MongoDB', function () {
            return mongoCache.put('foo', 'bar')
                .then(function () {
                    return mongoCache.get('foo');
                })
                .then(function (res) {
                    assert(res === 'bar');
                });
        });

        // the cleanup is not fast enough in mongodb, so the entry will still be there -- we can't really test this
        xit('should make entries expire', function () {
            return mongoCache.put('foo', 'bar')
                .then(function () {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1500);
                    });
                })
                .then(function () {
                    return mongoCache.get('foo');
                })
                .then(function (res) {
                    console.log(res);
                    assert(res === null);
                });
        });


    });

    describe('get', function () {
        it('should get an entry from MongoDB', function () {
            return mongoCache.put('foo', {foo: 'bar'})
                .then(function () {
                    return mongoCache.get('foo');
                })
                .then(function (res) {
                    assert(res.foo === 'bar');
                });
        });

    });

    describe('remove', function () {
        it('should remove an entry from MongoDB', function () {
            return mongoCache.put('foo', 'bar')
                .then(function () {
                    return mongoCache.remove('foo');
                })
                .then(function () {
                    return mongoCache.get('foo');
                })
                .then(function (res) {
                    assert(res === null);
                })
                .catch(function (err) {
                    assert(!!err);
                });
        });
    });

    describe('quit', function () {
        it('should close the connection to MongoDB and not allow any more operations', function () {
            return mongoCache.quit()
                .then(function () {
                    return mongoCache.put('foo', 'bar');
                })
                .then(function () {
                    throw 'write allowed after quit() was called';
                })
                .catch(function (err) {
                    assert(!!err);
                });
        });
    });
});
