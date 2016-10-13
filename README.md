# openam-agent-cache-simple
Cache using MongoDB for the OpenAM Policy Agent for NodeJS

Installation: `npm install openam-agent-cache-mongodb`

# API Docs

<a name="MongoCache"></a>

## MongoCache ⇐ <code>Cache</code>
**Kind**: global class  
**Extends:** <code>Cache</code>  

* [MongoCache](#MongoCache) ⇐ <code>Cache</code>
    * [new MongoCache([options])](#new_MongoCache_new)
    * [.get(key)](#MongoCache+get) ⇒ <code>Promise</code>
    * [.put(key, value)](#MongoCache+put) ⇒ <code>Promise</code>
    * [.remove(key)](#MongoCache+remove) ⇒ <code>Promise</code>
    * [.close()](#MongoCache+close) ⇒ <code>Promise</code>
    * [.quit()](#MongoCache+quit) ⇒ <code>Promise</code>

<a name="new_MongoCache_new"></a>

### new MongoCache([options])
Cache implementation for MongoDB


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | Options |
| [options.url] | <code>string</code> | <code>&quot;http://localhost/openam-agent&quot;</code> | MongoDB URL |
| [options.expireAfterSeconds] | <code>number</code> | <code>60</code> | Expiration time in seconds |
| [options.collectionName] | <code>string</code> | <code>&quot;agentcache&quot;</code> | MongoDB collection name |

**Example**  
```js
var mongoCache = new MongoCache({
  url: 'mongodb://db.example.com/mydb',
  expireAfterSeconds: 600,
  collectionName: 'sessions'
});
```
<a name="MongoCache+get"></a>

### mongoCache.get(key) ⇒ <code>Promise</code>
Get a single cached item
If the entry is not found, reject

**Kind**: instance method of <code>[MongoCache](#MongoCache)</code>  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

**Example**  
```js
mongoCache.get('foo').then(function (cached) {
  console.log(cached);
}).catch(function (err) {
  console.error(err);
});
```
<a name="MongoCache+put"></a>

### mongoCache.put(key, value) ⇒ <code>Promise</code>
Store a single cached item (overwrites existing)

**Kind**: instance method of <code>[MongoCache](#MongoCache)</code>  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| value | <code>\*</code> | 

**Example**  
```js
mongoCache.put('foo', {bar: 'baz'}).then(function () {
  console.log('foo saved to cache');
}).catch(function (err) {
  console.error(err);
});
```
<a name="MongoCache+remove"></a>

### mongoCache.remove(key) ⇒ <code>Promise</code>
Remove a single cached item

**Kind**: instance method of <code>[MongoCache](#MongoCache)</code>  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

**Example**  
```js
mongoCache.remove('foo').then(function () {
  console.log('foo removed from cache');
}).catch(function (err) {
  console.error(err);
});
```
<a name="MongoCache+close"></a>

### mongoCache.close() ⇒ <code>Promise</code>
Closes the database connection

**Kind**: instance method of <code>[MongoCache](#MongoCache)</code>  
**Example**  
```js
mongoCache.close().then(function () {
  console.log('cache closed');
});
```
<a name="MongoCache+quit"></a>

### mongoCache.quit() ⇒ <code>Promise</code>
Closes the database connection

**Kind**: instance method of <code>[MongoCache](#MongoCache)</code>  
