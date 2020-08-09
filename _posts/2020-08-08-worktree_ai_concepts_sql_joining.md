---
layout: post
type: "WorkTree"
area: "AI"
subject: "Concepts"
section: "SQL"
title:  "Data Joining in PostgreSQL"
author: Jitender Singh Virk
---

### INNER JOIN

Inner join means joining two tables on specified columns from both tables and taking rows that are present in both tables. In other words, inner join is intersection of two tables.

For example:

<img src="/assets/imgs/sql_innerjoin.png" class="rounded mx-auto d-block" alt="inner join example image" style="max-height:23rem">


The code example given below shows the syntax of INNER JOIN of three example tables named `countries`, `populations`, and `economies`:

```sql
-- 6. Select fields
SELECT c.code, name, region, e.year, fertility_rate, unemployment_rate
  -- 1. From countries (alias as c)
  FROM countries AS c
  -- 2. Join to populations (as p)
  INNER JOIN populations AS p
    -- 3. Match on country code
    ON c.code = p.country_code
  -- 4. Join to economies (as e)
  INNER JOIN economies AS e
    -- 5. Match on country code and year
    ON c.code = e.code AND e.year = p.year;
```
### INNER JOIN with USING
You can also use a USING keyword if the names of the columns are same in both tables.
For example:

```sql
SELECT *
FROM countries
  INNER JOIN economies
    USING(code)
```
rather than

```sql
SELECT *
FROM countries
  INNER JOIN economies
    ON countries.code = economies.code
```
Note: () parenthesis are required after USING.

### SELF-JOIN
Self join is used to compare values in a field to the other values of the same field within the same table. There is no direct keyword for self join in Postgre SQL. We will use INNER JOIN to do the same.
For example, -- 2. and -- 3. is using same population table with different alias to perform query:
```sql
SELECT p1.country_code,
       p1.size AS size2010,
       p2.size AS size2015,
       -- 1. calculate growth_perc
       ((p2.size - p1.size)/p1.size * 100.0) AS growth_perc
-- 2. From populations (alias as p1)
FROM populations AS p1
  -- 3. Join to itself (alias as p2)
  INNER JOIN populations AS p2
    -- 4. Match on country code
    ON p1.country_code = p2.country_code
        -- 5. and year (with calculation)
        AND p1.year = p2.year - 5;
```

### The if-else condition in PostgreSQL
In PostgreSQL, there are three keywords that provides the functionality of if-else condition. These are CASE, WHEN, and THEN.
The syntax is:

```sql
CASE
    WHEN condition_1  THEN return_this_1
    WHEN condition_2  THEN return_this_2
    .
    .
    .
    WHEN condition_n  THEN return_this_n
    ELSE else_return_this
END AS alias_name
```
For example:

```sql
SELECT name, continent, code, surface_area,
    -- 1. First case
  CASE
    WHEN surface_area > 2000000 THEN 'large'
    -- 2. Second case
    WHEN surface_area BETWEEN 350000 AND 2000000 THEN 'medium'
    -- 3. Else clause
    ELSE 'small'
    -- 4. end + Alias name
  END AS geosize_group
-- 5. From table
FROM countries;
```


---
##### References:

* Joining Data in SQL Course - DataCamp
