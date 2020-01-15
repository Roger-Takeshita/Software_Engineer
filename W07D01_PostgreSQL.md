<h1 id='summary'>Summary</h1>

* [Relational Database and SQL](#relational-sql)
  * [Anatomy of a Relational Database](#anatomy)
  * [Tables](#tables)
  * [Columns](#columns)
  * [Creating Database and a Table](#creating-database)
  * [Creating a Table for a Related Data Entry](#creating-table-related)
* [PostgreSQL Commands](#postgresql)
  * [Terminal Commands](#terminal)
  * [Managing Databases](#managing-database)
    * [Create a Database](#create-database)
    * [Delete a Database](#delete-database)
  * [Managing Tables](#tables)
    * [Add a New Column to a Table](#add-column)
    * [Delete a Column from a Table](#delete-column)
    * [Rename a Column](#rename-column)
    * [Rename a Table](#rename-table)
  * [Managing Indexes](#indexes)
    * [Removing a Specified Index from a Table](#removing-index)
  * [Quering Data from Tables](#querying)
    * [Query All Data from a Table](#query-data)
    * [Query Data from Specified Columns](#query-data-columns)
    * [Query Data Using a Filter - WHERE Operator](#query-data-filter)
    * [Query Data - LIKE Operator](#query-data-like)
    * [Query Data - IN Operator](#query-data-in)
    * [Query Data - Constrain the Returned Rows - LIMIT Operator](#query-data-constrain)
    * [Query Data - INNER JOIN, LEFT JOIN, FULL OUTER JOIN, CROSS JOIN and NATURAL JOIN](#query-data-multiple)
    * [Return the Number of Rows of a Table](#return-rows-count)
    * [Sort Rows in Ascending or Descending Order - ORDER BY](#sort)
    * [Filter Groups - HAVING Clause](#filter-groups)
  * [Set Operations](#set-operations)
    * [Combine the Result - Two or More Queries - UNION Operator](#union)
    * [Minus a Result - EXCEPT Operator](#except)
    * [Get Intersection of the Result Sets of Two Queries](#intersection)
  * [Modifying Data](#modifying)
    * [Insert a New Row Into a Table](#insert-row)
    * [Insert Multiple Rows Into a Table](#insert-multiple-rows)
    * [Update Data for All Rows](#update-data-rows)
    * [Update Data from a Set of Rows Specified by a Condition - WHERE clause](#update-data-condition)
    * [Delete All Rows of a Table](#delete-all-rows)
    * [Delete a Specific Row Based on a Condition](#delete-one-row)


<h1 id='relational-sql'>Relational Database and SQL</h1>

<h2 id='anatomy'>Anatomy of a Relational Database</h2>

[Go Back to Summary](#summary)

* The structure of a a particular database is known as its **schema**.
* Schemas include the definition of such things as the database's:
  * Tables, including the number and data type of each column
  * Indexes for effecient access of data.
  * Constrains (rules, such as whether a field can e null or not)

<h2 id='tables'>Tables</h2>

[Go Back to Summary](#summary)

* Database tables look like a spreadsheet since they consist of columns and rows.
* Tables are also known as **relations**.
* A single table in a relational database holds data for a particular data entry.
* Since only one type of data can be held in a single table, related data, we will have different tables storing differnt contents and tye are **linked** via what is known as a **foreign key (FK)**.

* **Foreign key** fields hold the value of its parent's **primary key (PK)**.
* The naming convention is typically snake_cased and always plural.


<h2 id='columns'>Columns</h2>

[Go Back to Summary](#summary)

* The columns of a table have a:
  * Name
  * Data type
  * Optional contrains
* The typical naming convention is usually snake_cased and singular.

* PostgreSQL has [many data types](https://www.postgresql.org/docs/11/datatype.html) for columns, but common ones include:
  * Integer
  * Decimal
  * Varchar (variable-length strings)
  * Text (unlimited length strings)
  * Date (**does not** include time)
  * Timestamps (both date and time)
  * Boolean

* Common constrains for a column include:
  * `PRIMARY KEY`: column, or group of columns, uniquely identify a row.
  * `REFERENCES` (Foreign Key): value in column must match the primary key in another table.
  * `NOT NULL`: column must have a value, it cannot be empty (null).
  * `UNIQUE`: data in this column must be unique among all rous in the table.

<h2 id='creating-database'>Creating Database and a Table</h2>

[Go Back to Summary](#summary)

* On terminal:

   ```Bash
      CREATE DATABASE music;

      CREATE TABLE bands (
         id serial PRIMARY KEY,  # serial is auto-incrementing integer
         name varchar NOT NULL,
         genre varchar
      );
   ```

<h2 id='creating-table-related'>Creating a Table for a Related Data Entry</h2>

[Go Back to Summary](#summary)

* Let's say we have the following data relationship: `Band ----< Musician`
  * A Band has many Musicians and a Musician belongs to a Band
* Whenever you have a `one:many` relationship, the rows in the table for the many-side must include a column that references which row in the table on the on-side it belongs to.
* This column is known as a **foreign key (FK)**
* The FK must be the same data type is the primary key in the parent table (usually an integer).
  
   ```Bash
      CREATE TABLE musicians (
         id serial PRIMARY KEY,
         name varchar NOT NULL,
         quote text,
         band_id integer NOT NULL REFERENCES bands (id)
      );
   ```

<h1 id='postgresql'>PostgreSQL Commands</h1>

<h2 id='terminal'>Terminal</h2>

[Go Back to Summary](#summary)

* Run PostgreSQL on Terminal:

   ```Bash
      pqsl
   ```

* Connect to a specific database:

   ```Bash
      \c <database_name>
   ```

* To quit the psql

   ```Bash
      \q
   ```

* To List all databases in the PostgreSQL database server
  
   ```Bash
      \l
   ```

* To list all tables inside the databa_base that you are currentt using.

   ```Bash
      \d
   ```

<h2 id='managing-database'>Managing Databases</h2>

[Go Back to Summary](#summary)

<h4 id='create-database'>Create a Database</h4>

   ```Bash
      CREATE DATABASE <database_name>;
   ```

<h4 id='delete-database'>Delete a Database</h4>

   ```Bash
      DROP DATABASE <database_name>;
   ```

<h2 id='tables'>Managing Tables</h2>

[Go Back to Summary](#summary)

<h4 id='add-column'>Add a New Column to a Table</h4>

   ```Bash
      ALTER TABLE <table_name> ADD COLUMN <column_name> <DATA_TYPE>;
   ```

<h4 id='delete-column'>Delete a Column from a Table</h4>

   ```Bash
      ALTER TABLE <table_name> DROP COLUMN <column_name>;
   ```

<h4 id='rename-column'>Rename a Column</h4>

   ```Bash
      ALTER TABLE <table_name> RENAME <column_name> TO <new_column_name>;
   ```

<h4 id='rename-table'>Rename a Table</h4>

   ```Bash
      ALTER TABLE <table_name> RENAME TO <new_table_name>;
   ```

<h2 id='indexes'>Managing Indexes</h2>

[Go Back to Summary](#summary)


<h4 id='removing-index'>Removing a Specified Index from a Table</h4>

   ```Bash
      DROP INDEX <index_name>;
   ```

<h2 id='querying'>Quering Data from Tables</h2>

[Go Back to Summary](#summary)

<h4 id='query-data'>Query All Data from a Table</h4>
   
   ```Bash
      SELECT * FROM <table_name>;
   ```

<h4 id='query-data-columns'>Query Data from Specified Columns</h4>

   ```Bash
      SELECT <column_name_1>, <column_name_2>, ... FROM <table_name>;
   ```

<h4 id='query-data-filter'>Query Data Using a Filter - WHERE Operator</h4>

   ```Bash
      SELECT * FROM <table_name> WHERE <condition>;
   ```

<h4 id='query-data-like'>Query Data - LIKE Operator</h4>

   ```Bash
      SELECT * FROM <table_name> WHERE <column_name> LIKE '%value%';
   ```

<h4 id='query-data-in'>Query Data - IN Operator</h4>

   ```Bash
      SELECT * FROM <table_name> WHERE <column_name> IN (value_1, value2, ...);
   ```

<h4 id='query-data-constrain'>Query Data - Constrain the Returned Rows - LIMIT Operator</h4>

   ```Bash
      SELECT * FROM <table_name> LIMIT <limit> OFFSET <offset> ORDER BY <column_name>;
   ```

<h4 id='query-data-multiple'>Query Data - INNER JOIN, LEFT JOIN, FULL OUTER JOIN, CROSS JOIN and NATURAL JOIN</h4>

   ```Bash
      SELECT * FROM <table_name_1> INNER JOIN <table_name_2> ON <conditions>;
   ```

   ```Bash
      SELECT * FROM <table_name_1> LEFT JOIN <table_name_2> ON <conditions>;
   ```

   ```Bash
      SELECT * FROM <table_name_1> FULL OUTER JOIN <table_name_2> ON <conditions>;
   ```

   ```Bash
      SELECT * FROM <table_name_1> CROSS JOIN <table_name_2> ON <conditions>;
   ```

   ```Bash
      SELECT * FROM <table_name_1> NATURAL JOIN <table_name_2> ON <conditions>;
   ```

<h4 id='return-rows-count'>Return the Number of Rows of a Table</h4>

   ```Bash
      SELECT COUNT (*) FROM <table_name>;
   ```

<h4 id='sort'>Sort Rows in Ascending or Descending Order - ORDER BY</h4>

   ```Bash
      SELECT * FROM <table_name> ORDER BY <column_name_1>, <column_name_2>, ...;
   ```

<h4 id='filter-groups'>Filter Groups - HAVING Clause</h4>

   ```Bash
      SELECT * FROM <table_name> GROUP BY <column_name> HAVING <condition>;
   ```

<h2 id='set-operations'>Set Operations</h2>

[Go Back to Summary](#summary)

<h4 id='union'>Combine the Result - Two or More Queries - UNION Operator</h4>

   ```Bash
      SELECT * FROM <table_name_1> UNION SELECT * FROM <table_name_2>;
   ```

<h4 id='except'>Minus a Result - EXCEPT Operator</h4>

   ```Bash
      SELECT * FROM <table_name_1> EXCEPT SELECT * FROM <table_name_2>;
   ```

<h4 id='intersection'>Get Intersection of the Result Sets of Two Queries</h4>

   ```Bash
      SELECT * FROM <table_name_1> INTERSECT SELECT * FROM <tabble_name_2>;
   ```

<h2 id='modifying'>Modifying Data</h2>

[Go Back to Summary](#summary)


<h4 id='insert-row'>Insert a New Row Into a Table</h4>

   ```Bash
      INSERT INTO <table_name> (<column_name_1>, <column_name_2, ...) VALUES (<value_1>, <value_2>, ...);
   ```

<h4 id='insert-multiple-rows'>Insert Multiple Rows Into a Table</h4>

   ```Bash
      INSERT INTO <table_name> (<column_name_1>, <column_name_2>, ...) VALUES (<value_1>, <value_2>, ...), (<value_1>, <value_2>, ...), (<value_1>, <value_2>, ...) ...;
   ```

<h4 id='update-data-rows'>Update Data for All Rows</h4>

   ```Bash
      UPDATE <table_name> SET <column_name_1> = <value_1>, ...;
   ```

<h4 id='update-data-condition'>Update Data from a Set of Rows Specified by a Condition - WHERE clause</h4>

   ```Bash
      UPDATE <table_name> SET <column_name_1> = <value_1>, ... WHERE <conditions>;
   ```

<h4 id='delete-all-rows'>Delete All Rows of a Table</h4>

   ```Bash
      DELETE FROM <table_name>;
   ```

<h4 id='delete-one-row'>Delete a Specific Row Based on a Condition</h4>

   ```Bash
      DELETE FROM <table_name> WHERE <condition>;
   ```