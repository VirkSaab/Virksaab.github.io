---
layout: post
type: "WorkTree"
subject: "Concepts"
section: "SQL"
title:  "Data Joining in PostgreSQL"
author: Jitender Singh Virk
---

## INNER JOIN

Inner join means joining two tables on specified columns from both tables and taking rows that are present in both tables. In other words, inner join is intersection of two tables.

For example:

<img src="/assets/imgs/sql/innerjoin.png" class="rounded mx-auto d-block" alt="inner join example image" style="max-height:23rem">


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
<br>
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

<br>
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

<br>
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
<br>
## OUTER JOINS AND CROSS JOINS
Outer join integrates the content of both table either they are matched or not. There are three fundamental outer joins: left, right, and full join. The main idea is shown in the figure below:
<img src="/assets/imgs/sql/inner_and_outer_joins.jpg" class="rounded mx-auto d-block" alt="Inner and Outer join overview" style="max-width:90%;  max-height: 25rem;">
<br>
### LEFT and RIGHT JOIN
Left join means the main table is on left and we reach out to right table to join. While left joining, we keep all the records of left table whether it matches with right table or not and merges the right tables values. If some rows from the key column (the column we use to join) are missing in right table, null will be assigned there. The resulting table will have same number of rows/samples as left table. Also, the values in left key column can match multiple values in the right key column. The example is shown in the image below.

<img src="/assets/imgs/sql/leftjoin.png" class="rounded mx-auto d-block" alt="Inner and Outer join overview" style="max-height:25rem">

The syntax is similar to inner join. Just replace the INNER with LEFT. For example:

```sql
-- Select fields
SELECT region, AVG(gdp_percapita) AS avg_gdp
-- From countries (alias as c)
FROM countries as c
  -- Left join with economies (alias as e)
  LEFT JOIN economies as e
    -- Match on code fields
    ON c.code = e.code
-- Focus on 2010
WHERE e.year = 2010
-- Group by region
GROUP BY region
-- Order by descending avg_gdp
ORDER BY avg_gdp DESC;
```

Right joins aren't as common as left joins. One reason why is that you can always write a right join as a left join. The example and syntax of right join is shown in the image below.
<img src="/assets/imgs/sql/rightjoin.png" class="rounded mx-auto d-block" alt="Inner and Outer join overview" style="max-height:25rem">
The syntax of right join is as follows:
```sql
SELECT right_table.id AS R_id,
       left_table.val AS L_val,
       right_table.val AS R_val
FROM left_table
RIGHT JOIN right_table
ON left_table.id = right_table.id;
```
Let's see a comparison example between left and right join and how we can convert left join to right join.

LEFT JOIN:
```sql
SELECT cities.name AS city, urbanarea_pop, countries.name AS country,
       indep_year, languages.name AS language, percent
FROM cities
  LEFT JOIN countries
    ON cities.country_code = countries.code
  LEFT JOIN languages
    ON countries.code = languages.code
ORDER BY city, language;
```

RIGHT JOIN:
```sql
SELECT cities.name AS city, urbanarea_pop, countries.name AS country,
       indep_year, languages.name AS language, percent
FROM languages
  RIGHT JOIN countries
    ON languages.code = countries.code
  RIGHT JOIN cities
    ON countries.code = cities.country_code
ORDER BY city, language;
```

<br>
### FULL JOIN
Full join is like union of two tables. We keep data from both tables. Order of the tables still matters. If you switch the tables you will get slightly different results.
<img src="/assets/imgs/sql/fulljoin.png" class="rounded mx-auto d-block" alt="full join image" style="max-height:25rem">

The syntax is similar to INNER join except FULL instead of INNER.

```sql
SELECT left_table.id AS L_id,
       right_table.id AS R_id,
       left_table.val AS L_val,
       right_table.val AS R_val
FROM left_table
FULL JOIN right_table
USING (id);
```

<br>
### CROSS JOIN
In cross join, all rows in left table interacts with all rows in the right table. Cross join creates all possible combinations of two tables. See the example in the image below. Note that cross joins do not use ON or USING.

<img src="/assets/imgs/sql/crossjoin.png" class="rounded mx-auto d-block" alt="cross join image" style="max-height:30rem">
The syntax is similar to full join except CROSS instead of FULL.
```sql
SELECT left_table.id AS L_id,
       right_table.id AS R_id,
       left_table.val AS L_val,
       right_table.val AS R_val
FROM left_table
CROSS JOIN right_table
```



---
##### References:

* [Joining Data in SQL Course - DataCamp](https://learn.datacamp.com/courses/joining-data-in-postgresql)
* [Inner and outer joins overview image](https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Screenshots_2018/Outer-Join.jpg)
