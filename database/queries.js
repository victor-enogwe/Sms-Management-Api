const getTableNames = schemas => `
  SELECT CONCAT(table_schema, '.', table_name) AS name
  FROM information_schema.tables
  WHERE information_schema.tables.table_schema IN ('${schemas.join('\', \'')}')
  AND information_schema.tables.table_type='BASE TABLE';
`

const createUpdateTimestampTrigger = tableName => ({
  up: `
    CREATE TRIGGER "${tableName}.create_update_timestamp" BEFORE UPDATE
    ON "${tableName}"
    FOR EACH ROW EXECUTE PROCEDURE public.create_update_timestamp();
  `,
  down: `
    DROP TRIGGER IF EXISTS "${tableName}.create_update_timestamp"
    ON "${tableName}";
  `
})

const commentOnTable = ({ tables, comment }) => ({
  up: tables.map(table => comment.replace(/theTable/g, table)).join('')
})

const omitTables = ({ tables }) => commentOnTable({
  tables,
  comment: `
    COMMENT ON TABLE "theTable"
    IS E'@omit all,create,read,update,delete,execute,many,filter,order';
  `
})

const omitColumns = ({ tables }) => commentOnTable({
  tables,
  comment: `
    COMMENT ON COLUMN public."theTable".id IS E'@omit create';
    COMMENT ON COLUMN public."theTable"."createdAt" IS E'@omit create,update';
    COMMENT ON COLUMN public."theTable"."updatedAt" IS E'@omit create,update';
  `
})

module.exports = {
  getTableNames,
  createUpdateTimestampTrigger,
  omitTables,
  omitColumns
}
