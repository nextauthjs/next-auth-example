// See the TypeORM documentation for database configuration options:
// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md
//
// Note: You will need to explicitly pass this configuration as an option to
// Adapters.Default(). You cannot use the `typeorm.json`, `typeorm.js` or
// environment variable configuration options are not supported when using
// TypeORM in a module like NextAuth.
export default {
  type: 'sqlite',
  database: ':memory:'
}